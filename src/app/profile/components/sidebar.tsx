"use client"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "edit-profile", label: "Edit Profile" },
    { id: "password", label: "Password" },
    { id: "business", label: "Business" },
    { id: "email-notifications", label: "Email Notifications" },
  ]

  return (
    <div className="w-56 border-r">
      <nav className="flex flex-col py-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-left text-sm font-medium ${
              activeTab === tab.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
