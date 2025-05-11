import { useState } from "react";

import { LucideIcon } from "lucide-react";
import LoginModal from "@components/Modals/LoginModal";

type ButtonProps = {
  text: string,
  icon: LucideIcon,
  isLogin: boolean,
  style?: Object
}

export function ButtonWithStartIcon({ text, icon: Icon, isLogin, style }: ButtonProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  return (
    <>
      {
        isLogin
          ? 
            <>
              <button 
                className="flex flex-row items-center bg-[#4a484596] rounded-lg p-2 w-30 justify-center hover:cursor-pointer"
                onClick={ () => setIsLoginModalOpen(true) }
                style={style}
              >
                <Icon />
                <p className="ml-2">{text}</p>
              </button>
              <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
            </>
          : <button className="flex flex-row items-center bg-[#4a484596] rounded-lg p-2 w-30 justify-center hover:cursor-pointer" style={style}>
              <Icon />
              <p className="ml-2">{text}</p>
            </button>
      }
    </>
  )
}