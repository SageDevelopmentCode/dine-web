import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSection from "@/components/ProfileLeftSection";
import ProfileRightSection from "@/components/ProfileRightSection";
import { getInitialProfileData } from "@/lib/supabase/web_profiles/get_initial_profile_data";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  let initialData;
  try {
    initialData = await getInitialProfileData(slug);
  } catch (error) {
    // If profile not found, show the not-found page
    if (error instanceof Error && error.message.includes("No profile found")) {
      notFound();
    }
    // Re-throw other errors to be handled by error boundary
    throw error;
  }

  console.log("📊 Initial Profile Data Loaded:", initialData);
  const userId = initialData.profile.user_id;

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-full justify-center">
            <ProfileLeftSection
              profile={initialData.profile}
              emergencyContacts={initialData.emergencyContacts}
            />
            <ProfileRightSection
              slug={slug}
              userId={userId}
              allergens={initialData.allergens}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
