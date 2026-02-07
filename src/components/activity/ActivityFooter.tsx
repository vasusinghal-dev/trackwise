import { Download, ExternalLink } from "lucide-react";

type ActivityFooterProps = {
  shown: number;
  total: number;
};

export default function ActivityFooter({ shown, total }: ActivityFooterProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span>
              Showing {shown} of {total} activities
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover:text-text-primary transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 hover:text-text-primary transition-colors">
            <ExternalLink className="h-4 w-4" />
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
