import { Bus, ChevronDown, Bell } from "lucide-react"

interface HeaderProps{
  pageTitle?:string
  pageDescription?:string
}

export function Header({pageTitle,pageDescription}:HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 h-20 flex items-center">
      <div className="flex items-center justify-between w-full">
      <div>
              {pageTitle ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                  {pageDescription && <p className="text-slate-600">{pageDescription}</p>}
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">Good morning, Admin!</h1>
                  <p className="text-slate-600">Welcome back to BUSMATE LK Transportation Dashboard</p>
                </>
              )}
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
            <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-slate-500">Administrator</div>
            </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
