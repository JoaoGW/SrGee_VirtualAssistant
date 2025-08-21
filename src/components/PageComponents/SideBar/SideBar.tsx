"use client"
import Image from "next/image";
import { redirect, useRouter, usePathname } from "next/navigation";

import { auth } from '../../../services/Firebase/firebase';

import { ButtonWithIconOnly } from "@components/Buttons/ButtonWithIconOnly";
import ButtonNavRouteStyle from "@components/Buttons/ButtonNavRouteStyle";
import PremiumUpgradeMini from "@components/Premium/PremiumUpgradeMini";

import { Github, Power, ArrowDownUp, House, GitCommitVertical, GitBranch, GitPullRequestArrow, BadgeAlert, FolderCog, MessageSquareDiff, Settings, ShieldQuestion, MessageSquareQuote, Workflow } from "lucide-react";

import WBLogo from '@assets/Logo/WB_nodescription.png';
import DefaultProfile from '@assets/Logo/WB_description.png';

import { signOut } from "firebase/auth";

interface User {
  photoURL?: string;
  displayName?: string;
  email?: string;
}

type SideBarDependencies = {
  isLoading: boolean,
  user: User
}

export function SideBar({ isLoading, user }: SideBarDependencies) {
  const pathname = usePathname();

  function checkCurrentUrl(paramName: string) {
    return pathname.includes(paramName);
  }

  return(
    <div className="absolute top-0 bottom-0 left-0 w-[10.5%] bg-[#0c1117] flex flex-col justify-between">
      <div className="flex flex-col items-center border-b-2">
        <Image src={ WBLogo } alt="" style={{ marginBottom: 20, marginTop: -10 }} />
        <div className="flex flex-row border rounded-md p-2 items-center w-[90%] max-w-[95%] mt-[-45] mb-5 hover:cursor-pointer" onClick={ () => {} }>
          <div className="border rounded-full p-2 mr-2">
            <Github size={23} />
          </div>
          <p className="mr-2 text-sm">Repositório</p>
          <ArrowDownUp size={15} />
        </div>
      </div>

      <div className="flex flex-col justify-start flex-grow mt-5 ml-3">
        <ButtonNavRouteStyle icon={ House } title="Home" urlParam={ checkCurrentUrl("dashboard") } navigateTo="dashboard" />
        <ButtonNavRouteStyle icon={ GitCommitVertical } title="Commits" urlParam={ checkCurrentUrl("commits") } navigateTo="commits" />
        <ButtonNavRouteStyle icon={ GitBranch } title="Branches" urlParam={ checkCurrentUrl("branches") } navigateTo="branches" />
        <ButtonNavRouteStyle icon={ GitPullRequestArrow } title="Pull Requests" urlParam={ checkCurrentUrl("prs") } navigateTo="prs" />
        <ButtonNavRouteStyle icon={ BadgeAlert } title="Issues" urlParam={ checkCurrentUrl("issues") } navigateTo="issues" />
        <ButtonNavRouteStyle icon={ Workflow } title="Automations" urlParam={ checkCurrentUrl("automation") } navigateTo="automation" />
        <ButtonNavRouteStyle icon={ FolderCog } title="Project Settings" urlParam={ checkCurrentUrl("projectsettings") } navigateTo="projectsettings" />
        <ButtonNavRouteStyle icon={ MessageSquareDiff } title="Diffs & Logs" urlParam={ checkCurrentUrl("diffs") } navigateTo="diffs" />
      </div>
      <div className="flex flex-col justify-end mt-5 ml-3">
        <PremiumUpgradeMini />
        <ButtonNavRouteStyle icon={ Settings } title="Settings" urlParam={ checkCurrentUrl("settings") } navigateTo="settings" />
        <ButtonNavRouteStyle icon={ ShieldQuestion } title="About" urlParam={ checkCurrentUrl("about") } navigateTo="about" />
        <ButtonNavRouteStyle icon={ MessageSquareQuote } title="Feedback" urlParam={ checkCurrentUrl("feedback") } navigateTo="feedback" />
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
