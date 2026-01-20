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
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 ref={titleRef} className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Trackwise
          </h1>
          <p ref={textRef} className="text-lg text-gray-600 mb-8">
            Track your job search professionally.
          </p>
        </div>

        <button
          ref={buttonRef}
          onClick={onContinue}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue
        </button>

        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
