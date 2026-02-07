// /src/components/application-view/InterviewsList.tsx
import { Interview } from "@prisma/client";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  Mail,
  Award,
  FileText,
  Coffee,
  Star,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface InterviewsListProps {
  interviews: Interview[];
  applicationId: string;
}

export default function InterviewsList({
  interviews,
  applicationId,
}: InterviewsListProps) {
  // Function to get interview type display name
  const getInterviewTypeName = (type: Interview["type"]) => {
    switch (type) {
      case "PHONE":
        return "Phone Screen";
      case "VIDEO":
        return "Video Interview";
      case "ONSITE":
        return "On-site Interview";
      case "ASSESSMENT":
        return "Assessment";
      case "PANEL":
        return "Panel Interview";
      case "COFFEE_CHAT":
        return "Coffee Chat";
      default:
        return type;
    }
  };

  // Function to get interview type icon
  const getInterviewTypeIcon = (type: Interview["type"]) => {
    switch (type) {
      case "PHONE":
        return <Phone className="w-4 h-4" />;
      case "VIDEO":
        return <Video className="w-4 h-4" />;
      case "ONSITE":
        return <MapPin className="w-4 h-4" />;
      case "ASSESSMENT":
        return <FileText className="w-4 h-4" />;
      case "PANEL":
        return <User className="w-4 h-4" />;
      case "COFFEE_CHAT":
        return <Coffee className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  // Function to get outcome badge color
  const getOutcomeBadgeColor = (outcome: Interview["outcome"]) => {
    switch (outcome) {
      case "PASSED":
        return "bg-success/10 text-success border-success/20";
      case "FAILED":
        return "bg-error/10 text-error border-error/20";
      case "CANCELLED":
        return "bg-warning/10 text-warning border-warning/20";
      case "RESCHEDULED":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "NO_SHOW":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "PENDING":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-background text-text-secondary border-border";
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Interviews</h2>
        <Link
          href={`/dashboard/applications/${applicationId}/interviews/new`}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Schedule Interview
        </Link>
      </div>

      <div className="space-y-4">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-4 border border-border rounded-lg hover:bg-background/50 transition-colors"
            >
              {/* Interview Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      {getInterviewTypeIcon(interview.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text-primary">
                          {getInterviewTypeName(interview.type)}
                        </h3>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          Round {interview.round}
                        </span>
                        {interview.outcome && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full border ${getOutcomeBadgeColor(interview.outcome)}`}
                          >
                            {interview.outcome}
                          </span>
                        )}
                      </div>
                      {interview.stage && (
                        <p className="text-sm text-text-secondary mt-1">
                          {interview.stage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="text-right">
                  <div className="font-medium text-text-primary">
                    {formatDate(interview.scheduledAt)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatRelativeDate(interview.scheduledAt)}
                  </div>
                  {interview.timezone && (
                    <div className="text-xs text-text-secondary mt-1">
                      {interview.timezone}
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                {/* Interviewer Info */}
                {(interview.interviewerName ||
                  interview.interviewerEmail ||
                  interview.interviewerRole) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Interviewer</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      {interview.interviewerName && (
                        <p className="text-text-primary">
                          {interview.interviewerName}
                        </p>
                      )}
                      {interview.interviewerRole && (
                        <p className="text-text-secondary text-sm">
                          {interview.interviewerRole}
                        </p>
                      )}
                      {interview.interviewerEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-text-secondary" />
                          <a
                            href={`mailto:${interview.interviewerEmail}`}
                            className="text-primary hover:text-primary-hover text-sm"
                          >
                            {interview.interviewerEmail}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Logistics */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Logistics</span>
                  </div>
                  <div className="pl-6 space-y-2">
                    {interview.duration && (
                      <div className="flex items-center gap-2">
                        <span className="text-text-secondary">Duration:</span>
                        <span className="text-text-primary">
                          {interview.duration} minutes
                        </span>
                      </div>
                    )}

                    {interview.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-text-secondary" />
                        <span className="text-text-primary">
                          {interview.location}
                        </span>
                      </div>
                    )}

                    {interview.meetingLink && (
                      <div className="flex items-center gap-2">
                        <Video className="w-3 h-3 text-text-secondary" />
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-hover"
                        >
                          Meeting Link
                        </a>
                        {interview.meetingId && (
                          <span className="text-xs text-text-secondary">
                            (ID: {interview.meetingId})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes and Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                {/* Preparation Notes */}
                {interview.preparationNotes && (
                  <div>
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        Preparation Notes
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary bg-background p-3 rounded-lg">
                      {interview.preparationNotes}
                    </p>
                  </div>
                )}

                {/* Questions */}
                {(interview.questionsAsked || interview.questionsToAsk) && (
                  <div>
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium text-sm">Questions</span>
                    </div>
                    <div className="space-y-2">
                      {interview.questionsAsked && (
                        <div>
                          <span className="text-xs text-text-secondary">
                            Asked:
                          </span>
                          <p className="text-sm text-text-primary mt-1">
                            {interview.questionsAsked}
                          </p>
                        </div>
                      )}
                      {interview.questionsToAsk && (
                        <div>
                          <span className="text-xs text-text-secondary">
                            To Ask:
                          </span>
                          <p className="text-sm text-text-primary mt-1">
                            {interview.questionsToAsk}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Interview Notes & Feedback */}
              {(interview.interviewNotes ||
                interview.feedback ||
                interview.rating !== null) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">Feedback</span>
                    </div>
                    {interview.isCompleted && interview.completedAt && (
                      <span className="text-xs text-text-secondary">
                        Completed {formatDate(interview.completedAt)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {interview.rating !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-text-secondary text-sm">
                          Rating:
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < interview.rating!
                                  ? "text-warning fill-warning"
                                  : "text-border"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-text-primary">
                            {interview.rating}/5
                          </span>
                        </div>
                      </div>
                    )}

                    {interview.interviewNotes && (
                      <div>
                        <span className="text-xs text-text-secondary">
                          Notes:
                        </span>
                        <p className="text-sm text-text-primary mt-1">
                          {interview.interviewNotes}
                        </p>
                      </div>
                    )}

                    {interview.feedback && (
                      <div>
                        <span className="text-xs text-text-secondary">
                          Feedback:
                        </span>
                        <p className="text-sm text-text-primary mt-1">
                          {interview.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
                <Link
                  href={`/dashboard/applications/${applicationId}/interviews/${interview.id}/edit`}
                  className="text-sm text-primary hover:text-primary-hover"
                >
                  Edit Interview
                </Link>
                <span className="text-text-secondary">•</span>
                <Link
                  href={`/dashboard/applications/${applicationId}/interviews/${interview.id}`}
                  className="text-sm text-primary hover:text-primary-hover"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No interviews scheduled
            </h3>
            <p className="text-text-secondary mb-4 max-w-md mx-auto">
              Schedule interviews to track your progress and prepare effectively
              for each round.
            </p>
            <Link
              href={`/dashboard/applications/${applicationId}/interviews/new`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              <Calendar className="w-4 h-4" />
              Schedule First Interview
            </Link>
          </div>
        )}
      </div>

      {/* Statistics Footer */}
      {interviews.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {interviews.length}
              </div>
              <div className="text-sm text-text-secondary">
                Total Interviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {interviews.filter((i) => i.isCompleted).length}
              </div>
              <div className="text-sm text-text-secondary">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {interviews.filter((i) => i.outcome === "PASSED").length}
              </div>
              <div className="text-sm text-text-secondary">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {interviews.filter((i) => i.outcome === "PENDING").length}
              </div>
              <div className="text-sm text-text-secondary">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
