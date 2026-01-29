import { PipelineData } from "@/src/lib/utils/dashboard/pipeline";
import {
  Briefcase,
  CheckCircle,
  ChevronRight,
  Phone,
  XCircle,
} from "lucide-react";
import { WorkModeIcon } from "../ui/icons/WorkModeIcon";
import { StatusBadge } from "../../shared-ui/badges/StatusBadge";

export default function PipelineSnapshot({
  pipeline,
}: {
  pipeline: PipelineData;
}) {
  const pipelineStructure = [
    {
      key: "applied",
      label: "Applied",
      color: "border-blue-200 bg-blue-50/30",
      icon: Briefcase,
      data: pipeline.applied,
    },
    {
      key: "interviewing",
      label: "Interviewing",
      color: "border-purple-200 bg-purple-50/30",
      icon: Phone,
      data: pipeline.interviewing,
    },
    {
      key: "offer",
      label: "Offer",
      color: "border-green-200 bg-green-50/30",
      icon: CheckCircle,
      data: pipeline.offer,
    },
    {
      key: "rejected",
      label: "Rejected",
      color: "border-red-200 bg-red-50/30",
      icon: XCircle,
      data: pipeline.rejected,
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Pipeline Snapshot
        </h2>
        <button className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1">
          View all applications <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pipelineStructure.map(({ key, label, color, icon: Icon, data }) => (
          <div
            key={key}
            className={`bg-surface border ${color} rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-text-secondary" />
                <h3 className="font-semibold text-text-primary">{label}</h3>
              </div>
              <span className="text-2xl font-bold text-text-primary">
                {data.length}
              </span>
            </div>

            <div className="space-y-3">
              {data.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="pb-3 border-b border-border/50 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-text-primary truncate">
                          {app.company}
                        </p>
                        <WorkModeIcon mode={app.workMode} />
                      </div>
                      <p className="text-sm text-text-secondary truncate">
                        {app.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <StatusBadge status={app.status} />
                    {app.salaryMin && (
                      <span className="text-xs text-text-secondary">
                        ${app.salaryMin / 1000}k
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data.length === 0 && (
              <div className="text-center py-4">
                <p className="text-text-secondary text-sm">
                  No items in this stage
                </p>
              </div>
            )}

            {data.length > 3 && (
              <button className="w-full mt-4 py-2 border border-border rounded-lg hover:bg-background transition-colors text-sm font-medium">
                Show {data.length - 3} more
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
