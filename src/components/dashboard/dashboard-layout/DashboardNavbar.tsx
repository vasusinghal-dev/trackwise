"use client";

import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  ArrowRightCircle,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "../../shared-ui/theme-toggle";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/auth-client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

type DropdownOption = "profile" | "logout";

export default function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { data: session, isPending: loading } = authClient.useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = async (option: DropdownOption) => {
    if (option === "logout") {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/auth?mode=signin");
            setIsDropdownOpen(false);
          },
        },
      });
    } else router.push(`/dashboard/${option}`);
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { key: "profile", label: "Manage Profile", icon: User },
    { key: "logout", label: "Logout", icon: LogOut },
  ] as const;

  return (
    // SIMPLE FIXED NAVBAR
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-surface z-50">
      <div className="h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left: Brand */}
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 cursor-pointer shrink-0"
          >
            <Image src="/favicon.svg" alt="Favicon" width={35} height={35} />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-text-primary">Trackwise</h1>
              <p className="text-sm text-text-secondary/80">Career Tracker</p>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search button for mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-surface">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>

            <ThemeToggle />

            <button className="relative p-2 rounded-lg hover:bg-surface transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-1 ring-surface" />
            </button>

            {loading ? (
              <div>...loading</div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 md:pl-2 md:pr-3 rounded-lg hover:bg-surface transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                    <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-5xl font-bold text-text-primary">
                      {session?.user.image ? (
                        <CldImage
                          src={session?.user.image}
                          width={40}
                          height={40}
                          crop="fill"
                          gravity="face"
                          alt="Avatar"
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-white font-semibold text-xl">
                          {session?.user.name?.trim()?.[0]?.toUpperCase() ??
                            "?"}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-top-right">
                    {/* User profile section */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        {/* Avatar circle */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {session?.user.name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </span>
                        </div>

                        {/* Name and email */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {session?.user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {session?.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      {menuItems.slice(0, -1).map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleOptionClick(item.key)}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 group"
                        >
                          <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                          <span>{item.label}</span>
                          <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-400 transition-colors" />
                        </button>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-gray-100"></div>

                    {/* Logout button */}
                    <div className="p-2 bg-gray-50/50">
                      <button
                        onClick={() => handleOptionClick("logout")}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 group"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                        <ArrowRightCircle className="w-4 h-4 ml-auto text-red-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
