import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default function LandingHeader() {
  return (
    <header className="w-full px-8 py-6">
      <nav className="w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/Logo.png"
            alt="Dine Logo"
            width={80}
            height={80}
            priority
            className="object-contain w-auto h-10"
            quality={100}
            unoptimized={true}
          />
        </Link>

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-12">
          <a
            href="/about-us"
            className="font-merriweather text-base hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: COLORS.BLACK }}
          >
            About us
          </a>
          <a
            href="/for-you"
            className="font-merriweather text-base hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: COLORS.BLACK }}
          >
            For You
          </a>
          <a
            href="/for-restaurants"
            className="font-merriweather text-base hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: COLORS.BLACK }}
          >
            For Restaurants
          </a>
          {/* <a
            href="#blog"
            className="font-merriweather text-base hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: COLORS.BLACK }}
          >
            Blog
          </a> */}
          <a
            href="#contact"
            className="font-merriweather text-base hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: COLORS.BLACK }}
          >
            Contact Us
          </a>
        </div>

        {/* Download App Button */}
        <button
          className="font-merriweather text-base px-5 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          style={{
            backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
            color: COLORS.WHITE,
          }}
        >
          Download App
          <ChevronRight size={20} />
        </button>
      </nav>
    </header>
  );
}
