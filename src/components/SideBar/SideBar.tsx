"use client"
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from '../../services/Firebase/firebase';

import { ButtonWithIconOnly } from "@components/Buttons/ButtonWithIconOnly";
import ButtonNavRouteStyle from "@components/Buttons/ButtonNavRouteStyle";

import { Github, Power, ArrowDownUp, House, GitCommitVertical, GitBranch, GitPullRequestArrow, BadgeAlert, FolderCog, MessageSquareDiff, Settings, ShieldQuestion, MessageSquareQuote } from "lucide-react";

import WBLogo from '@assets/Logo/WB_nodescription.png';
import DefaultProfile from '@assets/Logo/WB_description.png';

import { signOut } from "firebase/auth";

type SideBarDependencies = {
  isLoading: boolean,
  user: any
}

export function SideBar({ isLoading, user }: SideBarDependencies) {  
  return(
    <div className="absolute top-0 bottom-0 left-0 w-[10.5%] bg-[#252525] flex flex-col justify-between">
      <div className="flex flex-col items-center border-b-2">
        <Image src={ WBLogo } alt="" style={{ marginBottom: 20 }}></Image>
        <div className="flex flex-row border rounded-md p-2 items-center max-w-[95%] mt-[-45] mb-5">
          <div className="border rounded-full p-2 mr-2">
            <Github size={23} />
          </div>
          <button className="mr-2 text-sm hover:cursor-pointer" onClick={ () => {} }>Repositório</button>
          <ArrowDownUp size={15} />
        </div>
      </div>

      <div className="flex flex-col justify-start flex-grow mt-5 ml-3">
        <ButtonNavRouteStyle icon={ House } title="Home" />
        <ButtonNavRouteStyle icon={ GitCommitVertical } title="Commits" />
        <ButtonNavRouteStyle icon={ GitBranch } title="Branches" />
        <ButtonNavRouteStyle icon={ GitPullRequestArrow } title="Pull Requests" />
        <ButtonNavRouteStyle icon={ BadgeAlert } title="Issues" />
        <ButtonNavRouteStyle icon={ FolderCog } title="Project Settings" />
        <ButtonNavRouteStyle icon={ MessageSquareDiff } title="Diffs History & Logs" />
      </div>
      <div className="flex flex-col justify-end mt-5 ml-3">
        <ButtonNavRouteStyle icon={ Settings } title="Settings" />
        <ButtonNavRouteStyle icon={ ShieldQuestion } title="About" />
        <ButtonNavRouteStyle icon={ MessageSquareQuote } title="Feedback" />
      </div>

      <div className="border-b-2 my-3"></div>
      
      <div className="flex flex-row items-center justify-between w-full px-2 mb-4">
        <Image
          className="rounded-full border-2 border-white"
          src={ user?.photoURL || DefaultProfile }
          alt="User GitHub Avatar"
          width={35}
          height={35}
        />
        <div className="flex flex-col items-start ml-2">
          <p className="text-xs font-bold text-white truncate w-[85%]">{ user?.displayName }</p>
          <p className="text-xs text-gray-400 truncate w-[85%]">{ user?.email }</p>
        </div>
        <ButtonWithIconOnly 
          icon={ Power } 
          iconColor="#e0766e" 
          iconSize={22} 
          description="Quit" 
          buttonAction={ () => { signOut(auth); redirect('/') } } 
          disabled={ isLoading } 
          style={{ marginLeft: -10 }}
        />
      </div>
    </div>
  )
}