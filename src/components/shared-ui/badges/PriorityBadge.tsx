import { Priority } from "@prisma/client";

export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles: Record<Priority, string> = {
    CRITICAL: "bg-error/10 text-error border border-error/20",
    HIGH: "bg-error/10 text-error border border-error/20",
    MEDIUM: "bg-warning/10 text-warning border border-warning/20",
    LOW: "bg-success/10 text-success border border-success/20",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${styles[priority]}`}
    >
      {priority.toLowerCase()}
    </span>
  );
};
