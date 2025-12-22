import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSection from "@/components/ProfileLeftSection";
import ProfileRightSection from "@/components/ProfileRightSection";
import { getUserWebProfileBySlug } from "@/lib/supabase/web_profiles/user_web_profile_urls";
// Supabase imports - uncomment when ready to use
// import { getProfileBySlug } from "@/lib/supabase/queries/profiles";
// import { getAllergensGroupedBySeverity } from "@/lib/supabase/queries/allergens";
// import { getInfoCardsByUserId } from "@/lib/supabase/queries/cards";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  try {
    const profile = await getUserWebProfileBySlug(slug);
    console.log("Profile data:", profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-6 py-8 md:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex gap-8 h-full justify-center">
            <ProfileLeftSection />
            <ProfileRightSection />
          </div>
        </div>
      </main>
    </div>
  );
}
