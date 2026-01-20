import Header from "@/components/Header";
import { COLORS } from "@/constants/colors";

interface RestaurantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-2 py-8 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Restaurant Profile</h1>
              <p className="text-xl text-gray-600">
                Slug: <span className="font-mono font-semibold">{slug}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
