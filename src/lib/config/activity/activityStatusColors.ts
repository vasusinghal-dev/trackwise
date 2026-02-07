import { ApplicationStatus } from "@prisma/client";

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  APPLIED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  SCREENING: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  INTERVIEWING:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  TECHNICAL:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  FINAL_ROUND:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  OFFER: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  NEGOTIATING:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  ACCEPTED:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  REJECTED: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  WITHDRAWN: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  GHOSTED: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
};
