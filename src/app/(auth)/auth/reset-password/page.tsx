"use client";

import { useEffect, useRef } from "react";
import { Key } from "lucide-react";
import { FiKey } from "react-icons/fi";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import PasswordResetForm from "@/src/components/auth-page/password-reset/password-reset-form";

const resetPasswordParamsSchema = z.object({
  token: z.string(),
  email: z.email(),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const params = Object.fromEntries(searchParams.entries());
  const parsedParams = resetPasswordParamsSchema.safeParse(params);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Initial animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

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
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!parsedParams.success) {
      toast.error("Invalid or expired reset link");
      router.replace("/auth?mode=signin");
    }
  }, [parsedParams.success, router]);

  if (!parsedParams.success) return null;
  const { email, token } = parsedParams.data;

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <Key className="animate-icon w-8 h-8 text-primary" />
              <FiKey className="animate-icon absolute -top-1 -right-1 w-5 h-5 text-secondary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Reset Password
          </h1>
          <p className="text-text-secondary">Enter your new password below</p>

          {email && (
            <div className="mt-4 p-3 bg-background border border-border rounded-lg">
              <p className="text-sm text-text-secondary">
                Resetting password for:{" "}
                <span className="font-medium text-primary">{email}</span>
              </p>
            </div>
          )}
        </div>

        <PasswordResetForm token={token} />
      </div>
    </div>
  );
}
