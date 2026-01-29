"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Check, X, Eye, EyeOff } from "lucide-react";
import { updatePasswordSchema } from "@/src/lib/auth/validations/auth";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/src/lib/auth/auth-client";

type FormErrors = Partial<
  Record<keyof z.infer<typeof updatePasswordSchema>, string[]>
>;

export default function UpdatePasswordForm({
  onCancelAction,
}: {
  onCancelAction: () => void;
}) {
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<FormErrors>({});

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 },
      );
    }
  }, []);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = updatePasswordSchema.safeParse(formData);

    if (!parsed.success) {
      setError(z.flattenError(parsed.error).fieldErrors);
      console.log(error);
      return;
    }

    setError({});

    const { currentPassword, newPassword } = parsed.data;

    setIsChangingPassword(true);

    // TODO: replace with server action / API call
    await authClient.changePassword(
      { currentPassword, newPassword },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to change password");
        },
        onSuccess: () => {
          toast.success("Password changed successfully! 🎉");
        },
      },
    );

    setNewPassword("");
    onCancelAction();
    setIsChangingPassword(false);
  };

  const requirements = [
    { id: 1, check: newPassword.length >= 8, text: "At least 8 characters" },
    { id: 2, check: /[A-Z]/.test(newPassword), text: "One uppercase letter" },
    { id: 3, check: /[0-9]/.test(newPassword), text: "One number" },
    {
      id: 4,
      check: /[^A-Za-z0-9]/.test(newPassword),
      text: "One special character",
    },
  ];

  return (
    <div ref={formRef}>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <InputField
          label="Current Password"
          name="currentPassword"
          visible={showCurrentPassword}
          toggle={() => setShowCurrentPassword((p) => !p)}
        />
        {error.currentPassword && (
          <p className="mt-2 text-sm text-error">{error.currentPassword[0]}</p>
        )}
        <InputField
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
          name="newPassword"
          visible={showNewPassword}
          toggle={() => setShowNewPassword((p) => !p)}
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          visible={showConfirmPassword}
          toggle={() => setShowConfirmPassword((p) => !p)}
        />
        {error.confirmPassword && (
          <p className="mt-2 text-sm text-error">{error.confirmPassword[0]}</p>
        )}

        {/* Password Requirements */}
        <div
          className={`p-3 rounded-lg ${error.newPassword ? "bg-error/10" : "bg-background"} border border-border`}
        >
          <p className="text-xs font-medium text-text-secondary mb-2">
            Password requirements:
          </p>
          <ul className="text-xs text-text-secondary space-y-1">
            {requirements.map((r) => (
              <li key={r.id} className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    r.check
                      ? "bg-green-500"
                      : error.newPassword
                        ? "bg-red-500"
                        : "bg-text-secondary"
                  }`}
                ></div>
                {r.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isChangingPassword}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChangingPassword ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Changing...
              </>
            ) : (
              <>
                <Check size={18} />
                Change Password
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setError({});
              setNewPassword("");
              onCancelAction();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border text-text-primary rounded-lg hover:bg-surface transition-all"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  visible,
  toggle,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  toggle: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          {...(value !== undefined ? { value } : {})}
          {...(onChange !== undefined ? { onChange } : {})}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          placeholder={
            label === "Confirm New Password"
              ? `${label.toLowerCase()}`
              : `Enter ${label.toLowerCase()}`
          }
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
