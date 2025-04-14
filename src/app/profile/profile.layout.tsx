import type { ReactNode } from "react"
import Sidebar from "./components/sidebar"
import UserDropdown from "./components/use-drop-down"

interface LayoutProps {
  children: ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
  showCreateBusiness: boolean
  setShowCreateBusiness: (show: boolean) => void
}

export default function Layout({
  children,
  activeTab,
  setActiveTab,
  showCreateBusiness,
  setShowCreateBusiness,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col flex-1 max-w-6xl mx-auto bg-white shadow-sm">
        <header className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-medium text-gray-900">Profile Settings</h1>
          <UserDropdown />
        </header>

        <div className="flex flex-1">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab)
              if (tab !== "business") {
                setShowCreateBusiness(false)
              }
            }}
          />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
