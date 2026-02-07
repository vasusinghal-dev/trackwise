import { ACTIVITY_LABELS } from "@/src/lib/config/activity/activityLabels";
import { ActivityFilters as filters } from "@/src/types/activity";
import { ActivityType } from "@prisma/client";

type ActivityFiltersProps = {
  filters: filters;
  total: number;
  activityTypeCounts: { type: ActivityType; count: number }[];
  onFilterChange: (filters: filters) => void;
  onClear: () => void;
};

export default function ActivityFilters({
  filters,
  total,
  activityTypeCounts,
  onFilterChange,
  onClear,
}: ActivityFiltersProps) {
  return (
    <div className="lg:w-80">
      <div className="bg-surface rounded-xl border border-border p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button
            onClick={onClear}
            className="text-sm text-primary hover:text-primary-hover"
          >
            Clear all
          </button>
        </div>

        {/* Activity Type Filters */}
        <div className="mb-6">
          <h3 className="font-medium text-text-secondary mb-3">
            Activity Type
          </h3>
          <div className="space-y-2">
            {activityTypeCounts.map(({ type, count }) => (
              <button
                key={type}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    type: filters.type === type ? undefined : type,
                  })
                }
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  filters.type === type
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-surface/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      filters.type === type ? "bg-primary" : "bg-border"
                    }`}
                  />
                  <span className="text-sm">{ACTIVITY_LABELS[type]}</span>
                </div>
                <span className="text-xs text-text-secondary">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="mb-6">
          <h3 className="font-medium text-text-secondary mb-3">Date Range</h3>
          <div className="space-y-2">
            {[
              { label: "Last 7 days", days: 7 },
              { label: "Last 30 days", days: 30 },
              { label: "Last 90 days", days: 90 },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  const from = new Date();
                  from.setDate(from.getDate() - range.days);
                  onFilterChange({
                    ...filters,
                    dateRange: { from, to: new Date() },
                  });
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-surface/80 transition-colors text-sm"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Total Activities</span>
            <span className="font-semibold">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
