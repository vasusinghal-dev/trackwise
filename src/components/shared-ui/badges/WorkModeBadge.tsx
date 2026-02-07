// /src/components/shared-ui/badges/WorkModeBadge.tsx
import { WorkMode } from "@prisma/client";

interface WorkModeBadgeProps {
  mode: WorkMode | null;
}

export const WorkModeBadge = ({ mode }: WorkModeBadgeProps) => {
  if (!mode) return null;

  const styles: Record<WorkMode, string> = {
    REMOTE: "bg-secondary/10 text-secondary border border-secondary/20",
    HYBRID: "bg-warning/10 text-warning border border-warning/20",
    ONSITE: "bg-primary/10 text-primary border border-primary/20",
  };

  const labels: Record<WorkMode, string> = {
    REMOTE: "Remote",
    HYBRID: "Hybrid",
    ONSITE: "On-site",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[mode]}`}>
      {labels[mode]}
    </span>
  );
};
