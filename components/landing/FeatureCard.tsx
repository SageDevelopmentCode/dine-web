import Image from "next/image";
import { COLORS } from "@/constants/colors";

interface FeatureCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  buttonColor: string;
  iconSrc: string;
  iconAlt: string;
  animationDelay: string;
  position: "left" | "right";
}

export default function FeatureCard({
  title,
  description,
  backgroundColor,
  buttonColor,
  iconSrc,
  iconAlt,
  animationDelay,
  position,
}: FeatureCardProps) {
  const animationClass = position === "left" ? "fadeInLeft" : "fadeInRight";

  return (
    <div
      className="relative w-[300px] h-[130px] rounded-2xl p-4 overflow-hidden"
      style={{
        backgroundColor,
        animation: `${animationClass} 0.5s ease-out ${animationDelay} both`,
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <h3
          className="font-merriweather text-base font-semibold mb-1"
          style={{ color: COLORS.WHITE }}
        >
          {title}
        </h3>
        <p
          className="font-merriweather text-xs mb-3 max-w-[200px]"
          style={{ color: "#E2E2E2" }}
        >
          {description}
        </p>
        <button
          className="font-merriweather text-xs px-3 py-1.5 rounded-lg mt-auto w-fit"
          style={{ backgroundColor: buttonColor, color: COLORS.WHITE }}
        >
          View
        </button>
      </div>
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={100}
        height={100}
        quality={100}
        unoptimized={true}
        className="absolute -bottom-2 -right-2 object-contain"
      />
    </div>
  );
}
