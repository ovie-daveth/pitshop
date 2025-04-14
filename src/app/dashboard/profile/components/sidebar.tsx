"use client"

import { useState } from "react"
import { ChevronDoubleRightIcon } from "@heroicons/react/solid"
import clsx from "clsx"

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

  const [isExpanded, setIsExpanded] = useState(false)

  // Get the selected tab index based on activeTab
  const selectedTabIndex = tabs.findIndex(tab => tab.id === activeTab)
  const selectedTab = tabs[selectedTabIndex]

  return (
    <div className="lg:w-56">
      {/* Mobile View */}
      <div className="md:hidden px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            className="pl-2 py-2.5 text-left text-sm font-medium w-full bg-blue-50 text-blue-600 border-l-2 border-blue-600"
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {selectedTab.label}
          </button>
          <button className="p-2" onClick={() => setIsExpanded(prev => !prev)}>
            <ChevronDoubleRightIcon
              className={clsx("h-5 w-5 text-blue-600 transition-transform", {
                "rotate-90": isExpanded,
              })}
            />
          </button>
        </div>

        {/* Expandable dropdown for other tabs */}
        <div
          className={clsx("transition-all duration-300 overflow-hidden", {
            "max-h-0": !isExpanded,
            "max-h-96 mt-2": isExpanded,
          })}
        >
          <div className="flex flex-col gap-2">
            {tabs
              .filter((_, i) => i !== selectedTabIndex) // exclude selected tab
              .map((tab) => (
                <button
                  key={tab.id}
                  className={clsx(
                    "pl-2 py-2.5 text-left text-sm font-medium rounded-md",
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsExpanded(false)
                  }}
                >
                  {tab.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <nav className="flex flex-col gap-2 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={clsx(
                "pl-2 py-2.5 text-left text-sm font-medium rounded-r-md",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
