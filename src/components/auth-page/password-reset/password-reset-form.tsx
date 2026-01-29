"use client";

import { useState } from "react";
import { Lock, Key, Eye, EyeOff } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth/auth-client";
import { passwordResetSchema } from "@/src/lib/auth/validations/auth";

type FormErrors = Partial<
  Record<keyof z.infer<typeof passwordResetSchema>, string[]>
>;

export default function PasswordResetForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState<boolean>(false);

  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = passwordResetSchema.safeParse(formData);

    if (!parsed.success) {
      const flattened = z.flattenError(parsed.error);
      setErrors(flattened.fieldErrors);
      return;
    }

    setErrors({});
    const { newPassword } = parsed.data;
    setIsSending(true);

    try {
      await authClient.resetPassword(
        { newPassword, token },
        {
          onError: (error) => {
            toast.error(error.error.message || "Failed to reset password");
          },
          onSuccess: () => {
            toast.success("Password reset successful! 🎉", {
              description: "You can now sign in with your new password",
            });
            router.replace("/auth?mode=signin");
          },
        },
      );
    } finally {
      setIsSending(false);
    }
  };
  return (
    <form onSubmit={handleResetPassword} className="space-y-6">
      {/* Password field */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            name="newPassword"
            type={showPassword ? "text" : "password"}
            className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary disabled:opacity-50"
            placeholder="Enter new password"
            disabled={!token}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={!token}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-text-secondary" />
            ) : (
              <Eye className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <ul className="mt-2 space-y-1">
            {errors.newPassword.map((err) => (
              <li key={err} className="flex items-start gap-2">
                <div className="w-1 h-1 mt-2 rounded-full bg-error"></div>
                <span className="text-sm text-error">{err}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Password requirements */}
        <div className="mt-3 p-3 bg-background border border-border rounded-lg">
          <p className="text-xs font-medium text-text-secondary mb-2">
            Password must contain:
          </p>
          <ul className="text-xs text-text-secondary space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
              At least 8 characters
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
              One uppercase letter
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
              One lowercase letter
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
              One number
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-text-secondary"></div>
              One special character
            </li>
          </ul>
        </div>
      </div>

      {/* Confirm Password field */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            name="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary disabled:opacity-50"
            placeholder="Confirm new password"
            disabled={!token}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={!token}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5 text-text-secondary" />
            ) : (
              <Eye className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
        {errors.confirmNewPassword && (
          <p className="mt-2 text-sm text-error">
            {errors.confirmNewPassword[0]}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSending || !token}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? (
          <>
            <FiRefreshCw className="w-5 h-5 animate-spin" />
            Resetting Password...
          </>
        ) : (
          <>
            <Key className="w-5 h-5" />
            Reset Password
          </>
        )}
      </button>

      {/* Back to login */}
      <div className="text-center pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.push("/auth/signin")}
          className="text-sm text-primary hover:text-primary-hover font-medium"
        >
          ← Back to Sign In
        </button>
      </div>
    </form>
  );
}
