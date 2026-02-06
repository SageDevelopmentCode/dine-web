"use client";

import { useRouter } from "next/navigation";
import { LogOut, RefreshCw } from "lucide-react";
import { useState } from "react";
import { COLORS } from "@/constants/colors";

interface DashboardControlsProps {
  currentTimeRange: number;
}

export default function DashboardControls({
  currentTimeRange,
}: DashboardControlsProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTimeRangeChange = (hours: number) => {
    router.push(`/dashboard/performance?timeRange=${hours}`);
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
      <div className="flex items-center gap-2 rounded-lg p-1" style={{ backgroundColor: COLORS.DASHBOARD_DARK_HOVER }}>
        {[
          { label: "1h", value: 1 },
          { label: "24h", value: 24 },
          { label: "7d", value: 168 },
          { label: "30d", value: 720 },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => handleTimeRangeChange(option.value)}
            className="px-3 py-1 rounded text-sm font-medium font-lato transition-colors shadow-sm"
            style={
              currentTimeRange === option.value
                ? {
                    backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
                    color: COLORS.WHITE,
                  }
                : {
                    color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY,
                  }
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="p-2 rounded-lg transition-colors"
        style={{
          backgroundColor: COLORS.DASHBOARD_DARK_HOVER,
          color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY
        }}
        title="Refresh data"
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`w-5 h-5 ${
            isRefreshing ? "animate-spin" : ""
          }`}
        />
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-lato text-sm font-medium"
        style={{
          backgroundColor: COLORS.DASHBOARD_DARK_HOVER,
          color: COLORS.DASHBOARD_DARK_TEXT,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.SEVERE_BORDER;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.DASHBOARD_DARK_HOVER;
        }}
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}
