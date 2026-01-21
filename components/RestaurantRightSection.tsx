import { COLORS } from "@/constants/colors";

export default function RestaurantRightSection() {
  return (
    <div className="flex flex-col w-full md:w-[35%] h-full overflow-y-auto pb-20 md:pb-0">
      <div
        className="w-full p-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
      >
        <p
          className="text-lg font-merriweather"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Restaurant content coming soon...
        </p>
      </div>
    </div>
  );
}
