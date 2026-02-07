"use client";

import { useSidebar } from "@/src/contexts/SidebarContext";
import DashboardSidebar from "../sidebar/DashboardSidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-background text-text-primary relative">
      <DashboardSidebar />

      <div
        className={`transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
