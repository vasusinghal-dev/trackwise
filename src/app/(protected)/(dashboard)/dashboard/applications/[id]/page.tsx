// /src/app/dashboard/applications/[id]/page.tsx
import { getApplicationById } from "@/src/lib/actions/application.actions";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/src/components/shared-ui/badges/StatusBadge";
import { PriorityBadge } from "@/src/components/shared-ui/badges/PriorityBadge";
import { WorkModeBadge } from "@/src/components/shared-ui/badges/WorkModeBadge";
import { SourceBadge } from "@/src/components/shared-ui/badges/SourceBadge";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import InterviewsList from "@/src/components/applications/application-view/InterviewsList";
import DocumentsList from "@/src/components/applications/application-view/DocumentsList";
import RemindersList from "@/src/components/applications/application-view/RemindersList";
import ApplicationActions from "@/src/components/applications/application-view/ApplicationActions";
import ActivityTimeline from "@/src/components/applications/application-view/ActivityTimeline";

const DATE = Date.now();

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary">
                      {application.role}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-medium text-text-primary">
                        {application.company}
                      </span>
                      {application.jobPostingUrl && (
                        <a
                          href={application.jobPostingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-hover transition-colors"
                          title="View job posting"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <StatusBadge
                    status={application.status}
                    stage={application.stage}
                  />
                  <PriorityBadge priority={application.priority} />
                  <WorkModeBadge mode={application.workMode} />
                  {application.source && (
                    <SourceBadge source={application.source} />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ApplicationActions application={application} />
              </div>
            </div>
          </div>

          {application.description && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Job Description
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary whitespace-pre-wrap">
                  {application.description}
                </p>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Details Card */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Key Details
              </h2>
              <div className="space-y-4">
                {application.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">Location</p>
                      <p className="text-text-primary">
                        {application.location}
                      </p>
                    </div>
                  </div>
                )}

                {(application.salaryMin || application.salaryMax) && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">
                        Salary Range
                      </p>
                      <p className="text-text-primary">
                        {application.salaryMin
                          ? `$${application.salaryMin.toLocaleString()}`
                          : "N/A"}
                        {application.salaryMax
                          ? ` - $${application.salaryMax.toLocaleString()}`
                          : ""}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-secondary">Applied Date</p>
                    <p className="text-text-primary">
                      {formatDate(application.appliedDate)}
                      <span className="text-text-secondary text-sm ml-2">
                        ({formatRelativeDate(application.appliedDate)})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-secondary">Last Updated</p>
                    <p className="text-text-primary">
                      {formatDate(application.statusUpdatedAt)}
                      <span className="text-text-secondary text-sm ml-2">
                        ({formatRelativeDate(application.statusUpdatedAt)})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts Card */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Contacts
              </h2>
              <div className="space-y-4">
                {application.recruiterName && (
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">Recruiter</p>
                      <p className="text-text-primary">
                        {application.recruiterName}
                      </p>
                    </div>
                  </div>
                )}

                {application.recruiterEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <a
                        href={`mailto:${application.recruiterEmail}`}
                        className="text-primary hover:text-primary-hover transition-colors"
                      >
                        {application.recruiterEmail}
                      </a>
                    </div>
                  </div>
                )}

                {application.referralContact && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">Phone</p>
                      <a
                        href={`tel:${application.referralContact}`}
                        className="text-primary hover:text-primary-hover transition-colors"
                      >
                        {application.referralContact}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {application.notes && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Notes
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary whitespace-pre-wrap">
                  {application.notes}
                </p>
              </div>
            </div>
          )}

          {/* Interviews Section */}
          <InterviewsList
            interviews={application.interviews}
            applicationId={application.id}
          />

          {/* Activity Timeline */}
          <ActivityTimeline activities={application.activities} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Documents Card */}
          <DocumentsList
            documents={application.documents}
            applicationId={application.id}
          />

          {/* Reminders Card */}
          <RemindersList
            reminders={application.reminders}
            applicationId={application.id}
          />

          {/* Quick Stats Card */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Application Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Days Active</span>
                <span className="font-medium text-text-primary">
                  {Math.ceil(
                    (DATE - new Date(application.appliedDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{" "}
                  days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Interviews</span>
                <span className="font-medium text-text-primary">
                  {application.interviews.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Activities</span>
                <span className="font-medium text-text-primary">
                  {application.activities.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Documents</span>
                <span className="font-medium text-text-primary">
                  {application.documents.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
