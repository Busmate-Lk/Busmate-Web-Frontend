interface Tab {
  id: string
  label: string
  count: number
  active?: boolean
  onClick: () => void
}

interface MessageTabsProps {
  tabs: Tab[]
}

export default function MessageTabs({ tabs }: MessageTabsProps) {
  return (
    <div className="flex items-center gap-1 mb-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={tab.onClick}
          className={`px-4 py-2 font-medium border-b-2 flex items-center gap-2 ${
            tab.active
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          {tab.label}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}