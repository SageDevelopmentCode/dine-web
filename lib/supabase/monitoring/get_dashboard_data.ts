import { createClient } from "@/lib/supabase/server";

export interface DashboardOverview {
  total_requests: number;
  avg_response_time: number;
  error_rate: number;
  total_errors: number;
  unique_endpoints: number;
}

export interface EndpointMetric {
  endpoint: string;
  request_count: number;
  avg_response_time: number;
  min_response_time: number;
  max_response_time: number;
  error_count: number;
  success_rate: number;
}

export interface RecentRequest {
  id: number;
  endpoint: string;
  method: string;
  status_code: number;
  response_time_ms: number;
  occurred_at: string;
}

export interface PerformanceTrend {
  time_bucket: string;
  avg_response_time: number;
  request_count: number;
  error_count: number;
}

export interface SlowQuery {
  query_name: string;
  avg_execution_time: number;
  max_execution_time: number;
  execution_count: number;
}

export interface RecentError {
  id: number;
  endpoint: string;
  error_message: string;
  error_type: string;
  status_code: number;
  occurred_at: string;
}

export interface DashboardData {
  overview: DashboardOverview | null;
  endpointMetrics: EndpointMetric[];
  recentRequests: RecentRequest[];
  performanceTrends: PerformanceTrend[];
  slowQueries: SlowQuery[];
  recentErrors: RecentError[];
}

export async function getDashboardData(
  timeRangeHours: number = 24
): Promise<DashboardData> {
  const supabase = await createClient();

  // Fetch overview stats
  const { data: overviewData, error: overviewError } = await supabase
    .schema('monitoring')
    .rpc(
      "get_dashboard_overview",
      { time_range_hours: timeRangeHours }
    );

  if (overviewError) {
    console.error("Error fetching overview:", overviewError);
  }

  // Fetch endpoint metrics
  const { data: endpointData, error: endpointError } = await supabase
    .schema('monitoring')
    .rpc(
      "get_endpoint_metrics",
      { time_range_hours: timeRangeHours }
    );

  if (endpointError) {
    console.error("Error fetching endpoint metrics:", endpointError);
  }

  // Fetch recent requests
  const { data: recentRequestsData, error: recentRequestsError } =
    await supabase.schema('monitoring').rpc("get_recent_requests", { limit_count: 50 });

  if (recentRequestsError) {
    console.error("Error fetching recent requests:", recentRequestsError);
  }

  // Fetch performance trends
  const { data: trendsData, error: trendsError } = await supabase
    .schema('monitoring')
    .rpc(
      "get_performance_trends",
      {
        time_range_hours: timeRangeHours,
        bucket_minutes: timeRangeHours <= 1 ? 1 : timeRangeHours <= 24 ? 5 : 60,
      }
    );

  if (trendsError) {
    console.error("Error fetching performance trends:", trendsError);
  }

  // Fetch slowest queries
  const { data: slowQueriesData, error: slowQueriesError } =
    await supabase.schema('monitoring').rpc("get_slowest_queries", {
      time_range_hours: timeRangeHours,
      limit_count: 20,
    });

  if (slowQueriesError) {
    console.error("Error fetching slow queries:", slowQueriesError);
  }

  // Fetch recent errors
  const { data: recentErrorsData, error: recentErrorsError } =
    await supabase.schema('monitoring').rpc("get_recent_errors", { limit_count: 50 });

  if (recentErrorsError) {
    console.error("Error fetching recent errors:", recentErrorsError);
  }

  return {
    overview: overviewData?.[0] || null,
    endpointMetrics: (endpointData as EndpointMetric[]) || [],
    recentRequests: (recentRequestsData as RecentRequest[]) || [],
    performanceTrends: (trendsData as PerformanceTrend[]) || [],
    slowQueries: (slowQueriesData as SlowQuery[]) || [],
    recentErrors: (recentErrorsData as RecentError[]) || [],
  };
}
