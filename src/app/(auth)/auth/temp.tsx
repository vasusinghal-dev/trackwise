"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Rocket,
  Zap,
  CheckCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const signInFormRef = useRef<HTMLDivElement>(null);
  const signUpFormRef = useRef<HTMLDivElement>(null);
  const signInContentRef = useRef<HTMLDivElement>(null);
  const signUpContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initial setup
    if (isSignIn) {
      gsap.set(signUpFormRef.current, { xPercent: 100, opacity: 0 });
      gsap.set(signUpContentRef.current, { xPercent: -100, opacity: 0 });
      gsap.set(signInFormRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(signInContentRef.current, { xPercent: 0, opacity: 1 });
    } else {
      gsap.set(signInFormRef.current, { xPercent: -100, opacity: 0 });
      gsap.set(signInContentRef.current, { xPercent: 100, opacity: 0 });
      gsap.set(signUpFormRef.current, { xPercent: 0, opacity: 1 });
      gsap.set(signUpContentRef.current, { xPercent: 0, opacity: 1 });
    }
  }, []);

  const handleSwap = () => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.inOut" },
    });

    if (isSignIn) {
      // Switch to Sign Up
      tl.to(signInFormRef.current, { xPercent: -100, opacity: 0 })
        .to(signInContentRef.current, { xPercent: 100, opacity: 0 }, 0)
        .to(signUpFormRef.current, { xPercent: 0, opacity: 1 }, 0)
        .to(signUpContentRef.current, { xPercent: 0, opacity: 1 }, 0);
    } else {
      // Switch to Sign In
      tl.to(signUpFormRef.current, { xPercent: 100, opacity: 0 })
        .to(signUpContentRef.current, { xPercent: -100, opacity: 0 }, 0)
        .to(signInFormRef.current, { xPercent: 0, opacity: 1 }, 0)
        .to(signInContentRef.current, { xPercent: 0, opacity: 1 }, 0);
    }

    setIsSignIn(!isSignIn);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
    console.log("Sign in submitted");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    console.log("Sign up submitted");
  };

  const features = [
    { icon: Shield, text: "Enterprise-grade security", color: "text-blue-500" },
    { icon: Zap, text: "Lightning fast performance", color: "text-amber-500" },
    { icon: Sparkles, text: "AI-powered insights", color: "text-purple-500" },
    { icon: Rocket, text: "Scale without limits", color: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[900px] rounded-2xl overflow-hidden shadow-2xl border border-border"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        {/* Sign In Section - Left */}
        <div
          ref={signInFormRef}
          className="absolute top-0 left-0 w-1/2 h-full p-12 flex flex-col justify-center z-20"
        >
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary">
                  Welcome Back
                </h1>
              </div>
              <p className="text-text-secondary">
                Sign in to your account to continue your journey with us.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-text-secondary" />
                      ) : (
                        <Eye className="w-5 h-5 text-text-secondary" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-text-secondary">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-hover font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Sign In
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-text-secondary">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-text-secondary">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
                >
                  <FaGithub className="w-5 h-5" />
                  <span className="text-text-secondary">GitHub</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-text-secondary">
              Don&apos;t have an account?{" "}
              <button
                onClick={handleSwap}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>

        {/* Sign In Content - Right */}
        <div
          ref={signInContentRef}
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-primary to-secondary p-12 flex flex-col justify-center z-10"
        >
          <div className="max-w-md mx-auto w-full text-white">
            <div className="mb-10">
              <Sparkles className="w-12 h-12 mb-6" />
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg opacity-90">
                We&apos;re thrilled to see you again. Your journey continues
                here.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-lg italic">
                &quot;The best platform for productivity and
                collaboration.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Sign Up Section - Right */}
        <div
          ref={signUpFormRef}
          className="absolute top-0 right-0 w-1/2 h-full p-12 flex flex-col justify-center z-20"
        >
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary">
                  Create Account
                </h1>
              </div>
              <p className="text-text-secondary">
                Join our community and unlock exclusive features.
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-text-secondary" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 mt-1"
                />
                <span className="ml-2 text-sm text-text-secondary">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-primary-hover">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-primary-hover">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Create Account
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-text-secondary">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-text-secondary">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
                >
                  <FaGithub className="w-5 h-5" />
                  <span className="text-text-secondary">GitHub</span>
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-text-secondary">
              Already have an account?{" "}
              <button
                onClick={handleSwap}
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Sign Up Content - Left */}
        <div
          ref={signUpContentRef}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-secondary to-primary p-12 flex flex-col justify-center z-10"
        >
          <div className="max-w-md mx-auto w-full text-white">
            <div className="mb-10">
              <Rocket className="w-12 h-12 mb-6" />
              <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg opacity-90">
                Start your journey with us and unlock a world of possibilities.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Access to premium features",
                "24/7 dedicated support",
                "Collaborate with teams",
                "Advanced analytics dashboard",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
