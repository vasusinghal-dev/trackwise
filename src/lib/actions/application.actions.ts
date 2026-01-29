// src/app/actions/application.actions.ts
"use server";

import { auth } from "@/src/lib/auth/auth";
import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { applicationFormSchema } from "../validations/application";
import z from "zod";

export async function getApplications() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.application.findMany({
    where: {
      userId: session.user.id,
      isArchived: false,
    },
    orderBy: {
      appliedDate: "desc",
    },
    include: {
      interviews: true,
      reminders: {
        where: { isCompleted: false },
      },
      activities: true,
      documents: true,
    },
  });
}

export async function getApplicationById(applicationId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.application.findFirst({
    where: {
      id: applicationId,
      userId: session.user.id,
    },
    include: {
      activities: {
        orderBy: { occurredAt: "desc" },
      },
      interviews: {
        orderBy: { round: "asc" },
      },
      reminders: {
        orderBy: { dueDate: "asc" },
      },
      documents: {
        where: { isCurrent: true },
      },
    },
  });
}

export async function getApplicationStats() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const [
    total,
    interviewing,
    offers,
    rejected,
    salaryAgg,
    activeReminders,
    upcomingInterviews,
  ] = await Promise.all([
    prisma.application.count({ where: { userId } }),

    prisma.application.count({
      where: { userId, status: "INTERVIEWING" },
    }),

    prisma.application.count({
      where: { userId, status: "OFFER" },
    }),

    prisma.application.count({
      where: { userId, status: "REJECTED" },
    }),

    prisma.application.aggregate({
      where: { userId, salaryMin: { not: null } },
      _avg: { salaryMin: true },
    }),

    prisma.reminder.count({
      where: {
        userId,
        isCompleted: false,
      },
    }),

    prisma.interview.count({
      where: {
        userId,
        isCompleted: false,
      },
    }),
  ]);

  const interviewConversionRate =
    total > 0 ? Math.round((interviewing / total) * 100) : 0;

  const offerConversionRate =
    interviewing > 0 ? Math.round((offers / interviewing) * 100) : 0;

  const rejectionRate = total > 0 ? Math.round((rejected / total) * 100) : 0;

  return {
    total,
    interviewing,
    offers,
    rejected,
    interviewConversionRate,
    offerConversionRate,
    rejectionRate,
    avgSalary: Math.round(salaryAgg._avg.salaryMin ?? 0),
    activeReminders,
    upcomingInterviews,
  };
}

export async function createApplication(formData: FormData) {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to create an application",
      };
    }

    // 2. Parse and validate form data
    const rawData = {
      company: formData.get("company"),
      role: formData.get("role"),
      jobPostingUrl: formData.get("jobPostingUrl"),
      description: formData.get("description"),
      source: formData.get("source"),
      location: formData.get("location"),
      workMode: formData.get("workMode"),
      salaryMin: formData.get("salaryMin"),
      salaryMax: formData.get("salaryMax"),
      currency: formData.get("currency"),
      status: formData.get("status"),
      stage: formData.get("stage"),
      priority: formData.get("priority"),
      appliedDate: formData.get("appliedDate"),
      deadline: formData.get("deadline"),
      nextFollowUp: formData.get("nextFollowUp"),
      recruiterName: formData.get("recruiterName"),
      recruiterEmail: formData.get("recruiterEmail"),
      hiringManager: formData.get("hiringManager"),
      referralContact: formData.get("referralContact"),
      notes: formData.get("notes"),
    };

    // 3. Validate data
    const validatedData = applicationFormSchema.parse(rawData);

    // 4. Create normalized company name (for search/comparisons)
    const companyNormalized = validatedData.company
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[^\w\s-]/g, "");

    // 5. Create application in database
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        company: validatedData.company,
        companyNormalized,
        role: validatedData.role,
        jobPostingUrl: validatedData.jobPostingUrl || undefined,
        description: validatedData.description || undefined,
        source: validatedData.source || undefined,
        location: validatedData.location || undefined,
        workMode: validatedData.workMode,
        salaryMin: validatedData.salaryMin || undefined,
        salaryMax: validatedData.salaryMax || undefined,
        currency: validatedData.currency || undefined,
        status: validatedData.status,
        stage: validatedData.stage || undefined,
        priority: validatedData.priority,
        appliedDate: validatedData.appliedDate || new Date(),
        statusUpdatedAt: new Date(), // Set to now for initial status
        deadline: validatedData.deadline || undefined,
        nextFollowUp: validatedData.nextFollowUp || undefined,
        recruiterName: validatedData.recruiterName || undefined,
        recruiterEmail: validatedData.recruiterEmail || undefined,
        hiringManager: validatedData.hiringManager || undefined,
        referralContact: validatedData.referralContact || undefined,
        notes: validatedData.notes || undefined,
      },
    });

    // 6. Create initial activity entry
    if (application.status !== "DRAFT") {
      await prisma.activity.create({
        data: {
          applicationId: application.id,
          userId: session.user.id,
          type: "APPLICATION_SUBMITTED",
          title: "Application Submitted",
          description: `Applied for ${application.role} at ${application.company}`,
          occurredAt: application.appliedDate,
        },
      });
    } else {
      await prisma.activity.create({
        data: {
          applicationId: application.id,
          userId: session.user.id,
          type: "STATUS_UPDATED",
          title: "Draft Created",
          description: `Started application for ${application.role} at ${application.company}`,
        },
      });
    }

    // 7. Revalidate and redirect
    revalidatePath("/applications");
    revalidatePath(`/applications/${application.id}`);

    return {
      success: true,
      applicationId: application.id,
      error: false,
    };
  } catch (error) {
    console.error("Error creating application:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: z.flattenError(error).fieldErrors,
      };
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || "Failed to create application",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

// export async function updateApplication(id: string, formData: FormData) {
//   // Similar structure for update (to be implemented later)
// }

// export async function deleteApplication(id: string) {
//   // To be implemented later
// }
