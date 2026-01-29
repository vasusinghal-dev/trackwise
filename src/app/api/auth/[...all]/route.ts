import { auth } from "@/src/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { findIp } from "@arcjet/ip";
import { signInSchema, signUpSchema } from "@/src/lib/auth/validations/auth";
import { flattenError } from "zod";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

const botSettings = { mode: "LIVE", allow: [] } satisfies BotOptions;
const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>;
const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>;
const emailSettings = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const authHandlers = toNextJsHandler(auth);
export const { GET } = authHandlers;

export async function POST(request: Request) {
  const clonedRequest = request.clone();

  const url = new URL(request.url);
  const pathname = url.pathname;
  const mode = url.searchParams.get("mode");

  const isCredentialsAuth =
    pathname.startsWith("/auth") && (mode === "signup" || mode === "signin"); // because oauth has no body
  let body: unknown = null;

  if (isCredentialsAuth) {
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }
  }

  if (mode === "signup") {
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { errors: flattenError(parsed.error).fieldErrors },
        { status: 400 },
      );
    }
  }

  if (mode === "signin") {
    const parsed = signInSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { errors: flattenError(parsed.error).fieldErrors },
        { status: 400 },
      );
    }
  }

  const decision = await checkArcjet(request, body);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      await new Promise((r) => setTimeout(r, 1500));
      return Response.json({ message: "Too many requests" }, { status: 429 });
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid.";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain is not valid.";
      } else {
        message = "Invalid Email.";
      }

      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, { status: 403 });
    }
  }

  return authHandlers.POST(clonedRequest);
}

async function checkArcjet(req: Request, body: unknown) {
  const session = await auth.api.getSession({ headers: req.headers });

  const userIdOrIp = (session?.user.id ?? findIp(req)) || "127.0.0.1";

  const url = new URL(req.url);
  const pathname = url.pathname;
  const mode = url.searchParams.get("mode");

  if (pathname.startsWith("/auth") && mode === "signup") {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          }),
        )
        .protect(req, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(req, { userIdOrIp });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(req, { userIdOrIp });
}
