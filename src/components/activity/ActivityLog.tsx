// app/components/activity/activity-log.tsx
"use client";

import { Briefcase, Filter, MessageSquare, Sparkles } from "lucide-react";
import { ActivityWithApplication } from "@/src/types/activity";
import ActivityTimeline from "./ActivityTimeline";
import { useActivity } from "@/src/hooks/useActivity";
import ActivityHeader from "./ActivityHeader";
import ActivityFilters from "./ActivityFilters";
import ActivityFooter from "./ActivityFooter";

interface ActivityLogProps {
  userId: string;
  initialActivities?: ActivityWithApplication[];
  initialTotal?: number;
}

export default function ActivityLog({
  userId,
  initialActivities = [],
  initialTotal = 0,
}: ActivityLogProps) {
  const {
    activities,
    total,
    loading,
    loadingMore,
    hasMore,

    filters,
    searchQuery,
    showFilters,

    activityTypeCounts,

    setShowFilters,

    handleSearch,
    handleFilterChange,
    clearFilters,
    loadMore,
    refresh,
  } = useActivity(userId, initialActivities, initialTotal);

  return (
    <div className="min-h-screen bg-background">
      <ActivityHeader
        searchQuery={searchQuery}
        filtersCount={Object.keys(filters).length}
        onSearch={handleSearch}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onRefresh={refresh}
        loading={loading}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80">
              <ActivityFilters
                filters={filters}
                total={total}
                activityTypeCounts={activityTypeCounts}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
              />
            </div>
          )}

          {/* Activity Content */}
          <div className="flex-1">
            {/* Premium Stats Card */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/5 via-surface/50 to-secondary/5 border border-border/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold text-text-primary">
                      Activity Timeline
                    </h2>
                  </div>
                  <p className="text-text-secondary">
                    Track all your job search activities in one place
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-text-primary">
                    {total.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Total Activities
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="rounded-2xl border border-border bg-surface/50 p-12 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-border border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Loading Activities
                    </h3>
                    <p className="text-text-secondary">
                      Gathering your job search journey...
                    </p>
                  </div>
                </div>
              </div>
            ) : activities.length === 0 ? (
              /* Empty State */
              <div className="rounded-2xl border border-border bg-surface/50 p-12 backdrop-blur-sm text-center">
                <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-8">
                  <MessageSquare className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  No activities found
                </h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  {searchQuery || Object.keys(filters).length > 0
                    ? "No activities match your current filters. Try adjusting your search criteria."
                    : "Start building your job search history by adding activities to your applications."}
                </p>
                {searchQuery || Object.keys(filters).length > 0 ? (
                  <button
                    onClick={clearFilters}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                ) : (
                  <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors">
                    Add Your First Activity
                  </button>
                )}
              </div>
            ) : (
              <ActivityTimeline
                activities={activities}
                hasMore={hasMore}
                loadMore={loadMore}
                loadingMore={loadingMore}
              />
            )}

            {/* Summary Footer */}
            {activities.length > 0 && (
              <ActivityFooter shown={activities.length} total={total} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Toggle - Premium */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary-hover text-white shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <Filter className="h-6 w-6" />
          {Object.keys(filters).length > 0 && (
            <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-error text-xs flex items-center justify-center animate-pulse">
              {Object.keys(filters).length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
