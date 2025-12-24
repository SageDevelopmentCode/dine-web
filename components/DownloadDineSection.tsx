import { COLORS } from "@/constants/colors";
import QRCode from "react-qr-code";
import Image from "next/image";

export default function DownloadDineSection() {
  return (
    <div
      className="w-full px-5 py-4 rounded-t-2xl md:rounded-2xl flex items-center justify-start md:justify-between mb-0 md:mb-3 fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto z-50 md:z-auto"
      style={{
        backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
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
        className="rounded-lg hidden md:flex items-center justify-center p-2"
        style={{
          backgroundColor: COLORS.WHITE,
          border: `5px solid ${COLORS.DOWNLOAD_QR_BORDER}`,
          position: "relative",
          zIndex: 2,
        }}
      >
        <QRCode value="https://dine-app.example.com" size={80} level="H" />
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
  );
}
