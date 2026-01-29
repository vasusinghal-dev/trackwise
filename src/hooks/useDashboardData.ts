import { useEffect, useState, useMemo } from "react";
import {
  getApplications,
  getApplicationStats,
} from "@/src/lib/actions/application.actions";

import {
  getUpcomingItems,
  UpcomingItem,
} from "../lib/utils/dashboard/upcoming";
import {
  getPipelineData,
  getStaleApplications,
  PipelineData,
} from "../lib/utils/dashboard/pipeline";
import { Activity, Application, Interview, Reminder } from "@prisma/client";

export type ApplicationStats = {
  total: number;
  interviewing: number;
  offers: number;
  rejected: number;
  interviewConversionRate: number;
  offerConversionRate: number;
  rejectionRate: number;
  avgSalary: number;
  activeReminders: number;
  upcomingInterviews: number;
};

export type DashboardData = {
  applications: (Application & {
    interviews: Interview[];
    reminders: Reminder[];
    activities: Activity[];
  })[];
  stats: ApplicationStats | undefined;
  upcomingItems: UpcomingItem[];
  pipeline: PipelineData;
  staleApplications: Application[];
};

export function useDashboardData(
  activeTab: "today" | "upcoming",
): DashboardData {
  const [applications, setApplications] = useState<
    (Application & {
      interviews: Interview[];
      reminders: Reminder[];
      activities: Activity[];
    })[]
  >([]);

  const [stats, setStats] = useState<ApplicationStats>();

  useEffect(() => {
    getApplications().then(setApplications);
    getApplicationStats().then(setStats);
  }, []);

  const upcomingItems = useMemo(() => {
    const items = getUpcomingItems(applications);
    return activeTab === "today"
      ? items.filter((i) => i.isToday)
      : items.filter((i) => !i.isToday);
  }, [applications, activeTab]);

  return {
    applications,
    stats,
    upcomingItems,
    pipeline: getPipelineData(applications),
    staleApplications: getStaleApplications(applications),
  };
}
