"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Sidebar from "@/src/components/dashboard/DashboardLayout/Sidebar";
import DashboardNavbar from "@/src/components/dashboard/DashboardLayout/DashboardNavbar";

export default function DashboardPage() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      mainContentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.3 },
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors">
      <DashboardNavbar />

      <div className="flex">
        <Sidebar />

        {/* Main content — you’ll plug dashboard sections here later */}
        <main ref={mainContentRef} className="flex-1 p-6 md:p-8 overflow-auto">
          {/* TEMP PLACEHOLDER */}
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Layout ready. Now build the real stuff.
          </p>
        </main>
      </div>
    </div>
  );
}
