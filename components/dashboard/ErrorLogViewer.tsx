"use client";

import { useState } from "react";
import { RecentError } from "@/lib/supabase/monitoring/get_dashboard_data";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface ErrorLogViewerProps {
  errors: RecentError[];
}

export default function ErrorLogViewer({ errors }: ErrorLogViewerProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Errors</h3>
        <span className="ml-auto px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
          {errors.length} errors
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {errors.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No errors recorded
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {errors.map((error) => (
              <div key={error.id} className="p-4 hover:bg-gray-50">
                <div
                  className="flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => toggleExpanded(error.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-xs font-medium text-red-600 bg-red-50">
                        {error.status_code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium text-gray-600 bg-gray-100">
                        {error.error_type}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-900 mb-1">
                      {error.endpoint}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {error.error_message}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(error.occurred_at)}
                    </span>
                    {expandedId === error.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedId === error.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Error Message:
                        </p>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono">
                          {error.error_message}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Endpoint:
                        </p>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono">
                          {error.endpoint}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Timestamp:
                        </p>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                          {new Date(error.occurred_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
