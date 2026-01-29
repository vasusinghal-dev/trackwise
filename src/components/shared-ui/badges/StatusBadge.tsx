import { statusConfig } from "@/src/lib/config/applications/statusConfig";
import { ApplicationStatus } from "@prisma/client";

// const statusConfig = {
//   DRAFT: { label: "Draft", color: "text-gray-500", bg: "bg-gray-100" },
//   APPLIED: { label: "Applied", color: "text-blue-500", bg: "bg-blue-100" },
//   SCREENING: {
//     label: "Screening",
//     color: "text-yellow-500",
//     bg: "bg-yellow-100",
//   },
//   INTERVIEWING: {
//     label: "Interviewing",
//     color: "text-purple-500",
//     bg: "bg-purple-100",
//   },
//   TECHNICAL: {
//     label: "Technical",
//     color: "text-orange-500",
//     bg: "bg-orange-100",
//   },
//   FINAL_ROUND: {
//     label: "Final Round",
//     color: "text-indigo-500",
//     bg: "bg-indigo-100",
//   },
//   OFFER: { label: "Offer", color: "text-green-500", bg: "bg-green-100" },
//   NEGOTIATING: {
//     label: "Negotiating",
//     color: "text-green-600",
//     bg: "bg-green-100",
//   },
//   ACCEPTED: {
//     label: "Accepted",
//     color: "text-emerald-500",
//     bg: "bg-emerald-100",
//   },
//   REJECTED: { label: "Rejected", color: "text-red-500", bg: "bg-red-100" },
//   WITHDRAWN: {
//     label: "Withdrawn",
//     color: "text-red-600",
//     bg: "bg-red-100",
//   },
//   GHOSTED: { label: "Ghosted", color: "text-gray-600", bg: "bg-gray-100" },
// };

export const StatusBadge = ({
  status,
  stage,
}: {
  status: ApplicationStatus;
  stage?: string | null;
}) => {
  const config = statusConfig[status] || statusConfig.APPLIED;

  return (
    // <span
    //   className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
    // >
    //   {config.label}
    // </span>
    <div className="flex flex-col gap-1">
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.bg} border ${config.borderColor} w-fit`}
      >
        <config.icon className={`w-3 h-3 ${config.color}`} />
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>
      {stage && (
        <span className="text-xs text-text-secondary truncate max-w-[120px]">
          {stage}
        </span>
      )}
    </div>
  );
};
