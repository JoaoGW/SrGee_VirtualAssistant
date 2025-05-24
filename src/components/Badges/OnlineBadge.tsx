export function OnlineBadge() {
  return(
    <div className="flex flex-row items-center justify-center bg-gray-600 max-w-[100px] p-1 rounded-2xl mb-3">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      <span className="text-sm text-white">Online</span>
    </div>
  )
}