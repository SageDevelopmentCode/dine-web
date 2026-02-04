"use client";

import { RecentRequest } from "@/lib/supabase/monitoring/get_dashboard_data";
import { Activity } from "lucide-react";

interface RealtimeFeedProps {
  requests: RecentRequest[];
}

export default function RealtimeFeed({ requests }: RealtimeFeedProps) {
  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-600 bg-green-50";
    if (statusCode >= 300 && statusCode < 400) return "text-blue-600 bg-blue-50";
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-blue-600 bg-blue-50";
      case "POST":
        return "text-green-600 bg-green-50";
      case "PUT":
        return "text-yellow-600 bg-yellow-50";
      case "DELETE":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center gap-2">
        <Activity className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Requests
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No recent requests
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getMethodColor(
                          request.method
                        )}`}
                      >
                        {request.method}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                          request.status_code
                        )}`}
                      >
                        {request.status_code}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-900 truncate">
                      {request.endpoint}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-sm font-medium ${
                        request.response_time_ms > 1000
                          ? "text-red-600"
                          : request.response_time_ms > 500
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {request.response_time_ms}ms
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(request.occurred_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
