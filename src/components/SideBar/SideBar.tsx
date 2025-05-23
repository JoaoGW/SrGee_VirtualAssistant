"use client"
import Image from "next/image";

import { auth } from '@utils/Firebase/firebase';

import { ButtonWithIconOnly } from "@components/Buttons/ButtonWithIconOnly";

import { FolderGit2, FileDigit, GitBranch, GitCompare, GitMerge, GitPullRequestCreate, Rocket, Power } from "lucide-react";

import WBLogo from '@assets/Logo/WB_nodescription.png'
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

type SideBarDependencies = {
  isLoading: boolean
}

export function SideBar({ isLoading }: SideBarDependencies) {
  function doNothingTemp(){
    return;
  }

  return(
    <div className="absolute top-0 bottom-0 left-0 w-[7%] bg-[#252525] flex flex-col space-evenly justify-center items-center gap-12">
      <Image src={ WBLogo } alt="" style={{ marginBottom: 20 }}></Image>
      <ButtonWithIconOnly icon={ FolderGit2 } description="Select Git Project" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ FileDigit } description="Manage Files" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ GitBranch } description="Git Branches" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ GitCompare } description="Git Compare" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ GitMerge } description="Git Merge" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ GitPullRequestCreate } description="Create Pull Request" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ Rocket } description="Set Releases" buttonAction={doNothingTemp} disabled={ isLoading } />
      <ButtonWithIconOnly icon={ Power } iconColor="#e0766e" description="Quit" buttonAction={ () => { signOut(auth); redirect('/') } } disabled={ isLoading } style={{ marginTop: 20 }}/>
    </div>
  )
}