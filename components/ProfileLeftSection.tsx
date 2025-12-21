import { COLORS } from "@/constants/colors";
import { User } from "lucide-react";
import { Twemoji } from "@/utils/twemoji";
import QRCode from "react-qr-code";
import Image from "next/image";

export default function ProfileLeftSection() {
  return (
    <div className="flex flex-col items-start justify-between w-[25%] overflow-hidden h-full">
      {/* Top Section Group */}
      <div className="flex flex-col w-full">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

      {/* Download Dine Section */}
      <div
        className="w-full px-5 py-4 rounded-2xl flex items-center justify-between"
        style={{
          backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Text */}
        <div className="flex flex-col">
          <h3
            className="text-lg font-merriweather font-bold mb-1"
            style={{ color: COLORS.WHITE }}
          >
            Download Dine
          </h3>
          <p
            className="text-sm font-merriweather"
            style={{ color: COLORS.LIGHTER_GRAY }}
          >
            Create your own profile
          </p>
        </div>

        {/* Right Side - QR Code */}
        <div
          className="rounded-lg flex items-center justify-center p-2"
          style={{
            backgroundColor: COLORS.WHITE,
            border: `5px solid ${COLORS.DOWNLOAD_QR_BORDER}`,
            position: "relative",
            zIndex: 2,
          }}
        >
          <QRCode
            value="https://dine-app.example.com"
            size={80}
            level="H"
          />
        </div>

        {/* Corner Image */}
        <div
          style={{
            position: "absolute",
            bottom: -25,
            right: -20,
            width: 100,
            height: 100,
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/JustMe.png"
            alt="Decoration"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
