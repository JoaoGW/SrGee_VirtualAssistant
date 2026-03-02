"use client"

import { Tooltip } from "react-tooltip";

import { LucideIcon } from "lucide-react";

type ButtonProps = {
  icon: LucideIcon,
  iconColor?: string,
  iconSize?: number,
  description: string,
  style?: Object,
  disabled?: boolean,
  buttonAction: () => void
}

export function ButtonWithIconOnly({ icon: Icon, iconColor, iconSize, description, disabled, style, buttonAction }: ButtonProps) {
  return (
    <>
      <button
        className="flex items-center justify-center w-14 h-14 hover:cursor-pointer"
        data-tooltip-id="buttonIcon-tooltip"
        data-tooltip-content={ description }
        data-tooltip-place="right"
        style={ style }
        onClick={ buttonAction }
        disabled={ disabled }
      >
        <Icon color={ iconColor } size={ iconSize || 40 } />
      </button>

      <Tooltip id="buttonIcon-tooltip" />
    </>
  )
}