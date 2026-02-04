"use client";

import { useState } from "react";
import { EndpointMetric } from "@/lib/supabase/monitoring/get_dashboard_data";
import { ArrowUpDown } from "lucide-react";

interface EndpointTableProps {
  data: EndpointMetric[];
}

type SortKey = keyof EndpointMetric;
type SortDirection = "asc" | "desc";

export default function EndpointTable({ data }: EndpointTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("request_count");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Endpoint Performance
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Breakdown of metrics by API endpoint
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("endpoint")}
              >
                <div className="flex items-center gap-2">
                  Endpoint
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("request_count")}
              >
                <div className="flex items-center gap-2">
                  Requests
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("avg_response_time")}
              >
                <div className="flex items-center gap-2">
                  Avg Time (ms)
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("min_response_time")}
              >
                <div className="flex items-center gap-2">
                  Min (ms)
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("max_response_time")}
              >
                <div className="flex items-center gap-2">
                  Max (ms)
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("error_count")}
              >
                <div className="flex items-center gap-2">
                  Errors
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("success_rate")}
              >
                <div className="flex items-center gap-2">
                  Success Rate
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No endpoint data available
                </td>
              </tr>
            ) : (
              sortedData.map((endpoint, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {endpoint.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {Number(endpoint.request_count).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {Number(endpoint.avg_response_time).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {endpoint.min_response_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {endpoint.max_response_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`${
                        endpoint.error_count > 0
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {Number(endpoint.error_count).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`${
                        Number(endpoint.success_rate) >= 99
                          ? "text-green-600"
                          : Number(endpoint.success_rate) >= 95
                          ? "text-yellow-600"
                          : "text-red-600"
                      } font-medium`}
                    >
                      {Number(endpoint.success_rate).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
