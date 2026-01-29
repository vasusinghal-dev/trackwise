import { z } from "zod";
import { ApplicationStatus, Priority, Source, WorkMode } from "@prisma/client";

const emptyToUndefined = (value: unknown) => {
  if (value == null) return undefined;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const optionalText = z.preprocess(emptyToUndefined, z.string().optional());

export const applicationFormSchema = z
  .object({
    // Basic Info
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    jobPostingUrl: z.preprocess(
      emptyToUndefined,
      z.url("Invalid URL").optional(),
    ),
    description: optionalText,
    source: z.preprocess(emptyToUndefined, z.enum(Source).optional()),

    // Location & Salary
    location: optionalText,
    workMode: z.preprocess(
      emptyToUndefined,
      z.enum(WorkMode).default("ONSITE"),
    ),
    salaryMin: z.preprocess(
      emptyToUndefined,
      z.coerce.number().int().positive("Must be positive").optional(),
    ),
    salaryMax: z.preprocess(
      emptyToUndefined,
      z.coerce.number().int().positive("Must be positive").optional(),
    ),
    currency: z
      .string()
      .length(3, "Must be 3 characters (ISO 4217)")
      .transform((v) => v.toUpperCase())
      .optional(),

    // Status
    status: z.preprocess(
      emptyToUndefined,
      z.enum(ApplicationStatus).default("APPLIED"),
    ),
    stage: optionalText,
    priority: z.enum(Priority).default("MEDIUM"),

    // Dates
    appliedDate: z.coerce.date().optional(),
    deadline: z.coerce.date().optional(),
    nextFollowUp: z.coerce.date().optional(),

    // Contacts
    recruiterName: optionalText,
    recruiterEmail: z.preprocess(
      emptyToUndefined,
      z.email("Invalid email").optional(),
    ),
    hiringManager: optionalText,
    referralContact: optionalText,

    // Notes
    notes: optionalText,
  })
  .refine(
    (data) =>
      data.salaryMin == null ||
      data.salaryMax == null ||
      data.salaryMin <= data.salaryMax,
    {
      message: "Minimum salary cannot exceed maximum salary",
      path: ["salaryMax"],
    },
  )
  .refine((d) => !d.salaryMax || d.salaryMin, {
    message: "Minimum salary required if maximum salary is set",
    path: ["salaryMin"],
  });

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
