import { formatDate } from "@/src/lib/utils/date";
import { ApplicationDocument } from "@prisma/client";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";

interface DocumentsListProps {
  documents: ApplicationDocument[];
  applicationId: string;
}

export default function DocumentsList({ documents }: DocumentsListProps) {
  const getDocumentIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-4 h-4" />;
    if (type.includes("image")) return <ImageIcon className="w-4 h-4" />;
    if (type.includes("word")) return <FileText className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Documents</h2>
        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>

      <div className="space-y-3">
        {documents.length > 0 ? (
          documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-background/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {getDocumentIcon(document.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary truncate">
                    {document.type}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    {/* <span>{formatFileSize(document.size)}</span> */}
                    <span>•</span>
                    <span>{formatDate(document.uploadedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 hover:bg-primary/10 rounded transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-text-secondary" />
                </button>
                <button
                  className="p-1.5 hover:bg-error/10 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-text-secondary hover:text-error" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-text-secondary" />
            </div>
            <p className="text-text-secondary mb-2">No documents uploaded</p>
            <p className="text-text-secondary text-sm">
              Add your resume, cover letter, or other documents
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
