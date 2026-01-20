"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ui/theme-toggle";
import { HiOutlineLightningBolt } from "react-icons/hi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <HiOutlineLightningBolt className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              Trackwise
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          {/* Toggle Theme Button */}

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/auth?mode=signin"
              className="px-4 py-2 text-text-primary hover:text-primary transition-colors"
            >
              Sign In
            </a>
            <a
              href="/auth?mode=signup"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="py-2 text-text-primary hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="py-2 text-text-primary hover:text-primary transition-colors"
              >
                How it Works
              </a>
              <a
                href="#"
                className="py-2 text-text-primary hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="py-2 text-text-primary hover:text-primary transition-colors"
              >
                About
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <a
                  href="/auth"
                  className="py-2 text-text-primary hover:text-primary transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/auth"
                  className="py-2 bg-primary text-white rounded-lg text-center hover:bg-primary-hover transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
