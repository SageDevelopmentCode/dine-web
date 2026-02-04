import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardData } from "@/lib/supabase/monitoring/get_dashboard_data";
import MetricCard from "@/components/dashboard/MetricCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import EndpointTable from "@/components/dashboard/EndpointTable";
import RealtimeFeed from "@/components/dashboard/RealtimeFeed";
import ErrorLogViewer from "@/components/dashboard/ErrorLogViewer";
import {
  Activity,
  Clock,
  AlertCircle,
  TrendingUp,
  Link as LinkIcon,
} from "lucide-react";
import DashboardControls from "@/components/dashboard/DashboardControls";

interface DashboardPageProps {
  searchParams: Promise<{ timeRange?: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  // Check authentication
  const cookieStore = await cookies();
  const dashboardAuth = cookieStore.get("dashboard_auth");
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardPassword || dashboardAuth?.value !== dashboardPassword) {
    redirect("/dashboard/login");
  }

  // Get time range from query params (default: 24 hours)
  const params = await searchParams;
  const timeRange = parseInt(params.timeRange || "24", 10);

  // Fetch dashboard data
  const data = await getDashboardData(timeRange);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Performance Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time monitoring and analytics for API performance
              </p>
            </div>
            <DashboardControls currentTimeRange={timeRange} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Requests"
            value={data.overview?.total_requests?.toLocaleString() || "0"}
            icon={Activity}
            subtitle={`Last ${timeRange} hours`}
          />
          <MetricCard
            title="Avg Response Time"
            value={`${data.overview?.avg_response_time?.toFixed(0) || "0"}ms`}
            icon={Clock}
            subtitle="Average across all endpoints"
          />
          <MetricCard
            title="Error Rate"
            value={`${data.overview?.error_rate?.toFixed(2) || "0"}%`}
            icon={AlertCircle}
            subtitle={`${data.overview?.total_errors || 0} total errors`}
          />
          <MetricCard
            title="Active Endpoints"
            value={data.overview?.unique_endpoints || 0}
            icon={LinkIcon}
            subtitle="Unique API routes"
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart data={data.performanceTrends} />
        </div>

        {/* Endpoint Table */}
        <div className="mb-8">
          <EndpointTable data={data.endpointMetrics} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests Feed */}
          <RealtimeFeed requests={data.recentRequests} />

          {/* Error Log Viewer */}
          <ErrorLogViewer errors={data.recentErrors} />
        </div>
      </div>
    </div>
  );
}
