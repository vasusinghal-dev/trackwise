import { authClient } from "@/src/lib/auth/auth-client";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { FiClock } from "react-icons/fi";
import { toast } from "sonner";

export default function ForegetPasswordForm() {
  const [resetEmail, setResetEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    await authClient.requestPasswordReset(
      {
        email: resetEmail,
        redirectTo: `/auth/reset-password?email=${encodeURIComponent(resetEmail)}`,
      },
      {
        onError: (error) => {
          toast.error(
            error.error.message || "Failed to send password reset email",
          );
        },
        onSuccess: () => {
          toast.success("Reset link send to the given email");
        },
      },
    );

    setIsSending(false);
    setCountdown(30);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <form onSubmit={handlePasswordReset} className="space-y-6">
      <div>
        <label
          htmlFor="reset-email"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Email Address
        </label>
        <input
          id="reset-email"
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text-primary placeholder:text-text-tertiary"
          required
          autoFocus
        />
        <p className="mt-2 text-sm text-text-tertiary">
          If an account with this email exists, we&apos;ll send you a link to
          reset your password.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="submit"
          disabled={isSending || countdown > 0}
          className="animate-button w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : countdown > 0 ? (
            <>
              <FiClock className="w-4 h-4" />
              Resend available in {countdown}s
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Send Reset Link
            </>
          )}
        </button>
      </div>
    </form>
  );
}
