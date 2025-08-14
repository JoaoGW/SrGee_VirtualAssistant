import Image from "next/image";

import GeeLogo from "@assets/Logo/WB_nodescription.png"

import { LockKeyhole, Star } from "lucide-react";

import { ButtonWithStartIcon } from "@components/Buttons/ButtonWithStartIcon"

export function Header() {
  return (
    <div className="relative px-10 py-5 flex justify-between flex-row">
      <div className="flex flex-row items-center">
        <Image
          src={GeeLogo}
          alt="Gee Logo"
          className="h-35 w-25 object-cover"
        />
        <h1 className="special-title text-3xl">Sr Gee</h1>
      </div>
      <div className="flex flex-row gap-12 items-center">
        <a>Pricing</a>
        <div className="flex flex-row">
          <Star />
          <a className="ml-3">Star us on GitHub!</a>
        </div>
        <ButtonWithStartIcon text="Login" icon={ LockKeyhole } isLogin/>
      </div>
    </div>
  )
}