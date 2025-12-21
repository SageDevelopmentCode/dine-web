import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import { User } from "lucide-react";

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
      <main className="px-6 py-12 md:px-12">
        <div className="flex gap-8">
          {/* Left Section */}
          <div className="flex flex-col items-start">
            {/* Profile Circle */}
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User size={64} className="text-gray-400" />
            </div>
            {/* Name */}
            <h2
              className="text-2xl font-merriweather font-bold mb-1"
              style={{ color: COLORS.BLACK }}
            >
              John Smith
            </h2>
            {/* Last Updated */}
            <p
              className="text-sm font-merriweather"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Last updated: 3 days ago
            </p>

            {/* About Me Section */}
            <div
              className="w-1/4 mt-6 p-6 rounded-lg"
              style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
            >
              {/* About Me Label */}
              <h3
                className="text-sm font-merriweather mb-3"
                style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
              >
                About me
              </h3>
              {/* Description */}
              <p
                className="text-base font-merriweather leading-relaxed"
                style={{ color: COLORS.BLACK }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
