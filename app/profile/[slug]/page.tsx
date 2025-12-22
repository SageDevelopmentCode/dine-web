import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSection from "@/components/ProfileLeftSection";
import ProfileRightSection from "@/components/ProfileRightSection";
import { getInitialProfileData } from "@/lib/supabase/web_profiles/get_initial_profile_data";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  const initialData = await getInitialProfileData(slug);

  console.log("📊 Initial Profile Data Loaded:", initialData);
  const userId = initialData.profile.user_id;

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
            <ProfileRightSection slug={slug} userId={userId} />
          </div>
        </div>
      </main>
    </div>
  );
}
