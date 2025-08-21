import Link from "next/link";

import { LucideIcon } from "lucide-react";

type ButtonNavStyleTypes = {
  icon: LucideIcon,
  title: string,
  urlParam: boolean,
  navigateTo: string
}

export default function ButtonNavRouteStyle({ icon: Icon, title, urlParam, navigateTo }: ButtonNavStyleTypes){
  return(
    <Link 
      className={ urlParam ? "flex flex-row items-center mb-2 hover:cursor-pointer bg-[#4b4b4b] rounded-full p-1.5 pl-3.5" : "flex flex-row items-center mb-2 hover:cursor-pointer hover:bg-[#4b4b4b] hover:rounded-full hover:p-1.5 hover:pl-3.5 duration-200"}
      href={ navigateTo }
    >
      <Icon size={19} className="mr-2" />
      <p>{ title }</p>
    </Link>
  )
}