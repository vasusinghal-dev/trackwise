// app/lib/actions/activity.actions.ts
"use server";

import { ActivityType, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import {
  ActivityFilters,
  ActivityWithApplication,
  PaginatedActivities,
} from "@/src/types/activity";

export async function getUserActivities(
  userId: string,
  options?: {
    page?: number;
    limit?: number;
    filters?: ActivityFilters;
  },
): Promise<PaginatedActivities> {
  try {
    const { page = 1, limit = 20, filters } = options ?? {};
    const skip = (page - 1) * limit;
    const where = buildActivityWhere(userId, filters);

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          application: {
            select: {
              id: true,
              company: true,
              role: true,
              status: true,
              companyNormalized: true,
            },
          },
        },
        orderBy: {
          occurredAt: "desc",
        },
        skip,
        take: limit + 1,
      }),
      prisma.activity.count({ where }),
    ]);

    const hasMore = activities.length > limit;
    const paginatedActivities = activities.slice(0, limit);

    return {
      activities: paginatedActivities as ActivityWithApplication[],
      total,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching user activities:", error);
    throw new Error("Failed to fetch activities");
  }
}

export async function getActivityTypeCounts(
  userId: string,
): Promise<Array<{ type: ActivityType; count: number }>> {
  try {
    const counts = await prisma.activity.groupBy({
      by: ["type"],
      where: { userId },
      _count: {
        type: true,
      },
      orderBy: {
        _count: {
          type: "desc",
        },
      },
    });

    return counts.map((item) => ({
      type: item.type,
      count: item._count.type,
    }));
  } catch (error) {
    console.error("Error fetching activity type counts:", error);
    throw new Error("Failed to fetch activity type counts");
  }
}

function buildActivityWhere(
  userId: string,
  filters?: ActivityFilters,
): Prisma.ActivityWhereInput {
  const where: Prisma.ActivityWhereInput = { userId };

  if (!filters) return where;

  const { type, dateRange, applicationId, search } = filters;

  if (type) where.type = type;
  if (applicationId) where.applicationId = applicationId;
  if (dateRange) {
    where.occurredAt = { gte: dateRange.from, lte: dateRange.to };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { application: { company: { contains: search, mode: "insensitive" } } },
      { application: { role: { contains: search, mode: "insensitive" } } },
    ];
  }

  return where;
}
