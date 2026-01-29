import { Priority } from "@prisma/client";

export const priorityConfig: Record<Priority, { label: string }> = {
  LOW: { label: "Low" },
  MEDIUM: { label: "Medium" },
  HIGH: { label: "Hybrid" },
  CRITICAL: { label: "Critical" },
};
