import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import z from "zod";
import { signInSchema } from "@/src/lib/auth/validations/auth";
import { authClient } from "@/src/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormErrors = Partial<Record<keyof z.infer<typeof signInSchema>, string[]>>;

export default function SignInForm({
  setForgotPasswordTab,
}: {
  setForgotPasswordTab: (value: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const parsed = signInSchema.safeParse({
      email: formData.email,
      password: formData.password,
      remember: formData.remember === "on",
    });

    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setErrors({});

    const signInData = {
      email: parsed.data.email,
      password: parsed.data.password,
    };

    authClient.signIn.email(
      { ...signInData },
      {
        onError: async (error) => {
          toast.error(
            error.error.message || "Failed to sign up. Please try again!",
          );

          if (error.error.message === "Email not verified") {
            const timestamp = Date.now();
            await authClient.sendVerificationEmail({
              email: signInData.email,
              callbackURL: "/dashboard",
            });
            router.push(
              `/auth/verification?email=${encodeURIComponent(signInData.email)}&t=${timestamp}`,
            );
          }
        },
        onSuccess: () => {
          toast.success("Signed in successfully! 🎉");
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              name="email"
              type="email"
              required
              className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-text-secondary" />
              ) : (
                <Eye className="w-5 h-5 text-text-secondary" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            name="remember"
            type="checkbox"
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="ml-2 text-sm text-text-secondary">Remember me</span>
        </label>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setForgotPasswordTab(true);
          }}
          className="text-sm text-primary hover:text-primary-hover font-medium cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5" />
        Sign In
      </button>
    </form>
  );
}
