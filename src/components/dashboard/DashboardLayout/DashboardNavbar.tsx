"use client";

import { Search, Bell, ChevronDown, Briefcase } from "lucide-react";
import ThemeToggle from "../../ui/theme-toggle";

export default function DashboardNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trackwise
              </h1>
              <p className="text-xs text-text-secondary">Career Tracker</p>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search applications, companies..."
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button className="p-2 rounded-lg hover:bg-surface relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </button>

            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface cursor-pointer group">
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
              </div>
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
