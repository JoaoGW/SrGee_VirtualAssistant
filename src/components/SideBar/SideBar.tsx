"use client"
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from '@utils/Firebase/firebase';

import { ButtonWithIconOnly } from "@components/Buttons/ButtonWithIconOnly";
import ButtonNavRouteStyle from "@components/Buttons/ButtonNavRouteStyle";

import { Github, Power, ArrowDownUp, House } from "lucide-react";

import WBLogo from '@assets/Logo/WB_nodescription.png'
import { signOut } from "firebase/auth";

type SideBarDependencies = {
  isLoading: boolean
}

export function SideBar({ isLoading }: SideBarDependencies) {
  function doNothingTemp(){
    return;
  }

  return(
    <div className="absolute top-0 bottom-0 left-0 w-[10.5%] bg-[#252525] flex flex-col justify-between items-center">
      <div className="flex flex-col items-center border-b-2">
        <Image src={ WBLogo } alt="" style={{ marginBottom: 20 }}></Image>
        <div className="flex flex-row border rounded-md p-2 items-center max-w-[95%] mt-[-45] mb-5">
          <div className="border rounded-full p-2 mr-2">
            <Github size={23} />
          </div>
          <button className="mr-2 text-sm">Repositório</button>
          <ArrowDownUp size={15} />
        </div>
      </div>
      <div>
        <ButtonNavRouteStyle icon={House} title="Home" />
        <ButtonNavRouteStyle icon={House} title="Commits" />
        <ButtonNavRouteStyle icon={House} title="Branches" />
        <ButtonNavRouteStyle icon={House} title="Pull Requests" />
        <ButtonNavRouteStyle icon={House} title="Issues" />
        <ButtonNavRouteStyle icon={House} title="Project Settings" />
        <ButtonNavRouteStyle icon={House} title="Diffs History & Logs" />
      </div>
      <ButtonWithIconOnly icon={ Power } iconColor="#e0766e" description="Quit" buttonAction={ () => { signOut(auth); redirect('/') } } disabled={ isLoading } style={{ marginBottom: 25 }}/>
    </div>
  )
}