"use client";

interface EditPolicyTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function EditPolicyTabs({
  activeTab,
  onTabChange,
}: EditPolicyTabsProps) {
  const tabs = [
    { id: "details", label: "Document Details" },
    { id: "content", label: "Content Editor" },
    { id: "files", label: "File Management" },
    { id: "history", label: "Version History" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
