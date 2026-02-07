"use client";

import { deleteApplication } from "@/src/lib/actions/application.actions";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ApplicationDeleteModalProps = {
  applicationId: string;
  setApplicationId: (value: string | null) => void;
  onDeleteSuccess?: (deletedId: string) => void;
};

export default function ApplicationDeleteModal({
  applicationId,
  setApplicationId,
  onDeleteSuccess,
}: ApplicationDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string | null) => {
    if (!id) {
      throw new Error("Application ID is not valid.");
    }
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deleteApplication(id);

      if (result.success) {
        toast.success("Application deleted successfully");
        onDeleteSuccess?.(id);
        setApplicationId(null);
      } else {
        toast.error(result.error || "Failed to delete application");
        setDeleteError(
          (result.error as string) || "Failed to delete application",
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-md w-full p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
            <Trash className="w-5 h-5 text-error" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              Delete Application
            </h3>
            <p className="text-sm text-text-secondary">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-background border border-border rounded-lg">
          <p className="text-sm text-text-primary mb-2">
            Are you sure you want to delete this application?
          </p>
          <div className="text-sm text-text-secondary">
            This will permanently delete all associated data including
            interviews, notes, and documents.
          </div>
        </div>

        {deleteError && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{deleteError}</p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              setApplicationId(null);
              setDeleteError(null);
            }}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary/50 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(applicationId)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium bg-error text-white rounded-lg hover:bg-error-hover transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="w-4 h-4" />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
