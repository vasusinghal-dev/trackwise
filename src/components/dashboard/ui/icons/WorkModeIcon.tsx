import { WorkMode } from "@prisma/client";
import { Building, Globe, Users } from "lucide-react";

export const WorkModeIcon = ({ mode }: { mode: WorkMode }) => {
  switch (mode) {
    case "REMOTE":
      return <Globe className="w-3.5 h-3.5 text-blue-500" />;
    case "HYBRID":
      return <Users className="w-3.5 h-3.5 text-purple-500" />;
    case "ONSITE":
      return <Building className="w-3.5 h-3.5 text-gray-500" />;
  }
};
