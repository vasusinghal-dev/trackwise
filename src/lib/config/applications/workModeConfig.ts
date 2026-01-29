import { WorkMode } from "@prisma/client";
import { Building, Globe, LucideIcon, Users } from "lucide-react";

export const workModeConfig: Record<
  WorkMode,
  { label: string; icon: LucideIcon; color: string }
> = {
  ONSITE: { label: "Onsite", icon: Building, color: "text-gray-500" },
  REMOTE: { label: "Remote", icon: Globe, color: "text-blue-500" },
  HYBRID: { label: "Hybrid", icon: Users, color: "text-purple-500" },
};
