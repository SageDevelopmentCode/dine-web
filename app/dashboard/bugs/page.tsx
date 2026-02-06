import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bug, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default async function BugsPage() {
  // Check authentication
  const cookieStore = await cookies();
  const dashboardAuth = cookieStore.get("dashboard_auth");
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardPassword || dashboardAuth?.value !== dashboardPassword) {
    redirect("/dashboard/login");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.DASHBOARD_DARK_BG }}>
      {/* Header */}
      <div className="border-b shadow-sm" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Bug className="w-8 h-8" style={{ color: COLORS.MILD_BORDER }} />
            <div>
              <h1 className="text-3xl font-bold font-merriweather" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
                Problems/Bugs Submitted
              </h1>
              <p className="mt-1 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                Track and resolve technical issues reported by users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Total Bugs</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <Bug className="w-8 h-8" style={{ color: COLORS.MILD_BORDER }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>All time</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Open Issues</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <Clock className="w-8 h-8" style={{ color: COLORS.MODERATE_BORDER }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Needs attention</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Resolved</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <CheckCircle className="w-8 h-8" style={{ color: COLORS.FOOD_ALLERGIES_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Fixed issues</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Critical</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <AlertTriangle className="w-8 h-8" style={{ color: COLORS.SEVERE_BORDER }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>High priority</p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="rounded-lg shadow-md p-12 border text-center" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${COLORS.MILD_BORDER}20` }}>
              <Bug className="w-10 h-10" style={{ color: COLORS.MILD_BORDER }} />
            </div>
            <h2 className="text-2xl font-bold font-merriweather mb-4" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
              Bug Tracking System Coming Soon
            </h2>
            <p className="font-lato mb-6" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
              This section will help you manage and resolve technical issues and bugs reported by users,
              ensuring a smooth and reliable user experience.
            </p>
            <div className="rounded-lg p-6 text-left" style={{ backgroundColor: COLORS.DASHBOARD_DARK_HOVER }}>
              <h3 className="font-semibold font-merriweather mb-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>Planned Features:</h3>
              <ul className="space-y-2 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>Detailed bug reports with reproduction steps and screenshots</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>Priority and severity classification system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>Status tracking (new, in progress, resolved, verified)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>Device and environment information for debugging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>Link bugs to specific features or code versions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.MILD_BORDER }} className="mt-1">•</span>
                  <span>User notification when bugs are resolved</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
