// app/dashboard/applications/[id]/edit/EditApplicationForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Briefcase, Building } from "lucide-react";
import { toast } from "sonner";
import { Application } from "@prisma/client";
import { updateApplication } from "@/src/lib/actions/application.actions";
import { sourceConfig } from "@/src/lib/config/applications/sourceConfig";
import { workModeConfig } from "@/src/lib/config/applications/workModeConfig";
import { statusConfig } from "@/src/lib/config/applications/statusConfig";
import { priorityConfig } from "@/src/lib/config/applications/priorityConfig";

interface EditApplicationFormProps {
  application: Application;
}

export default function EditApplicationForm({
  application,
}: EditApplicationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const formatDateTimeForInput = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateApplication(application.id, formData);

      if (result.success) {
        toast.success("Application updated successfully!");
        router.push(`/dashboard/applications/${application.id}`);
      } else {
        toast.error(result.error || "Failed to update application");
        console.log(result.fieldErrors);
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company *
            </label>
            <input
              type="text"
              name="company"
              required
              defaultValue={application.company}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter company name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Role *
            </label>
            <input
              type="text"
              name="role"
              required
              defaultValue={application.role}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter job title"
            />
          </div>

          {/* Job Posting URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Job Posting URL
            </label>
            <input
              type="url"
              name="jobPostingUrl"
              defaultValue={application.jobPostingUrl || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/job-posting"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={application.description || ""}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Add a brief description of the role..."
            />
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Building className="w-5 h-5" />
          Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Source
            </label>
            <select
              name="source"
              defaultValue={application.source || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select source</option>
              {Object.entries(sourceConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={application.location || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., New York, NY"
            />
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Work Mode *
            </label>
            <select
              name="workMode"
              required
              defaultValue={application.workMode}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {Object.entries(workModeConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text-primary">
              Salary Range
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  name="salaryMin"
                  defaultValue={application.salaryMin || ""}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Min"
                />
              </div>
              <span className="text-text-secondary">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  name="salaryMax"
                  defaultValue={application.salaryMax || ""}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Max"
                />
              </div>
              <div className="w-24">
                <select
                  name="currency"
                  defaultValue={application.currency || "USD"}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status & Timeline Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">
          Status & Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status *
            </label>
            <select
              name="status"
              required
              defaultValue={application.status}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {Object.entries(statusConfig).map(([value, config]) => {
                if (value === "DRAFT") return;
                return (
                  <option key={value} value={value}>
                    {config.label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Stage
            </label>
            <input
              type="text"
              name="stage"
              defaultValue={application.stage || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Technical Interview"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Priority *
            </label>
            <select
              name="priority"
              required
              defaultValue={application.priority}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Applied Date
            </label>
            <input
              type="date"
              name="appliedDate"
              defaultValue={formatDateForInput(application.appliedDate)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              defaultValue={formatDateForInput(application.deadline)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Next Follow-up */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Next Follow-up
            </label>
            <input
              type="datetime-local"
              name="nextFollowUp"
              defaultValue={formatDateTimeForInput(application.nextFollowUp)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recruiter Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Recruiter Name
            </label>
            <input
              type="text"
              name="recruiterName"
              defaultValue={application.recruiterName || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Recruiter's name"
            />
          </div>

          {/* Recruiter Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Recruiter Email
            </label>
            <input
              type="email"
              name="recruiterEmail"
              defaultValue={application.recruiterEmail || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="recruiter@company.com"
            />
          </div>

          {/* Hiring Manager */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Hiring Manager
            </label>
            <input
              type="text"
              name="hiringManager"
              defaultValue={application.hiringManager || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Hiring manager's name"
            />
          </div>

          {/* Referral Contact */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Referral Contact
            </label>
            <input
              type="text"
              name="referralContact"
              defaultValue={application.referralContact || ""}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Referral contact name"
            />
          </div>
        </div>
      </div>

      {/* Notes Card */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">
          Additional Notes
        </h2>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            defaultValue={application.notes || ""}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Add any additional notes, interview questions, or observations..."
          />
        </div>

        {/* Archive Option */}
        <div className="mt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isArchived"
              defaultChecked={application.isArchived || false}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-text-primary">
              Archive this application
            </span>
          </label>
          <p className="text-sm text-text-secondary mt-1 ml-7">
            Archived applications are hidden from the main view but can be
            accessed through the archive section.
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="sticky bottom-6 bg-surface border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
