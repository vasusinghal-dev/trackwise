import { useState, useEffect, useCallback } from "react";
import { ActivityType } from "@prisma/client";
import { ActivityWithApplication, ActivityFilters } from "@/src/types/activity";
import {
  getActivityTypeCounts,
  getUserActivities,
} from "@/src/lib/actions/activity.actions";

interface UseActivityResult {
  activities: ActivityWithApplication[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;

  filters: ActivityFilters;
  searchQuery: string;
  showFilters: boolean;

  activityTypeCounts: Array<{ type: ActivityType; count: number }>;

  setShowFilters: (v: boolean) => void;

  handleSearch: (query: string) => void;
  handleFilterChange: (filters: ActivityFilters) => void;
  clearFilters: () => void;
  loadMore: () => void;
  refresh: () => void;
}

export function useActivity(
  userId: string,
  initialActivities: ActivityWithApplication[] = [],
  initialTotal: number = 0,
): UseActivityResult {
  const [activities, setActivities] =
    useState<ActivityWithApplication[]>(initialActivities);
  const [total, setTotal] = useState(initialTotal);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<ActivityFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [activityTypeCounts, setActivityTypeCounts] = useState<
    Array<{ type: ActivityType; count: number }>
  >([]);

  const fetchActivities = useCallback(
    async (pageNum: number, reset = false) => {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const filtersToApply: ActivityFilters = {
          ...filters,
          ...(searchQuery && { search: searchQuery }),
        };

        const result = await getUserActivities(userId, {
          page: pageNum,
          limit: 20,
          filters: filtersToApply,
        });

        setActivities((prev) =>
          reset ? result.activities : [...prev, ...result.activities],
        );

        setTotal(result.total);
        setHasMore(result.hasMore);
        setPage(pageNum);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userId, filters, searchQuery],
  );

  const fetchActivityTypeCounts = useCallback(async () => {
    try {
      const counts = await getActivityTypeCounts(userId);
      setActivityTypeCounts(counts);
    } catch (error) {
      console.error("Failed to fetch activity type counts:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchActivities(1, true);
    fetchActivityTypeCounts();
  }, [fetchActivities, fetchActivityTypeCounts]);

  const handleFilterChange = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchActivities(1, true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    fetchActivities(1, true);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setPage(1);
    fetchActivities(1, true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchActivities(page + 1);
    }
  };

  const refresh = () => {
    fetchActivities(1, true);
  };

  return {
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
  };
}
