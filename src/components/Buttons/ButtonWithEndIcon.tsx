import { LucideIcon } from "lucide-react";

type ButtonProps = {
  text: string;
  icon: LucideIcon;
  style?: Object;
};

export function ButtonWithEndIcon({ text, icon: Icon, style }: ButtonProps) {
  return (
    <button
      className="flex flex-row items-center bg-[#4a484596] rounded-lg p-2 w-30 justify-center relative overflow-hidden group hover:cursor-pointer"
      style={style}
    >
      <span className="absolute inset-0 bg-[#4a4845] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      <p className="mr-5 relative z-10 text-white text-2xl">{text}</p>
      <Icon className="relative z-10 text-white" />
    </button>
  );
}