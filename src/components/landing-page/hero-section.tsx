"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-content",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".hero-feature",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power3.out",
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="hero-content opacity-0 translate-y-[50px] max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
            Job tracking,
            <span className="text-primary block">without chaos.</span>
          </h1>

          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            A productivity-focused SaaS for serious job seekers. Manage
            applications, interviews, and decisions in one structured system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold 
                         hover:bg-primary-hover transition-all flex items-center justify-center gap-2
                         hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Start Tracking Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="px-8 py-4 bg-surface text-text-primary rounded-lg font-semibold
                         border border-border hover:border-primary transition-colors hover:shadow-md"
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            "Clear application pipeline",
            "Stage-based workflow tracking",
            "Interview scheduling",
            "Never miss follow-ups",
          ].map((feature, index) => (
            <div
              key={index}
              className="hero-feature opacity-0 translate-x-[-30px] p-6 bg-surface rounded-xl border border-border 
                                 hover:border-primary transition-all hover:shadow-md"
            >
              <CheckCircle className="w-6 h-6 text-primary mb-3" />
              <p className="text-text-primary font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
