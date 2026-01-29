"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { createApplication } from "@/src/lib/actions/application.actions";
import { statusConfig } from "@/src/lib/config/applications/statusConfig";
import { sourceConfig } from "@/src/lib/config/applications/sourceConfig";
import { workModeConfig } from "@/src/lib/config/applications/workModeConfig";
import { priorityConfig } from "@/src/lib/config/applications/priorityConfig";
import { useRouter } from "next/navigation";

export default function NewApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>,
    isDraft: boolean = false,
  ) => {
    e?.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData(formRef.current);

      if (isDraft) formData.set("status", "DRAFT");

      const result = await createApplication(formData);

      if (result?.error) {
        toast.error(result.error);

        // Handle field-specific errors
        if (result.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages[0]) {
              fieldErrors[field] = messages[0];
            }
          });
          setErrors(fieldErrors);
        }
      } else {
        toast.success(
          isDraft
            ? "Draft saved successfully!"
            : "Application created successfully!",
        );
        router.push(
          isDraft
            ? `/applications/${result.applicationId}/edit`
            : `/applications/${result.applicationId}`,
        );
      }
    } catch (error) {
      toast.error(
        isDraft ? "Failed to save draft" : "Failed to create application",
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mx-auto">
      {/* Basic Information Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-sm font-medium leading-none"
            >
              Company *
            </label>
            <input
              id="company"
              name="company"
              placeholder="Enter company name"
              required
              className={`flex h-10 w-full rounded-md border ${
                errors.company ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.company && (
              <p className="text-error text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium leading-none">
              Role/Position *
            </label>
            <input
              id="role"
              name="role"
              placeholder="Enter job title"
              required
              className={`flex h-10 w-full rounded-md border ${
                errors.role ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.role && (
              <p className="text-error text-sm mt-1">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="jobPostingUrl"
              className="text-sm font-medium leading-none"
            >
              Job Posting URL
            </label>
            <input
              id="jobPostingUrl"
              name="jobPostingUrl"
              type="url"
              placeholder="https://company.com/careers/job-id"
              className={`flex h-10 w-full rounded-md border ${
                errors.jobPostingUrl ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.jobPostingUrl && (
              <p className="text-error text-sm mt-1">{errors.jobPostingUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="source"
              className="text-sm font-medium leading-none"
            >
              Source
            </label>
            <select
              id="source"
              name="source"
              defaultValue=""
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select source</option>
              {Object.entries(sourceConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium leading-none"
          >
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Paste or describe the job details..."
            rows={4}
            className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* Location & Work Mode Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Location & Work Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium leading-none"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="City, State or Remote"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="workMode"
              className="text-sm font-medium leading-none"
            >
              Work Mode
            </label>
            <select
              id="workMode"
              name="workMode"
              defaultValue="ONSITE"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {Object.entries(workModeConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Salary Information Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Salary Information (Optional)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="salaryMin"
              className="text-sm font-medium leading-none"
            >
              Minimum Salary
            </label>
            <input
              id="salaryMin"
              name="salaryMin"
              type="number"
              placeholder="50000"
              className={`flex h-10 w-full rounded-md border ${
                errors.salaryMin ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.salaryMin && (
              <p className="text-error text-sm mt-1">{errors.salaryMin}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="salaryMax"
              className="text-sm font-medium leading-none"
            >
              Maximum Salary
            </label>
            <input
              id="salaryMax"
              name="salaryMax"
              type="number"
              placeholder="80000"
              className={`flex h-10 w-full rounded-md border ${
                errors.salaryMax ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.salaryMax && (
              <p className="text-error text-sm mt-1">{errors.salaryMax}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="currency"
              className="text-sm font-medium leading-none"
            >
              Currency
            </label>
            <input
              id="currency"
              name="currency"
              placeholder="USD, EUR, INR"
              maxLength={3}
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 uppercase disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Status & Dates Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Status & Timeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="status"
              className="text-sm font-medium leading-none"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="DRAFT"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="space-y-2">
            <label htmlFor="stage" className="text-sm font-medium leading-none">
              Current Stage
            </label>
            <input
              id="stage"
              name="stage"
              placeholder="Anything, Phone Screen, Technical Round"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-text-secondary mt-1">
              Optional: Specific stage within the status
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="text-sm font-medium leading-none"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="MEDIUM"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="appliedDate"
              className="text-sm font-medium leading-none"
            >
              Applied Date
            </label>
            <input
              id="appliedDate"
              name="appliedDate"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Contacts Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Contacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="recruiterName"
              className="text-sm font-medium leading-none"
            >
              Recruiter Name
            </label>
            <input
              id="recruiterName"
              name="recruiterName"
              placeholder="John Doe"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="recruiterEmail"
              className="text-sm font-medium leading-none"
            >
              Recruiter Email
            </label>
            <input
              id="recruiterEmail"
              name="recruiterEmail"
              type="email"
              placeholder="john@company.com"
              className={`flex h-10 w-full rounded-md border ${
                errors.recruiterEmail ? "border-error" : "border-border"
              } bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.recruiterEmail && (
              <p className="text-error text-sm mt-1">{errors.recruiterEmail}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hiringManager"
              className="text-sm font-medium leading-none"
            >
              Hiring Manager
            </label>
            <input
              id="hiringManager"
              name="hiringManager"
              placeholder="Jane Smith"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="referralContact"
              className="text-sm font-medium leading-none"
            >
              Referral Contact
            </label>
            <input
              id="referralContact"
              name="referralContact"
              placeholder="Contact who referred you"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Notes Card */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Notes</h2>
        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium leading-none">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any additional notes about this application..."
            rows={4}
            className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm mt-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => handleSubmit(undefined, true)}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-background hover:bg-surface hover:text-text-primary h-10 px-4 py-2"
        >
          Save as Draft
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary-hover h-10 px-4 py-2"
        >
          {isSubmitting ? "Creating..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
