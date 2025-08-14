import { LucideIcon } from "lucide-react"

type ButtonNavStyleTypes = {
  icon: LucideIcon,
  title: string
}

export default function ButtonNavRouteStyle({ icon: Icon, title }: ButtonNavStyleTypes){
  return(
    <button className="flex flex-row items-center">
      <Icon size={17} className="mr-2" />
      <p>{ title }</p>
    </button>
  )
}