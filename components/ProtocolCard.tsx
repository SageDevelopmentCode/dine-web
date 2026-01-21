import { COLORS } from "@/constants/colors";

interface ProtocolCardProps {
  label: string;
}

export default function ProtocolCard({ label }: ProtocolCardProps) {
  return (
    <div
      className="flex items-center justify-center p-3 rounded-lg"
      style={{ backgroundColor: COLORS.WHITE }}
    >
      <span
        className="text-sm font-merriweather text-center"
        style={{ color: COLORS.BLACK }}
      >
        {label}
      </span>
    </div>
  );
}
