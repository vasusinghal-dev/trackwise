import { workModeConfig } from "@/src/lib/config/applications/workModeConfig";
import { WorkMode } from "@prisma/client";

export const WorkModeBadge = ({ mode }: { mode: WorkMode }) => {
  const config = workModeConfig[mode];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      <span className="text-text-secondary">{config.label}</span>
    </div>
  );
};
