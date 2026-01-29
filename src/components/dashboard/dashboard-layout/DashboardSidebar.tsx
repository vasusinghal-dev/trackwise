"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FiHome,
  FiBriefcase,
  FiActivity,
  FiClock,
  FiSettings,
  FiFileText, // Add this import
} from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react"; // Add these imports
import { useState } from "react"; // Add this import

const navigationItems = [
  { id: 1, name: "Dashboard", icon: FiHome, href: "/dashboard" },
  {
    id: 2,
    name: "Applications",
    icon: FiBriefcase,
    href: "/dashboard/applications",
    subItems: [
      {
        id: 21,
        name: "All Applications",
        href: "/dashboard/applications?status=all",
      },
      {
        id: 22,
        name: "Drafts",
        href: "/dashboard/applications?status=draft",
        icon: FiFileText,
      },
      {
        id: 23,
        name: "New Application",
        href: "/dashboard/applications/new",
        icon: FiBriefcase,
      },
    ],
  },
  { id: 3, name: "Activity", icon: FiActivity, href: "/dashboard/activity" },
  { id: 4, name: "Reminders", icon: FiClock, href: "/dashboard/reminders" },
  { id: 5, name: "Settings", icon: FiSettings, href: "/dashboard/profile" },
];

export default function DashboardSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, delay: 0.1 },
      );
    }
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isParentActive = (href: string) => {
    if (status) return false;
    return pathname === href;
  };

  const isSubItemActive = (subHref: string) => {
    // Handle ?status= filters
    if (subHref.includes("?status=")) {
      const expectedStatus = subHref.split("status=")[1];

      if (pathname === "/dashboard/applications" && status === expectedStatus) {
        return true;
      }
    }

    return pathname === subHref || pathname.startsWith(subHref);
  };

  return (
    <aside
      ref={sidebarRef}
      className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-border bg-surface z-40"
    >
      <div className="p-6 h-full overflow-y-auto">
        <h2 className="text-sm font-semibold text-text-secondary uppercase mb-4">
          Navigation
        </h2>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const isItemActive = isParentActive(item.href);

            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpanded(item.id);
                    } else {
                      router.push(item.href);
                    }
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all ${
                    isItemActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-surface hover:text-primary"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {hasSubItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Sub-items */}
                {hasSubItems && isExpanded && (
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => router.push(subItem.href)}
                        className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                          isSubItemActive(subItem.href)
                            ? "bg-primary/5 text-primary font-medium"
                            : "hover:bg-surface hover:text-text-primary text-text-secondary"
                        }`}
                      >
                        {subItem.icon && <subItem.icon className="w-4 h-4" />}
                        <span>{subItem.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Stats - Add draft count */}
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
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-text-secondary">Drafts</p>
              <p className="text-lg font-semibold text-warning">2 Unsaved</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
