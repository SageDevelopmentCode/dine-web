"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PerformanceTrend } from "@/lib/supabase/monitoring/get_dashboard_data";

interface PerformanceChartProps {
  data: PerformanceTrend[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  // Format data for recharts
  const chartData = data.map((item) => ({
    time: new Date(item.time_bucket).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    responseTime: Number(item.avg_response_time),
    requests: Number(item.request_count),
    errors: Number(item.error_count),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Trends
      </h3>

      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for this time period
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickMargin={10}
            />
            <YAxis
              yAxisId="left"
              stroke="#888888"
              fontSize={12}
              tickMargin={10}
              label={{
                value: "Response Time (ms)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888888"
              fontSize={12}
              tickMargin={10}
              label={{
                value: "Request Count",
                angle: 90,
                position: "insideRight",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="responseTime"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Avg Response Time (ms)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="requests"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Request Count"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Errors"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
