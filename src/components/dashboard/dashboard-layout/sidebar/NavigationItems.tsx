"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FiHome,
  FiBriefcase,
  FiActivity,
  FiSettings,
  FiFileText,
  FiChevronRight,
  FiEdit,
  FiBell,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";

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
        icon: FiEdit,
      },
    ],
  },
  {
    id: 3,
    name: "Activity Log",
    icon: FiActivity,
    href: "/dashboard/activity",
  },
  { id: 4, name: "Reminders", icon: FiBell, href: "/dashboard/reminders" },
  { id: 5, name: "Calendar", icon: FiCalendar, href: "/dashboard/calendar" },
  { id: 6, name: "Admin", icon: FiUsers, href: "/dashboard/admin" },
  { id: 7, name: "Settings", icon: FiSettings, href: "/dashboard/settings" },
];

interface NavigationItemsProps {
  collapsed?: boolean;
}

export default function NavigationItems({
  collapsed = false,
}: NavigationItemsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const isParentActive = (href: string) => {
    if (status) return false;
    return pathname === href;
  };

  const isSubItemActive = (subHref: string) => {
    if (subHref.includes("?status=")) {
      const expectedStatus = subHref.split("status=")[1];
      if (pathname === "/dashboard/applications" && status === expectedStatus) {
        return true;
      }
    }
    return pathname === subHref || pathname.startsWith(subHref);
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex-1 overflow-y-auto py-5 px-4">
      <nav className="space-y-1">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider px-3 mb-3">
            Navigation
          </h3>
        )}
        {navigationItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedItems.includes(item.id);
          const isItemActive = isParentActive(item.href);

          if (collapsed) {
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`flex items-center justify-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isItemActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "hover:bg-surface/80 text-text-secondary hover:text-text-primary"
                }`}
                title={item.name}
              >
                <item.icon className="w-5 h-5" />
              </button>
            );
          }

          return (
            <div key={item.id} className="space-y-0.5">
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(item.id);
                  } else {
                    router.push(item.href);
                  }
                }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isItemActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "hover:bg-surface/80 text-text-secondary hover:text-text-primary"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-4 h-4 ${
                      isItemActive ? "opacity-100" : "opacity-70"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {hasSubItems && (
                  <FiChevronRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    } ${isItemActive ? "opacity-100" : "opacity-50"}`}
                  />
                )}
              </button>

              {/* Sub-items */}
              {hasSubItems && isExpanded && (
                <div className="ml-4 pl-4 border-l border-border/50 space-y-0.5 mt-0.5">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => router.push(subItem.href)}
                      className={`flex items-center space-x-2.5 w-full px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                        isSubItemActive(subItem.href)
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-text-secondary/70 hover:text-text-primary hover:bg-surface/50"
                      }`}
                    >
                      {subItem.icon && (
                        <subItem.icon className="w-3.5 h-3.5 opacity-60" />
                      )}
                      <span>{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
