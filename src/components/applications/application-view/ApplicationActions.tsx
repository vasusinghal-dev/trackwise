// /src/components/application-view/ApplicationActions.tsx
"use client";

import { Application } from "@prisma/client";
import { Archive, Edit, MoreVertical, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationDeleteModal from "../delete/ApplicationDeleteModal";

interface ApplicationActionsProps {
  application: Application;
}

export default function ApplicationActions({
  application,
}: ApplicationActionsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/applications/${application.id}/edit`);
  };

  const handleArchive = async () => {
    console.log("Archive application:", application.id);
  };

  const handleDelete = async () => {
    setAppToDelete(application.id);
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setAppToDelete(null);
    router.back();
  };

  return (
    <>
      {appToDelete && (
        <ApplicationDeleteModal
          applicationId={appToDelete}
          setApplicationId={setAppToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      <div className="relative">
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-48 bg-background rounded-lg shadow-lg border border-border z-50">
              <button
                onClick={handleArchive}
                className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary/10 flex items-center gap-2 rounded-t-lg"
              >
                <Archive className="w-4 h-4" />
                Archive Application
              </button>
              <button className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-primary/10 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Application
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-3 text-left text-sm text-error hover:bg-error/10 flex items-center gap-2 rounded-b-lg"
              >
                <Trash2 className="w-4 h-4" />
                Delete Application
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
