import { LucideIcon } from "lucide-react"

type ButtonNavStyleTypes = {
  icon: LucideIcon,
  title: string
}

export default function ButtonNavRouteStyle({ icon: Icon, title }: ButtonNavStyleTypes){
  return(
    <button 
      className="flex flex-row items-center mb-2 hover:cursor-pointer hover:bg-[#4b4b4b] hover:rounded-full hover:p-1.5 hover:pl-3.5 duration-200"
      onClick={ () => {} }
    >
      <Icon size={19} className="mr-2" />
      <p>{ title }</p>
    </button>
  )
}