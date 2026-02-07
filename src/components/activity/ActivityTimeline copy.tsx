import { useMemo } from "react";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  Clock,
  Building,
  Briefcase,
  MessageSquare,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import { ActivityType } from "@prisma/client";
import { ActivityWithApplication } from "@/src/types/activity";
import { ACTIVITY_ICONS } from "@/src/lib/config/activity/activityIcons";
import { ACTIVITY_COLORS } from "@/src/lib/config/activity/activityColors";
import { ACTIVITY_LABELS } from "@/src/lib/config/activity/activityLabels";
import { STATUS_COLORS } from "@/src/lib/config/activity/activityStatusColors";
import { formatDateHeader, formatRelativeTime } from "@/src/lib/utils/date";

interface TimelineProps {
  activities: ActivityWithApplication[];
  selectedActivity: ActivityWithApplication | null;
  setSelectedActivity: (value: ActivityWithApplication | null) => void;
  hasMore: boolean;
  loadMore: () => void;
  loadingMore: boolean;
}

export default function ActivityTimeline({
  activities,
  selectedActivity,
  setSelectedActivity,
  hasMore,
  loadMore,
  loadingMore,
}: TimelineProps) {
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ActivityWithApplication[]> = {};

    activities.forEach((activity) => {
      const dateKey = format(activity.occurredAt, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    return groups;
  }, [activities]);

  // Get activity icon
  const getActivityIcon = (type: ActivityType) => {
    return ACTIVITY_ICONS[type] || <MessageSquare className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedActivities).map(([dateKey, dateActivities]) => (
        <div key={dateKey} className="relative">
          {/* Date Header */}
          <div className="sticky top-20 z-10 mb-6">
            <div className="inline-flex items-center gap-3 bg-surface border border-border rounded-full px-4 py-2">
              <Calendar className="h-4 w-4" />
              <span className="font-semibold">{formatDateHeader(dateKey)}</span>
              <span className="text-sm text-text-secondary">
                • {dateActivities.length} activities
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

            {/* Activities */}
            {dateActivities.map((activity) => (
              <div key={activity.id} className="relative mb-6 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 transform -translate-x-1/2">
                  <div
                    className={`h-6 w-6 rounded-full border-4 border-background flex items-center justify-center ${
                      ACTIVITY_COLORS[activity.type].split(" ")[0]
                    }`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                {/* Activity Card */}
                <div className="ml-8">
                  <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${ACTIVITY_COLORS[activity.type]}`}
                          >
                            {ACTIVITY_LABELS[activity.type]}
                          </span>
                          <span className="text-sm text-text-secondary">
                            {formatRelativeTime(activity.occurredAt)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="text-text-secondary mb-4">
                            {activity.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          setSelectedActivity(
                            selectedActivity?.id === activity.id
                              ? null
                              : activity,
                          )
                        }
                        className="p-2 hover:bg-surface/50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Application Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-text-secondary" />
                          <span className="font-medium">
                            {activity.application.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-text-secondary" />
                          <span className="text-text-secondary">
                            {activity.application.role}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs ${STATUS_COLORS[activity.application.status]}`}
                        >
                          {activity.application.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary text-sm">
                        <Clock className="h-4 w-4" />
                        {format(activity.occurredAt, "h:mm a")}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedActivity?.id === activity.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-text-secondary mb-2">
                              Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Activity ID:</span>
                                <span className="font-mono">
                                  {activity.id.substring(0, 8)}...
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Application ID:</span>
                                <span className="font-mono">
                                  {activity.application.id.substring(0, 8)}
                                  ...
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Recorded:</span>
                                <span>
                                  {format(activity.createdAt, "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-text-secondary mb-2">
                              Actions
                            </h4>
                            <div className="flex gap-2">
                              <button className="flex-1 px-3 py-2 text-sm bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors flex items-center justify-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit
                              </button>
                              <button className="flex-1 px-3 py-2 text-sm bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-3 bg-surface border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Loading...
              </>
            ) : (
              <>
                Load More Activities
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
