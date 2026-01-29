import { forwardRef, useState } from "react";
import SignInForm from "./SignInForm";
import SocialButtons from "../social-buttons/SocialButtons";
import { Lock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ForegetPasswordForm from "../password-reset/ForegetPasswordForm";

type Props = {
  onSwap: () => void;
};

const SignInPanel = forwardRef<HTMLDivElement, Props>(function SignInPanel(
  { onSwap },
  ref,
) {
  const [forgotPasswordTab, setForgotPasswordTab] = useState<boolean>(false);

  useGSAP(() => {
    gsap.fromTo(
      ".animate-icon",
      { opacity: 0, scale: 0, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: 0.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      },
    );
  });

  return (
    <div
      ref={ref}
      className="absolute top-0 right-0 opacity-0 w-1/2 h-full p-12 flex flex-col justify-center z-20"
    >
      <div className="max-w-md mx-auto w-full">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">
              {forgotPasswordTab ? "Reset Your Password" : "Welcome Back"}
            </h1>
          </div>
          <p className="text-text-secondary">
            {forgotPasswordTab
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Sign in to your account to continue your journey with us."}
          </p>
        </div>

        {!forgotPasswordTab ? (
          <>
            <SignInForm setForgotPasswordTab={setForgotPasswordTab} />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-secondary">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialButtons />
          </>
        ) : (
          <ForegetPasswordForm />
        )}

        <p className="mt-8 text-center text-text-secondary">
          {forgotPasswordTab ? (
            <>
              Remember your password?{" "}
              <button
                onClick={() => setForgotPasswordTab(false)}
                className="text-primary hover:text-primary-hover font-medium cursor-pointer"
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={onSwap}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign up now
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
});

export default SignInPanel;
