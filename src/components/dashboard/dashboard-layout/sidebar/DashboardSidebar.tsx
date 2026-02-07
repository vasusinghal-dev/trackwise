"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/src/lib/auth/auth-client";
import ThemeToggle from "../../../shared-ui/theme-toggle";
import UserProfile from "./UserProfile";
import QuickActions from "./QuickActions";
import NavigationItems from "./NavigationItems";
import { useSidebar } from "@/src/contexts/SidebarContext";

export default function DashboardSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { collapsed, toggleCollapsed } = useSidebar();

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, delay: 0.1 },
      );
    }
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`hidden md:flex fixed top-0 left-0 h-screen border-r border-border bg-surface flex-col z-40 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <Image src="/favicon.svg" alt="Trackwise" width={35} height={35} />
            <div>
              <h1 className="text-xl font-bold text-text-primary tracking-tight">
                Trackwise
              </h1>
              <p className="text-xs text-text-secondary/60 font-medium uppercase tracking-wider">
                Job Tracker
              </p>
            </div>
          </div>
        ) : (
          <Image src="/favicon.svg" alt="Trackwise" width={35} height={35} />
        )}
        <button
          onClick={() => toggleCollapsed()}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-lg hover:bg-surface/80 transition-colors"
        >
          {collapsed ? (
            <FiChevronRight className="w-4 h-4" />
          ) : (
            <FiChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      <UserProfile collapsed={collapsed} />

      {/* {!collapsed && <QuickActions />} */}

      <NavigationItems collapsed={collapsed} />

      <div
        className={`p-4 border-t border-border ${
          collapsed
            ? "flex flex-col items-center space-y-3"
            : "flex items-center justify-between"
        }`}
      >
        <button
          onClick={async () =>
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.replace("/auth?mode=signin");
                },
              },
            })
          }
          className={`flex items-center text-text-secondary/70 hover:text-error rounded-lg hover:bg-surface/80 transition-all duration-200 group ${
            collapsed ? "p-2" : "px-4 py-2.5 text-sm"
          }`}
        >
          <LogOut
            className={`w-4 h-4 ${!collapsed ? "mr-2.5 group-hover:rotate-12 transition-transform" : ""}`}
          />
          {!collapsed && "Sign Out"}
        </button>

        <div className={collapsed ? "mt-2" : ""}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
