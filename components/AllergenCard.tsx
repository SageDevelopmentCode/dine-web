import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

type Severity = "severe" | "moderate" | "mild";

interface AllergenCardProps {
  emojiHex: string;
  label: string;
  severity?: Severity;
  onClick?: () => void;
}

const severityColors: Record<Severity, string> = {
  severe: COLORS.SEVERE_BORDER,
  moderate: COLORS.MODERATE_BORDER,
  mild: COLORS.MILD_BORDER,
};

export default function AllergenCard({
  emojiHex,
  label,
  severity,
  onClick,
}: AllergenCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-3 rounded-lg border-3 w-[88px] h-[88px] gap-1 cursor-pointer transition-all hover:opacity-80"
      style={{ borderColor: severity ? severityColors[severity] : COLORS.DOWNLOAD_SECTION_BLUE }}
      onClick={onClick}
    >
      <Twemoji hex={emojiHex} size={24} />
      <span
        className="text-xs font-merriweather text-center mt-1 line-clamp-2 overflow-hidden px-1"
        style={{ color: COLORS.BLACK }}
      >
        {label}
      </span>
    </div>
  );
}
