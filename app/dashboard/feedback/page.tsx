import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default async function FeedbackPage() {
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
            <MessageSquare className="w-8 h-8" style={{ color: COLORS.TRAVEL_BG }} />
            <div>
              <h1 className="text-3xl font-bold font-merriweather" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
                Feedback Submitted
              </h1>
              <p className="mt-1 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                General feedback and user opinions about your platform
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
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Total Feedback</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <MessageSquare className="w-8 h-8" style={{ color: COLORS.TRAVEL_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>All submissions</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Avg Rating</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0.0</p>
              </div>
              <Star className="w-8 h-8" style={{ color: COLORS.STAR_RATING }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Out of 5 stars</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Satisfaction</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0%</p>
              </div>
              <TrendingUp className="w-8 h-8" style={{ color: COLORS.FOOD_ALLERGIES_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Positive feedback</p>
          </div>

          <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Contributors</p>
                <p className="text-3xl font-bold font-merriweather mt-2" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>0</p>
              </div>
              <Users className="w-8 h-8" style={{ color: COLORS.SCHOOL_WORK_EVENTS_BG }} />
            </div>
            <p className="text-xs font-lato mt-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>Unique users</p>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="rounded-lg shadow-md p-12 border text-center" style={{ backgroundColor: COLORS.DASHBOARD_DARK_SURFACE, borderColor: COLORS.DASHBOARD_DARK_BORDER }}>
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${COLORS.TRAVEL_BG}20` }}>
              <MessageSquare className="w-10 h-10" style={{ color: COLORS.TRAVEL_BG }} />
            </div>
            <h2 className="text-2xl font-bold font-merriweather mb-4" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>
              Feedback System Coming Soon
            </h2>
            <p className="font-lato mb-6" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
              This section will help you collect, analyze, and act on user feedback,
              enabling continuous improvement based on real user experiences.
            </p>
            <div className="rounded-lg p-6 text-left" style={{ backgroundColor: COLORS.DASHBOARD_DARK_HOVER }}>
              <h3 className="font-semibold font-merriweather mb-3" style={{ color: COLORS.DASHBOARD_DARK_TEXT }}>Planned Features:</h3>
              <ul className="space-y-2 font-lato" style={{ color: COLORS.DASHBOARD_DARK_TEXT_SECONDARY }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>View detailed feedback with ratings and comments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>Sentiment analysis and categorization (positive, neutral, negative)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>Trend analysis over time to track satisfaction changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>Tag and categorize feedback by topic or feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>Response and follow-up tools for user engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.TRAVEL_BG }} className="mt-1">•</span>
                  <span>Export feedback data for reporting and analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
