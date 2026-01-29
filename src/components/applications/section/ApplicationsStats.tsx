import { Application } from "@prisma/client";

export default function ApplicationsStats({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div className="bg-surface border border-border rounded-lg p-3">
        <p className="text-xs text-text-secondary">Total</p>
        <p className="text-lg font-bold text-text-primary">
          {applications.length}
        </p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-600">Applied</p>
        <p className="text-lg font-bold text-blue-600">
          {applications.filter((a) => a.status === "APPLIED").length}
        </p>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <p className="text-xs text-purple-600">Interviewing</p>
        <p className="text-lg font-bold text-purple-600">
          {
            applications.filter((a) =>
              ["INTERVIEWING", "TECHNICAL", "FINAL_ROUND"].includes(a.status),
            ).length
          }
        </p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-xs text-green-600">Offers</p>
        <p className="text-lg font-bold text-green-600">
          {
            applications.filter((a) =>
              ["OFFER", "NEGOTIATING"].includes(a.status),
            ).length
          }
        </p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <p className="text-xs text-red-600">Rejected</p>
        <p className="text-lg font-bold text-red-600">
          {
            applications.filter((a) =>
              ["REJECTED", "WITHDRAWN", "GHOSTED"].includes(a.status),
            ).length
          }
        </p>
      </div>
      <div className="bg-surface border border-border rounded-lg p-3">
        <p className="text-xs text-text-secondary">Avg Salary</p>
        <p className="text-lg font-bold text-text-primary">
          $
          {Math.round(
            applications
              .filter((a) => a.salaryMin)
              .reduce((sum, a) => sum + (a.salaryMin || 0), 0) /
              applications.filter((a) => a.salaryMin).length /
              1000,
          )}
          k
        </p>
      </div>
    </div>
  );
}
