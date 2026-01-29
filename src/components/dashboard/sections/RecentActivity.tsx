import { formatRelativeDateTime } from "@/src/lib/utils/date";
import { Activity, Application } from "@prisma/client";
import { FileText } from "lucide-react";

export default function RecentActivity({
  applications,
}: {
  applications: (Application & { activities: Activity[] })[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">
        Recent Activity
      </h2>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {applications
            .flatMap((app) => app.activities)
            .map((activity) => {
              const app = applications.find(
                (a) => a.id === activity.applicationId,
              );

              return (
                <div key={activity.id} className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-text-secondary">
                        {formatRelativeDateTime(activity.occurredAt)}
                      </span>
                    </div>
                    {app && (
                      <p className="text-sm text-text-secondary mt-1">
                        {app.company} • {app.role}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
