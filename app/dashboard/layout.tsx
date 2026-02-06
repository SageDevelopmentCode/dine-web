import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { COLORS } from "@/constants/colors";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.DASHBOARD_DARK_BG }}>
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
