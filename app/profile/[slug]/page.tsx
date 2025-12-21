import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import { User } from "lucide-react";
import { Twemoji } from "@/utils/twemoji";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="px-6 py-8 md:px-12">
        <div className="flex gap-8">
          {/* Left Section */}
          <div className="flex flex-col items-start w-1/4">
            {/* Profile Circle */}
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User size={64} className="text-gray-400" />
            </div>
            {/* Name */}
            <h2
              className="text-xl font-merriweather font-bold mb-1"
              style={{ color: COLORS.BLACK }}
            >
              John Smith
            </h2>
            {/* Last Updated */}
            <p
              className="text-xs font-merriweather"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Last updated: 3 days ago
            </p>

            {/* About Me Section */}
            <div
              className="w-full mt-4 p-4 rounded-lg"
              style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
            >
              {/* About Me Label */}
              <h3
                className="text-xs font-merriweather mb-2"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                About me
              </h3>
              {/* Description */}
              <p
                className="text-sm font-merriweather leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Emergency Contact Section */}
            <div
              className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
            >
              <Twemoji hex="1f4de" size={20} alt="telephone emoji" />
              <p
                className="text-sm font-merriweather"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                Emergencies: John • 562-332-4687
              </p>
            </div>
            {/* Emergency Contact Section */}
            <div
              className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: COLORS.EPIPEN_COLOR }}
            >
              <Twemoji hex="2705" size={20} alt="checkmark emoji" />
              <p
                className="text-sm font-merriweather"
                style={{ color: COLORS.WHITE }}
              >
                Carries an EpiPen: Yes
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
