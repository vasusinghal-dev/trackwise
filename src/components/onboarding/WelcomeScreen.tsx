// components/onboarding/WelcomeScreen.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animation for elements
      gsap.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );

      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-surface to-background"
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-10">
          {/* Animated icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping"></div>
            <CheckCircle className="w-12 h-12 text-primary relative z-10" />
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight opacity-0"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trackwise
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={textRef}
            className="text-lg text-text-secondary mb-10 opacity-0"
          >
            Your professional job search companion
          </p>
        </div>

        {/* Continue button */}
        <button
          ref={buttonRef}
          onClick={onContinue}
          className="group w-full py-4 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98] shadow-lg hover:shadow-xl  opacity-0"
        >
          <span className="flex items-center justify-center gap-2">
            Get Started
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>

        {/* Progress indicators */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-border rounded-full"></div>
            <div className="w-3 h-3 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
