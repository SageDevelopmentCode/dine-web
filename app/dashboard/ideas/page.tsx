import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lightbulb, ThumbsUp, Clock, TrendingUp } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default async function IdeasPage() {
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
            <Lightbulb className="w-8 h-8" style={{ color: COLORS.EPIPEN_COLOR }} />
            <div>
              <h1 className="text-3xl font-bold font-merriweather" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
                Ideas Submitted
              </h1>
              <p className="mt-1 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                Innovative suggestions and feature requests from your community
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
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Total Ideas</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <Lightbulb className="w-8 h-8" style={{ color: COLORS.EPIPEN_COLOR }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>All submissions</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Under Review</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <Clock className="w-8 h-8" style={{ color: COLORS.MODERATE_BORDER }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Being evaluated</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Most Voted</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <ThumbsUp className="w-8 h-8" style={{ color: COLORS.FOOD_ALLERGIES_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Top votes</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Implemented</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <TrendingUp className="w-8 h-8" style={{ color: COLORS.SCHOOL_WORK_EVENTS_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Released features</p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="rounded-lg shadow-md p-12 border text-center" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${COLORS.EPIPEN_COLOR}20` }}>
              <Lightbulb className="w-10 h-10" style={{ color: COLORS.EPIPEN_COLOR }} />
            </div>
            <h2 className="text-2xl font-bold font-merriweather mb-4" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
              Idea Management Coming Soon
            </h2>
            <p className="font-lato mb-6" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
              This section will help you collect, organize, and prioritize feature ideas
              submitted by your community, turning user feedback into product improvements.
            </p>
            <div className="rounded-lg p-6 text-left" style={{ backgroundColor: COLORS.DASHBOARD_DARK_HOVER }}>
              <h3 className="font-semibold font-merriweather mb-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>Planned Features:</h3>
              <ul className="space-y-2 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>View detailed idea submissions with descriptions and use cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>Voting system to gauge community interest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>Status tracking (submitted, under review, planned, implemented)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>Categorize ideas by feature area or theme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>Comment and discuss with idea submitters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.EPIPEN_COLOR }} className="mt-1">•</span>
                  <span>Roadmap integration and release notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
