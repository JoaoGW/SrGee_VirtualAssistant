import { LucideIcon } from "lucide-react";

type CardComponentsProps = {
  icon: LucideIcon;
  description: string;
}

export function ActivityCard({ icon: Icon, description }: CardComponentsProps) {
  return (
    <div className="flex flex-row bg-zinc-700 shadow-md rounded-lg p-2 items-center">
      <Icon />
      <p className="text-white ml-3 truncate max-w-xs" title={description}>{description}</p>
    </div>
  )
}