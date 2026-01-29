import NewApplicationForm from "@/src/components/applications/new/NewApplicationForm";
import { auth } from "@/src/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default async function NewApplicationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth?mode=signin&callbackUrl=/applications/new");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back navigation */}
      <div className="border-b border-border bg-surface/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/applications"
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Back to Applications
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-text-primary">
                New Application
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                Add New Application
              </h1>
              <p className="text-text-secondary mt-1">
                Fill in the details to track your job application. All fields
                marked with * are required.
              </p>
            </div>
          </div>

          {/* Quick Stats/Info */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-lg bg-success/10 border border-success/20">
              <span className="text-sm font-medium text-success">
                💡 Tip: Save as draft if you're still gathering information
              </span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">
                ⚡ All applications are automatically tracked with activity logs
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border bg-surface/50">
            <h2 className="text-lg font-semibold text-text-primary">
              Application Details
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Complete the form below. You can save as draft and come back
              later.
            </p>
          </div>

          <div className="p-6">
            <NewApplicationForm />
          </div>
        </div>

        {/* Help/FAQ Section */}
        <div className="mt-8 bg-surface rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            💡 Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">
                What's the difference between draft and submit?
              </h4>
              <p className="text-sm text-text-secondary">
                <strong>Draft:</strong> Application is saved privately for you
                to complete later.
                <br />
                <strong>Submit:</strong> Application is marked as "Applied" and
                added to your active applications.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">
                Why track job applications?
              </h4>
              <p className="text-sm text-text-secondary">
                Tracking helps you stay organized, follow up on time, and
                analyze your job search performance over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
