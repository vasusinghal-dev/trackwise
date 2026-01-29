"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, RefreshCw, CheckCircle, AlertCircle, Home } from "lucide-react";
import { FiMail, FiClock } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { verificationParamsSchema } from "@/src/lib/auth/validations/auth";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth/auth-client";

export default function EmailVerificationClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const result = verificationParamsSchema.safeParse(params);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      if (emailRef.current) {
        gsap.fromTo(
          emailRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "back.out(1.7)",
          },
        );
      }

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

      gsap.fromTo(
        ".animate-button",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!result.success) {
      toast.error("Invalid verification parameters");
      router.replace("/auth?mode=signup");
      return;
    }
  }, [result.success, router]);

  if (!result.success) return null;
  const { email } = result.data;

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      });

      gsap.fromTo(
        ".success-message",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      );

      setResendSuccess(true);
      setCountdown(30);

      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleReturnHome = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => router.push("/"),
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <Mail className="animate-icon w-10 h-10 text-primary" />
              <FiMail className="animate-icon absolute -top-1 -right-1 w-6 h-6 text-secondary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Verify your email address
          </h1>
          <p className="text-text-secondary">
            We&apos;ve sent a verification link to your email
          </p>
        </div>

        <div className="bg-background border border-border rounded-xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Sent to:</span>
          </div>
          <span
            ref={emailRef}
            className="text-lg font-medium text-primary break-all"
          >
            {email}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Check your inbox
              </p>
              <p className="text-sm text-text-secondary">
                Open the email and click the verification link to continue
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Didn&apos;t receive the email?
              </p>
              <p className="text-sm text-text-secondary">
                Check your spam folder or try resending the verification email
              </p>
            </div>
          </div>
        </div>

        {resendSuccess && (
          <div className="success-message mb-6 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <p className="text-sm text-success font-medium">
                Verification email sent successfully!
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleResendEmail}
            disabled={isResending || countdown > 0}
            className="animate-button w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? (
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
                Resend verification email
              </>
            )}
          </button>

          <button
            onClick={handleReturnHome}
            className="animate-button w-full flex items-center justify-center gap-2 border border-border hover:bg-background text-text-primary font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
