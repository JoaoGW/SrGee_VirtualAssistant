"use client"

import { Tooltip } from "react-tooltip";

import { LucideIcon } from "lucide-react";

type ButtonProps = {
  icon: LucideIcon,
  iconColor?: string,
  description: string,
  style?: Object,
  buttonAction: () => void
}

export function ButtonWithIconOnly({ icon: Icon, iconColor, description, style, buttonAction }: ButtonProps) {
  return (
    <>
      <button
        className="flex items-center justify-center w-14 h-14 hover:cursor-pointer hover:bg-[#4b4b4b] hover:rounded-full hover:p-3 duration-200"
        data-tooltip-id="buttonIcon-tooltip"
        data-tooltip-content={ description }
        data-tooltip-place="right"
        style={ style }
        onClick={ buttonAction }
      >
        <Icon color={ iconColor } size={40} />
      </button>

      <Tooltip id="buttonIcon-tooltip" />
    </>
  )
}