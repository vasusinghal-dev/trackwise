import { Archive, Download, Mail } from "lucide-react";

export default function ApplicationsFooter() {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          Need to bulk update? Use quick actions:
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-background transition-colors text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-background transition-colors text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Follow-ups
          </button>
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-background transition-colors text-sm flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archive Old
          </button>
        </div>
      </div>
    </div>
  );
}
