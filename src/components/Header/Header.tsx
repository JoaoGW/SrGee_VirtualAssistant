import { LockKeyhole, Star } from "lucide-react"

import { ButtonWithStartIcon } from "@components/Buttons/ButtonWithStartIcon"

export function Header() {
  return (
    <div className="relative p-10 flex justify-between flex-row">
      <h1 className="special-title text-3xl">Sr Gee</h1>
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