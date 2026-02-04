"use client";

import { useRouter } from "next/navigation";
import { LogOut, RefreshCw } from "lucide-react";
import { useState } from "react";

interface DashboardControlsProps {
  currentTimeRange: number;
}

export default function DashboardControls({
  currentTimeRange,
}: DashboardControlsProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTimeRangeChange = (hours: number) => {
    router.push(`/dashboard?timeRange=${hours}`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleLogout = async () => {
    await fetch("/api/dashboard/auth", {
      method: "DELETE",
    });
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Time Range Selector */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        {[
          { label: "1h", value: 1 },
          { label: "24h", value: 24 },
          { label: "7d", value: 168 },
          { label: "30d", value: 720 },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleTimeRangeChange(option.value)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentTimeRange === option.value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Refresh data"
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`w-5 h-5 text-gray-600 ${
            isRefreshing ? "animate-spin" : ""
          }`}
        />
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
