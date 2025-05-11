import { LucideIcon } from "lucide-react"

type ButtonProps = {
  text: string,
  icon: LucideIcon,
  style?: Object
}

export function ButtonWithStartIcon({ text, icon: Icon, style }: ButtonProps){
  return(
    <button className="flex flex-row items-center bg-[#4a484596] rounded-lg p-2 w-30 justify-center" style={ style }>
      <Icon />
      <p className="ml-2">{ text }</p>
    </button>
  )
}