import { ApplicationStats } from "@/src/hooks/useDashboardData";
import { Application } from "@prisma/client";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle,
  DollarSign,
  Phone,
  XCircle,
} from "lucide-react";

export default function StatsOverview({
  stats,
  applications,
}: {
  stats: ApplicationStats;
  applications: Application[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Total Applications</p>
            <p className="text-2xl font-bold text-text-primary">
              {stats.total}
            </p>
          </div>
          <Briefcase className="w-8 h-8 text-primary/40" />
        </div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight className="w-4 h-4 text-success" />
          <span className="text-xs text-success font-medium">+12%</span>
          <span className="text-xs text-text-secondary ml-auto">
            vs last week
          </span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">In Interviews</p>
            <p className="text-2xl font-bold text-primary">
              {stats.interviewing}
            </p>
          </div>
          <Phone className="w-8 h-8 text-primary/40" />
        </div>
        <div className="text-xs text-text-secondary mt-2">
          {stats.upcomingInterviews} upcoming
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Offers</p>
            <p className="text-2xl font-bold text-success">{stats.offers}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-success/40" />
        </div>
        <div className="text-xs text-text-secondary mt-2">
          {stats.offerConversionRate}% interview-to-offer
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Rejection Rate</p>
            <p className="text-2xl font-bold text-error">
              {stats.rejectionRate}%
            </p>
          </div>
          <XCircle className="w-8 h-8 text-error/40" />
        </div>
        <div className="text-xs text-text-secondary mt-2">
          {stats.rejected} out of {stats.total}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Avg Expected Salary</p>
            <p className="text-2xl font-bold text-text-primary">
              ${(stats.avgSalary / 1000).toFixed(0)}k
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-text-secondary/40" />
        </div>
        <div className="text-xs text-text-secondary mt-2">
          Based on {applications.filter((a) => a.salaryMin).length} applications
        </div>
      </div>
    </div>
  );
}
