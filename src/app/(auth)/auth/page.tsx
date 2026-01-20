"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SignUpPanel from "@/src/components/auth-page/SignUp/SignUpPanel";
import SignUpContent from "@/src/components/auth-page/SignUp/SignUpContent";
import SignInPanel from "@/src/components/auth-page/SignIn/SignInPanel";
import SignInContent from "@/src/components/auth-page/SignIn/SignInContent";
import { useSearchParams } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isSignIn, setIsSignIn] = useState(() => mode === "signin");

  const signInFormRef = useRef<HTMLDivElement>(null);
  const signUpFormRef = useRef<HTMLDivElement>(null);
  const signInContentRef = useRef<HTMLDivElement>(null);
  const signUpContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isSignIn) {
      gsap.set(signUpFormRef.current, { xPercent: 100, opacity: 0 });
      gsap.set(signUpContentRef.current, { xPercent: -100, opacity: 0 });
      gsap.set(signInFormRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(signInContentRef.current, { xPercent: 0, opacity: 1 });
    } else {
      gsap.set(signInFormRef.current, { xPercent: 100, opacity: 0 });
      gsap.set(signInContentRef.current, { xPercent: -100, opacity: 0 });
      gsap.set(signUpFormRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(signUpContentRef.current, { xPercent: 0, opacity: 1 });
    }
  }, []);

  const handleSwap = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.inOut" },
    });

    if (isSignIn) {
      tl.to(signInFormRef.current, { xPercent: 100, opacity: 0 })
        .to(signInContentRef.current, { xPercent: -100, opacity: 0 }, 0)
        .to(signUpFormRef.current, { xPercent: 0, opacity: 1 }, 0)
        .to(signUpContentRef.current, { xPercent: 0, opacity: 1 }, 0);
    } else {
      tl.to(signUpFormRef.current, { xPercent: 100, opacity: 0 })
        .to(signUpContentRef.current, { xPercent: -100, opacity: 0 }, 0)
        .to(signInFormRef.current, { xPercent: 0, opacity: 1 }, 0)
        .to(signInContentRef.current, { xPercent: 0, opacity: 1 }, 0);
    }

    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="relative w-full max-w-6xl h-[900px] rounded-2xl overflow-hidden shadow-2xl border">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <SignInPanel ref={signInFormRef} onSwap={handleSwap} />
        <SignInContent ref={signInContentRef} />

        <SignUpPanel ref={signUpFormRef} onSwap={handleSwap} />
        <SignUpContent ref={signUpContentRef} />
      </div>
    </div>
  );
}
