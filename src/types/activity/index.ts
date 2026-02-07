import { ActivityType, Prisma } from "@prisma/client";

export type ActivityWithApplication = Prisma.ActivityGetPayload<{
  include: {
    application: {
      select: {
        id: true;
        company: true;
        role: true;
        status: true;
        companyNormalized: true;
      };
    };
  };
}>;

export interface ActivityFilters {
  type?: ActivityType;
  dateRange?: {
    from: Date;
    to: Date;
  };
  applicationId?: string;
  search?: string;
}

export interface PaginatedActivities {
  activities: ActivityWithApplication[];
  total: number;
  hasMore: boolean;
}

export interface ActivityStats {
  totalActivities: number;
  activitiesByType: Record<ActivityType, number>;
  recentActivityCount: number; // Last 7 days
  activitiesByDate: Array<{
    date: string;
    count: number;
  }>;
}
