import { Application, Interview } from "@prisma/client";
import {
  Archive,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  MapPin,
  MoreVertical,
  Plus,
} from "lucide-react";
import { WorkModeBadge } from "../../ui/WorkModeBadge";
import { SourceBadge } from "../../ui/SourceBadge";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import { StatusBadge } from "@/src/components/shared-ui/badges/StatusBadge";
import { PriorityBadge } from "@/src/components/shared-ui/badges/PriorityBadge";
import { useState } from "react";
import { getNextAction } from "@/src/lib/utils/applications/nextAction";

export default function ApplicationsTable({
  applications,
  search,
}: {
  applications: (Application & { interviews: Interview[] })[];
  search: string;
}) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-background/50 text-sm font-medium text-text-secondary">
        <div className="col-span-4">Company / Role</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Applied</div>
        <div className="col-span-2">Details</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {applications.map((app) => {
          const nextAction = getNextAction(app);

          return (
            <div
              key={app.id}
              className={
                "grid grid-cols-12 gap-4 p-4 hover:bg-background/50 transition-colors"
              }
            >
              {/* Company / Role */}
              <div className="col-span-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text-primary truncate">
                        {app.company}
                      </h3>
                      {app.jobPostingUrl && (
                        <a
                          href={app.jobPostingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-primary"
                          title="View job posting"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="text-sm truncate">{app.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <WorkModeBadge mode={app.workMode} />
                      {app.source && <SourceBadge source={app.source} />}
                    </div>
                    {nextAction && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <Clock className="w-3.5 h-3.5 text-text-secondary" />
                        <span className="text-text-secondary">
                          {nextAction.label}:{" "}
                        </span>
                        <span className="font-medium">
                          {formatRelativeDate(nextAction.date)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-2 col-span-2">
                <StatusBadge status={app.status} stage={app.stage} />
                <div className="mt-2">
                  <PriorityBadge priority={app.priority} />
                </div>
              </div>

              {/* Applied Date */}
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">
                    {formatDate(app.appliedDate)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-text-secondary">
                  Updated {formatRelativeDate(app.statusUpdatedAt)}
                </div>
              </div>

              {/* Details */}
              <div className="col-span-2">
                <div className="space-y-2">
                  {app.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                      <span className="text-sm truncate">{app.location}</span>
                    </div>
                  )}
                  {app.salaryMin && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-text-secondary" />
                      <span className="text-sm">
                        ${app.salaryMin / 1000}k - $
                        {app.salaryMax ? app.salaryMax / 1000 + "k" : "N/A"}
                      </span>
                    </div>
                  )}
                  {app.recruiterEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-text-secondary" />
                      <span
                        className="text-sm truncate"
                        title={app.recruiterEmail}
                      >
                        Contact
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <div className="relative">
                  <button
                    onClick={() =>
                      setSelectedApp(app.id === selectedApp ? null : app.id)
                    }
                    className="p-2 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {selectedApp === app.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-background rounded-lg shadow-lg border border-border z-10">
                      <button className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary flex items-center gap-2 rounded-t-lg">
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Application
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Add Document
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Interview
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-error hover:text-text-primary hover:bg-error flex items-center gap-2 rounded-b-lg">
                        <Archive className="w-4 h-4" />
                        Archive Application
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            {search.trim().length > 0
              ? "No matching applications"
              : "No applications yet"}
          </h3>
          <p className="text-text-secondary mb-6">
            {search.trim().length > 0
              ? "Try adjusting your search criteria"
              : "Start by adding your first application"}
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            Add Application
          </button>
        </div>
      )}

      {/* Footer */}
      {applications.length > 0 && (
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>
              Showing {applications.length} of {applications.length}{" "}
              applications
            </span>
            <div className="flex items-center gap-4">
              <button className="hover:text-text-primary transition-colors">
                Previous
              </button>
              <span className="text-text-primary font-medium">1</span>
              <button className="hover:text-text-primary transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
