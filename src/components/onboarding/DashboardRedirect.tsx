// components/onboarding/DashboardRedirect.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { CheckCircle, TrendingUp, Users } from "lucide-react";
import { FiBarChart } from "react-icons/fi";

export default function DashboardRedirect() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".success-icon",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      );

      gsap.fromTo(
        ".success-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 },
      );

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.6 + index * 0.1,
            },
          );
        }
      });

      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 2.5,
            ease: "power2.out",
            delay: 0.9,
          },
        );
      }

      // Redirect to dashboard after 3 seconds
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 3000);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-background"
    >
      <div className="max-w-4xl w-full">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-success success-icon" />
          </div>
          <h2 className="text-4xl font-bold text-text-primary mb-4 success-text">
            Application Created Successfully!
          </h2>
          <p className="text-lg text-text-secondary success-text">
            Redirecting to your dashboard...
          </p>
        </div>

        {/* Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Application Card */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className="bg-surface p-6 rounded-xl shadow-lg border border-border"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <FiBarChart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                1 Application
              </h3>
            </div>
            <p className="text-text-secondary">
              Your first job application is now being tracked
            </p>
          </div>

          {/* Metrics Card */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className="bg-surface p-6 rounded-xl shadow-lg border border-border"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Metrics Visible
              </h3>
            </div>
            <p className="text-text-secondary">
              Track your progress with real-time analytics
            </p>
          </div>

          {/* Pipeline Card */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className="bg-surface p-6 rounded-xl shadow-lg border border-border"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Pipeline Ready
              </h3>
            </div>
            <p className="text-text-secondary">
              Visualize your job search pipeline
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-primary rounded-full"
            ></div>
          </div>
          <p className="text-center text-sm text-text-secondary mt-2">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}
