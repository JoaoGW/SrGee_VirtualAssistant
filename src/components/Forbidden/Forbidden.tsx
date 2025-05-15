import Image from "next/image";

import Error403 from "@assets/Restricted/forbidden403.png"

export function ForbiddenAcessPageStructure() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={Error403}
        alt="You don't have access to enter this page yet. Please go back to the menu and properly login"
      ></Image>
      <p className="mb-3">Please, login again to gain access to this page!</p>
      <button className="bg-white text-black p-4 rounded-lg">
        Go Back to the Main Page
      </button>
    </div>
  )
}