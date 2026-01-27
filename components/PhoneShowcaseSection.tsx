import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import { LANDING_FEATURES } from "@/constants/landing-features";

export default function PhoneShowcaseSection() {
  return (
    <section className="relative flex-1 w-full flex flex-col justify-end">
      <div className="relative flex items-center justify-center w-full">
        {/* Left Cards Group */}
        <div className="hidden md:flex absolute left-[-13%] bottom-[5%] flex-row gap-4 z-10">
          {LANDING_FEATURES.left.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              backgroundColor={feature.backgroundColor}
              buttonColor={feature.buttonColor}
              iconSrc={feature.iconSrc}
              iconAlt={feature.iconAlt}
              animationDelay={feature.animationDelay}
              position="left"
            />
          ))}
        </div>

        {/* Center Phone Image */}
        <div
          className="relative z-20 -mb-10"
          style={{ animation: "fadeInScale 0.6s ease-out 0.4s both" }}
        >
          <Image
            src="/assets/Screens/Home.png"
            alt="Dine App Home Screen"
            width={432}
            height={689}
            priority
            quality={100}
            unoptimized={true}
            className="object-contain w-[270px] h-auto"
          />
        </div>

        {/* Right Cards Group */}
        <div className="hidden md:flex absolute right-[-13%] bottom-[5%] flex-row gap-4 z-10">
          {LANDING_FEATURES.right.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              backgroundColor={feature.backgroundColor}
              buttonColor={feature.buttonColor}
              iconSrc={feature.iconSrc}
              iconAlt={feature.iconAlt}
              animationDelay={feature.animationDelay}
              position="right"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
