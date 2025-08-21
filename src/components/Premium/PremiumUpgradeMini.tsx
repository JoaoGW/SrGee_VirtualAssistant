import { Glow, GlowCapture } from "@codaworks/react-glow";

import { Crown } from "lucide-react";

export default function PremiumUpgradeMini() {
  return (
    <GlowCapture>
      <div className="mb-4 p-3 w-[95%] bg-[#090c11] rounded-lg shadow-md border border-gray-200">
        <Glow color="yellow">
          <div className="flex flex-row items-center mb-1.5">
            <Crown color="#FFF" size={20} fill="#FFF" />
            <p className="ml-2 text-sm text-white w-[110%]">Premium Discount</p>
          </div>
          <p className="text-sm text-white">Enjoy a limited time 25% OFF on your upgrade to premium today!</p>
        </Glow>
      </div>
    </GlowCapture>
  )
}