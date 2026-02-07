"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  BriefcaseIcon,
  Building,
  Target,
  Link,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Mail,
  Users,
  ChevronRight,
} from "lucide-react";
import { createApplication } from "@/src/lib/actions/application.actions";
import { statusConfig } from "@/src/lib/config/applications/statusConfig";
import { sourceConfig } from "@/src/lib/config/applications/sourceConfig";
import { workModeConfig } from "@/src/lib/config/applications/workModeConfig";
import { priorityConfig } from "@/src/lib/config/applications/priorityConfig";
import { toast } from "sonner";

interface AddApplicationScreenProps {
  onCreate: () => void;
}

export default function AddApplicationScreen({
  onCreate,
}: AddApplicationScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-header",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      );

      gsap.fromTo(
        ".form-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData(formRef.current);

      // Set default applied date if not provided
      if (!formData.get("appliedDate")) {
        formData.set("appliedDate", new Date().toISOString().split("T")[0]);
      }

      const result = await createApplication(formData);

      if (result?.error) {
        toast.error(result.error);
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
        toast.success("Application created successfully!");
        onCreate();
      }
    } catch (error) {
      toast.error("Failed to create application");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formRef.current) return;

    try {
      const formData = new FormData(formRef.current);
      formData.set("status", "DRAFT");

      const result = await createApplication(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Draft saved successfully!");
        onCreate();
      }
    } catch (error) {
      toast.error("Failed to save draft");
      console.error(error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-background"
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8 section-header">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
            <BriefcaseIcon className="w-10 h-10 text-primary relative z-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Add Your First Application
          </h2>
          <p className="text-text-secondary text-lg">
            Complete all details for comprehensive tracking
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border overflow-hidden form-card">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="divide-y divide-border"
          >
            {/* Basic Information Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <Building className="w-4 h-4 mr-2" />
                    Company *
                  </label>
                  <input
                    name="company"
                    placeholder="Google, Microsoft, Apple..."
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.company ? "border-error" : "border-border"
                    } bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition`}
                  />
                  {errors.company && (
                    <p className="text-error text-sm mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <Target className="w-4 h-4 mr-2" />
                    Role/Position *
                  </label>
                  <input
                    name="role"
                    placeholder="Software Engineer, Product Manager..."
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.role ? "border-error" : "border-border"
                    } bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition`}
                  />
                  {errors.role && (
                    <p className="text-error text-sm mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.role}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <Link className="w-4 h-4 mr-2" />
                    Job Posting URL
                  </label>
                  <input
                    name="jobPostingUrl"
                    type="url"
                    placeholder="https://company.com/careers/job-id"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Source
                  </label>
                  <select
                    name="source"
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
                  >
                    <option value="">Where did you find this job?</option>
                    {Object.entries(sourceConfig).map(([value, config]) => (
                      <option key={value} value={value}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Job Description
                </label>
                <textarea
                  name="description"
                  placeholder="Paste or describe the job details, requirements, and responsibilities..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Location & Work Details Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Location & Work Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </label>
                  <input
                    name="location"
                    placeholder="San Francisco, CA or Remote"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Work Mode
                  </label>
                  <select
                    name="workMode"
                    defaultValue="ONSITE"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
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

            {/* Salary Information Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mr-4">
                  <DollarSign className="w-5 h-5 text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Salary Information
                </h3>
                <span className="ml-3 text-sm text-text-secondary bg-surface px-3 py-1 rounded-full">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Minimum Salary
                  </label>
                  <input
                    name="salaryMin"
                    type="number"
                    placeholder="80000"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.salaryMin ? "border-error" : "border-border"
                    } bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Maximum Salary
                  </label>
                  <input
                    name="salaryMax"
                    type="number"
                    placeholder="120000"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.salaryMax ? "border-error" : "border-border"
                    } bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Currency
                  </label>
                  <input
                    name="currency"
                    placeholder="USD"
                    maxLength={3}
                    defaultValue="USD"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition uppercase text-center"
                  />
                </div>
              </div>
            </div>

            {/* Status & Timeline Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Status & Timeline
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue="APPLIED"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
                  >
                    {Object.entries(statusConfig).map(([value, config]) => {
                      if (value === "DRAFT") return null;
                      return (
                        <option key={value} value={value}>
                          {config.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Current Stage
                  </label>
                  <input
                    name="stage"
                    placeholder="Phone Screen, Technical Interview..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Optional: Specific stage within status
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Priority
                  </label>
                  <select
                    name="priority"
                    defaultValue="MEDIUM"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none cursor-pointer"
                  >
                    {Object.entries(priorityConfig).map(([value, config]) => (
                      <option key={value} value={value}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Applied Date
                  </label>
                  <input
                    name="appliedDate"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Contacts Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-error" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Contacts
                </h3>
                <span className="ml-3 text-sm text-text-secondary bg-surface px-3 py-1 rounded-full">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <User className="w-4 h-4 mr-2" />
                    Recruiter Name
                  </label>
                  <input
                    name="recruiterName"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-text-primary">
                    <Mail className="w-4 h-4 mr-2" />
                    Recruiter Email
                  </label>
                  <input
                    name="recruiterEmail"
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Hiring Manager
                  </label>
                  <input
                    name="hiringManager"
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Referral Contact
                  </label>
                  <input
                    name="referralContact"
                    placeholder="Contact who referred you"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Additional Notes
              </h3>
              <div className="space-y-2">
                <textarea
                  name="notes"
                  placeholder="Any additional notes, thoughts, or follow-up actions for this application..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-secondary/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-6 md:p-8 bg-surface/30 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 rounded-xl border-2 border-border bg-background text-text-primary font-semibold hover:bg-surface/80 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Save as Draft
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Application...
                    </>
                  ) : (
                    <>
                      Create Application
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-text-secondary text-sm mt-4">
                All required fields are marked with *
              </p>
            </div>
          </form>
        </div>

        {/* Progress Indicator & Navigation */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-black/40 rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-black/40 rounded-full"></div>
          </div>

          <p className="text-text-secondary text-center">
            Step 2 of 3 • Add your first application
          </p>
        </div>
      </div>
    </div>
  );
}
