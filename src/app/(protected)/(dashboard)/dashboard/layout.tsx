import DashboardNavbar from "@/src/components/dashboard/dashboard-layout/DashboardNavbar";
import DashboardSidebar from "@/src/components/dashboard/dashboard-layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-text-primary relative">
      <DashboardNavbar />
      <DashboardSidebar />

      <div className="md:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
