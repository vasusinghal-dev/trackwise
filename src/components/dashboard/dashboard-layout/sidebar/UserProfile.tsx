"use client";

import { CldImage } from "next-cloudinary";
import { authClient } from "@/src/lib/auth/auth-client";

interface UserProfileProps {
  collapsed?: boolean;
}

export default function UserProfile({ collapsed = false }: UserProfileProps) {
  const { data: session } = authClient.useSession();

  if (!session?.user) return null;

  return (
    <div
      className={`px-5 py-4 border-b border-border bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-900/30 dark:to-gray-800/30 ${
        collapsed ? "flex flex-col items-center" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {session?.user.image ? (
            <CldImage
              src={session?.user.image}
              width={collapsed ? 32 : 40}
              height={collapsed ? 32 : 40}
              crop="fill"
              gravity="face"
              alt="Avatar"
              className="rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div
              className={`rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm ${
                collapsed ? "w-8 h-8" : "w-10 h-10"
              }`}
            >
              <span className="text-white font-semibold text-sm">
                {session?.user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-surface"></div>
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {session?.user.name}
            </p>
            <p className="text-xs text-text-secondary/70 truncate">
              {session?.user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
