"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SignUpPanel from "@/src/components/auth-page/SignUp/SignUpPanel";
import SignUpContent from "@/src/components/auth-page/SignUp/SignUpContent";
import SignInPanel from "@/src/components/auth-page/SignIn/SignInPanel";
import SignInContent from "@/src/components/auth-page/SignIn/SignInContent";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

export default function AuthClient() {
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
        {/* Logo/Homepage Button */}
        <Link href="/" className="absolute top-6 left-6 z-50 group">
          <div className="relative">
            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap flex items-center gap-1 shadow-lg">
                <HiOutlineHome className="w-3 h-3" />
                Go to homepage
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>

            {/* Logo */}
            <div className="w-46 h-13 bg-black flex items-center gap-2 justify-center rounded-lg">
              <div className="flex items-center gap-2 justify-center group-hover:shadow-xl group-hover:scale-105">
                <Image
                  src="/favicon.svg"
                  alt="Favicon"
                  width={35}
                  height={35}
                />
                <span className="text-xl font-bold text-black bg-white backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm transition-colors duration-200">
                  Trackwise
                </span>
              </div>
            </div>
          </div>
        </Link>

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
