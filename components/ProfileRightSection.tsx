import { COLORS } from "@/constants/colors";

export default function ProfileRightSection() {
  return (
    <div className="flex flex-col w-[35%] h-full overflow-y-auto">
      <h2
        className="text-xl font-merriweather font-regular mb-4"
        style={{ color: COLORS.BLACK }}
      >
        My Allergies and Cards
      </h2>
    </div>
  );
}
