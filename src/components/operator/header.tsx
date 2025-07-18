import { Bus, ChevronDown, Bell } from "lucide-react"

export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <div className="bg-blue-100 p-2 rounded-lg">
            <Bus className="w-6 h-6 text-blue-600" />
          </div> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
              3
            </span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JM</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-900">John Manager</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
