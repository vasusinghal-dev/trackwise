"use client";

import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "../shared-ui/theme-toggle";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Ready to organize your job search?
          </h2>
          <p className="text-text-secondary mb-10 text-lg">
            Join thousands who&apos;ve transformed their job search from chaotic
            to controlled.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth?mode=signup"
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold
                         flex items-center gap-2 hover:bg-primary-hover transition-colors
                         shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <ThemeToggle />
          </div>

          <p className="mt-8 text-text-secondary text-sm">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
