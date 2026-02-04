import { NextRequest, NextResponse } from "next/server";
import { getDashboardData } from "@/lib/supabase/monitoring/get_dashboard_data";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies();
  const dashboardAuth = cookieStore.get("dashboard_auth");
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardPassword) {
    return NextResponse.json(
      { error: "Dashboard password not configured" },
      { status: 500 }
    );
  }

  if (dashboardAuth?.value !== dashboardPassword) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid authentication" },
      { status: 401 }
    );
  }

  try {
    // Get time range from query params (default: 24 hours)
    const { searchParams } = new URL(request.url);
    const timeRange = parseInt(searchParams.get("timeRange") || "24", 10);

    // Fetch dashboard data
    const data = await getDashboardData(timeRange);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    );
  }
}
