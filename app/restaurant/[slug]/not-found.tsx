import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COLORS } from "@/constants/colors";
import Link from "next/link";

export default function RestaurantNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.PAGE_BACKGROUND }}
    >
      <Header />
      <main className="flex-1 px-6 py-8 md:px-12 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.BLACK }}
          >
            Restaurant Not Found
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            The restaurant you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: COLORS.EPIPEN_COLOR,
              color: COLORS.WHITE,
            }}
          >
            Go to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
