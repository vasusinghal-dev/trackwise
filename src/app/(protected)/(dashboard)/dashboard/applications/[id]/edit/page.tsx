import { getApplicationById } from "@/src/lib/actions/application.actions";
import { BackButton } from "@/src/components/applications/application-edit/BackButton";
import EditApplicationForm from "@/src/components/applications/application-edit/EditApplicationForm";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await getApplicationById(id);

  if (!application) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Application not found
          </h1>
          <p className="text-text-secondary mb-4">
            The application you&apos;re trying to edit doesn&apos;t exist or you
            don&apos;t have permission to access it.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton />
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Edit Application
                </h1>
                <p className="text-text-secondary">
                  Update details for {application.role} at {application.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EditApplicationForm application={application} />
      </div>
    </div>
  );
}
