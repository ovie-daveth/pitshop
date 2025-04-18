import type { ReactNode } from "react"
import Sidebar from "./components/sidebar"
import UserDropdown from "./components/use-drop-down"
import WrapperLayout from "@/components/WrapperLayout"

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
    <WrapperLayout>
    <div className="w-full md:py-8 -mt-5">
        <div className="flex md:flex-row flex-col w-full lg:gap-24 gap-5">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab)
              if (tab !== "business") {
                setShowCreateBusiness(false)
              }
            }}
          />
          <main className="flex-1 md:p-6 p-3">{children}</main>
        </div>
    </div>
    </WrapperLayout>
  )
}
