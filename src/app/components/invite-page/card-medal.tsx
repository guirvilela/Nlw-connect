import Image from "next/image";
import CooperMedal from "../../../assets/medal-cooper.svg";
import GoldMedal from "../../../assets/medal-gold.svg";
import SilverMedal from "../../../assets/medal-silver.svg";

interface MedalCardProps {
  medal: "gold" | "silver" | "cooper";
  position: number;
  name: string;
  value: number;
}

export function MedalCard({ name, value, medal, position }: MedalCardProps) {
  const medalIcon =
    medal === "gold"
      ? GoldMedal
      : medal === "silver"
      ? SilverMedal
      : CooperMedal;

  return (
    <div className=" relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
      <span className="text-sm text-gray-300 leading-none ">
        <span className="font-semibold">{position}º</span> | {name}
      </span>
      <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
        {value}
      </span>

      <Image
        src={medalIcon}
        alt="medal"
        quality={100}
        className="absolute right-8 top-0"
      />
    </div>
  );
}
