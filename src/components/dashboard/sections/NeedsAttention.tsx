import { Application } from "@prisma/client";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import { WorkModeIcon } from "../ui/icons/WorkModeIcon";
import { StatusBadge } from "../../shared-ui/badges/StatusBadge";
import { PriorityBadge } from "../../shared-ui/badges/PriorityBadge";

export default function NeedsAttention({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-warning" />
          <h2 className="text-xl font-semibold text-text-primary">
            Needs Attention
          </h2>
        </div>
        <span className="text-sm text-text-secondary">
          Follow up to stay on track
        </span>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {applications.map((app) => {
              const daysAgo = Math.floor(
                (new Date().getTime() -
                  new Date(app.statusUpdatedAt).getTime()) /
                  (1000 * 60 * 60 * 24),
              );

              return (
                <div key={app.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-text-primary">
                        {app.company}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-text-secondary">{app.role}</p>
                        <WorkModeIcon mode={app.workMode} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium block mb-1">
                        {daysAgo} days
                      </span>
                      <span className="text-xs text-text-secondary">
                        Since update
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <StatusBadge status={app.status} />
                    <PriorityBadge priority={app.priority} />
                  </div>

                  <div className="flex items-center justify-between">
                    {app.recruiterEmail ? (
                      <a
                        href={`mailto:${app.recruiterEmail}`}
                        className="flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-medium"
                      >
                        <Mail className="w-4 h-4" />
                        Follow up
                      </a>
                    ) : (
                      <span className="text-sm text-text-secondary">
                        No contact info
                      </span>
                    )}
                    <button className="px-3 py-1.5 bg-warning/10 text-warning rounded-lg hover:bg-warning/20 transition-colors text-sm font-medium">
                      Update Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Everything is up to date!
            </h3>
            <p className="text-text-secondary">
              All your applications are actively being tracked.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
