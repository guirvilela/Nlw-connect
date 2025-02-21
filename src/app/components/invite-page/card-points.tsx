import { LucideIcon } from "lucide-react";

interface CardPointProps {
  value: number;
  text: string;
  position?: boolean;
  icon: LucideIcon;
}
export function CardPoint({
  text,
  position = false,
  value,
  icon: Icon,
}: CardPointProps) {
  return (
    <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
      <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
        {position ? `${value}º` : value}
      </span>
      <span className="text-sm text-gray-300 leading-none text-center">
        {text}
      </span>

      <Icon className="size-5 text-purple absolute top-3 left-3" />
    </div>
  );
}
