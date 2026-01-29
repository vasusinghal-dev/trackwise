-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'APPLIED', 'SCREENING', 'INTERVIEWING', 'TECHNICAL', 'FINAL_ROUND', 'OFFER', 'NEGOTIATING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'GHOSTED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');

-- CreateEnum
CREATE TYPE "Source" AS ENUM ('LINKEDIN', 'COMPANY_SITE', 'REFERRAL', 'EMAIL', 'COLD_APPLICATION', 'RECRUITER', 'JOB_BOARD', 'OTHER');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('APPLICATION_SUBMITTED', 'FOLLOW_UP_SENT', 'INTERVIEW_SCHEDULED', 'INTERVIEW_COMPLETED', 'OFFER_RECEIVED', 'OFFER_ACCEPTED', 'REJECTION_RECEIVED', 'STATUS_UPDATED', 'NOTE_ADDED', 'DOCUMENT_UPDATED', 'REMINDER_SET', 'SCREENING_COMPLETED', 'TECHNICAL_ASSESSMENT', 'DOCUMENT_UPLOADED', 'INTERVIEW_PREPARED', 'FOLLOW_UP_RECEIVED');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('FOLLOW_UP_EMAIL', 'FOLLOW_UP_CALL', 'INTERVIEW_PREP', 'INTERVIEW_ATTEND', 'THANK_YOU_EMAIL', 'APPLICATION_SUBMIT', 'DOCUMENT_SUBMIT', 'OFFER_DECISION', 'NETWORKING_REACH');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RESUME', 'COVER_LETTER', 'PORTFOLIO', 'ASSIGNMENT', 'TRANSCRIPT', 'CERTIFICATION', 'REFERENCE', 'OTHER');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('PHONE', 'VIDEO', 'ONSITE', 'ASSESSMENT', 'PANEL', 'COFFEE_CHAT');

-- CreateEnum
CREATE TYPE "InterviewOutcome" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyNormalized" TEXT,
    "role" TEXT NOT NULL,
    "jobPostingUrl" TEXT,
    "description" TEXT,
    "source" "Source",
    "location" TEXT,
    "workMode" "WorkMode" NOT NULL DEFAULT 'ONSITE',
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "currency" CHAR(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "stage" TEXT,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "appliedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3),
    "nextFollowUp" TIMESTAMP(3),
    "recruiterName" TEXT,
    "recruiterEmail" TEXT,
    "hiringManager" TEXT,
    "referralContact" TEXT,
    "notes" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminder" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ReminderType" NOT NULL DEFAULT 'FOLLOW_UP_EMAIL',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_document" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER,
    "fileType" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 1,
    "type" "InterviewType" NOT NULL,
    "stage" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "timezone" TEXT,
    "interviewerName" TEXT,
    "interviewerEmail" TEXT,
    "interviewerRole" TEXT,
    "meetingLink" TEXT,
    "meetingId" TEXT,
    "meetingPasscode" TEXT,
    "location" TEXT,
    "preparationNotes" TEXT,
    "interviewNotes" TEXT,
    "questionsAsked" TEXT,
    "questionsToAsk" TEXT,
    "outcome" "InterviewOutcome",
    "feedback" TEXT,
    "rating" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "application_userId_status_idx" ON "application"("userId", "status");

-- CreateIndex
CREATE INDEX "application_userId_isArchived_idx" ON "application"("userId", "isArchived");

-- CreateIndex
CREATE INDEX "application_appliedDate_idx" ON "application"("appliedDate");

-- CreateIndex
CREATE INDEX "application_company_idx" ON "application"("company");

-- CreateIndex
CREATE INDEX "application_statusUpdatedAt_idx" ON "application"("statusUpdatedAt");

-- CreateIndex
CREATE INDEX "application_userId_status_isArchived_idx" ON "application"("userId", "status", "isArchived");

-- CreateIndex
CREATE INDEX "activity_applicationId_idx" ON "activity"("applicationId");

-- CreateIndex
CREATE INDEX "activity_userId_idx" ON "activity"("userId");

-- CreateIndex
CREATE INDEX "activity_occurredAt_idx" ON "activity"("occurredAt");

-- CreateIndex
CREATE INDEX "activity_applicationId_occurredAt_idx" ON "activity"("applicationId", "occurredAt");

-- CreateIndex
CREATE INDEX "activity_applicationId_type_idx" ON "activity"("applicationId", "type");

-- CreateIndex
CREATE INDEX "reminder_applicationId_idx" ON "reminder"("applicationId");

-- CreateIndex
CREATE INDEX "reminder_userId_idx" ON "reminder"("userId");

-- CreateIndex
CREATE INDEX "reminder_dueDate_idx" ON "reminder"("dueDate");

-- CreateIndex
CREATE INDEX "reminder_isCompleted_idx" ON "reminder"("isCompleted");

-- CreateIndex
CREATE INDEX "reminder_type_idx" ON "reminder"("type");

-- CreateIndex
CREATE INDEX "reminder_userId_isCompleted_dueDate_idx" ON "reminder"("userId", "isCompleted", "dueDate");

-- CreateIndex
CREATE INDEX "reminder_userId_dueDate_isCompleted_idx" ON "reminder"("userId", "dueDate", "isCompleted");

-- CreateIndex
CREATE INDEX "application_document_applicationId_idx" ON "application_document"("applicationId");

-- CreateIndex
CREATE INDEX "application_document_userId_idx" ON "application_document"("userId");

-- CreateIndex
CREATE INDEX "application_document_type_idx" ON "application_document"("type");

-- CreateIndex
CREATE INDEX "application_document_applicationId_type_isCurrent_idx" ON "application_document"("applicationId", "type", "isCurrent");

-- CreateIndex
CREATE INDEX "interview_applicationId_idx" ON "interview"("applicationId");

-- CreateIndex
CREATE INDEX "interview_userId_idx" ON "interview"("userId");

-- CreateIndex
CREATE INDEX "interview_scheduledAt_idx" ON "interview"("scheduledAt");

-- CreateIndex
CREATE INDEX "interview_outcome_idx" ON "interview"("outcome");

-- CreateIndex
CREATE INDEX "interview_applicationId_round_idx" ON "interview"("applicationId", "round");

-- CreateIndex
CREATE INDEX "interview_userId_scheduledAt_isCompleted_idx" ON "interview"("userId", "scheduledAt", "isCompleted");

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminder" ADD CONSTRAINT "reminder_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminder" ADD CONSTRAINT "reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_document" ADD CONSTRAINT "application_document_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_document" ADD CONSTRAINT "application_document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview" ADD CONSTRAINT "interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview" ADD CONSTRAINT "interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
