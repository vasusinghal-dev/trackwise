"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FiHome,
  FiBriefcase,
  FiActivity,
  FiClock,
  FiSettings,
} from "react-icons/fi";

const navigationItems = [
  { id: 1, name: "Dashboard", icon: FiHome, active: true },
  { id: 2, name: "Applications", icon: FiBriefcase },
  { id: 3, name: "Activity", icon: FiActivity },
  { id: 4, name: "Reminders", icon: FiClock },
  { id: 5, name: "Settings", icon: FiSettings },
];

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.1 },
    );
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="hidden md:flex flex-col w-64 border-r border-border bg-surface min-h-[calc(100vh-73px)]"
    >
      <div className="p-6">
        <h2 className="text-sm font-semibold text-text-secondary uppercase mb-4">
          Navigation
        </h2>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "hover:bg-surface hover:text-primary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-sm font-semibold text-text-secondary uppercase mb-4">
            Quick Stats
          </h2>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-text-secondary">This Week</p>
              <p className="text-lg font-semibold">3 Applications</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-text-secondary">Response Rate</p>
              <p className="text-lg font-semibold text-success">42%</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
