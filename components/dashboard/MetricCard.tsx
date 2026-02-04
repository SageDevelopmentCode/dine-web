import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>

        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}

        {trend && (
          <div className="flex items-center gap-1">
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
