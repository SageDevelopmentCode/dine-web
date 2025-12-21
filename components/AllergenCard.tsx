import { COLORS } from "@/constants/colors";
import { Twemoji } from "@/utils/twemoji";

type Severity = "severe" | "moderate" | "mild";

interface AllergenCardProps {
  emojiHex: string;
  label: string;
  severity: Severity;
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
}: AllergenCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-3 rounded-lg border-3 min-w-[80px] gap-1"
      style={{ borderColor: severityColors[severity] }}
    >
      <Twemoji hex={emojiHex} size={28} />
      <span
        className="text-xs font-merriweather text-center mt-1"
        style={{ color: COLORS.BLACK }}
      >
        {label}
      </span>
    </div>
  );
}
