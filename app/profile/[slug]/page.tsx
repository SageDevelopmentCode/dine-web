import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";
import ProfileLeftSection from "@/components/ProfileLeftSection";
import ProfileRightSection from "@/components/ProfileRightSection";
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

  // Example: Fetch data from Supabase (uncomment when your .env.local is configured)
  // const profile = await getProfileBySlug(slug);
  //
  // if (!profile) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <p>Profile not found</p>
  //     </div>
  //   );
  // }
  //
  // const allergens = await getAllergensGroupedBySeverity(profile.id);
  // const infoCards = await getInfoCardsByUserId(profile.id);
  //
  // Pass this data to your components as props:
  // <ProfileLeftSection profile={profile} />
  // <ProfileRightSection allergens={allergens} infoCards={infoCards} />

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
