"use client"

import { useEffect, useState } from "react"
import { Tab } from "@headlessui/react"
import { FiHome } from "react-icons/fi"
import TeamManagement from "./components/team-management"
import RolesManagement from "./components/role-management"
import WrapperLayout from "@/components/WrapperLayout"
import IntegrationComponent from "./components/integration"
import { useUserState } from "@/api/context/UserContext"
import { useRolesState } from "@/api/context/RolesContext"


export default function BusinessSettings() {
  const [selectedTab, setSelectedTab] = useState(0)
  const { getAllInvitedUsers } = useUserState();
  const {getRolesPermissions} = useRolesState()

  useEffect(() => {
    getAllInvitedUsers()
    getRolesPermissions()
  }, [])

  return (
    <WrapperLayout>
      <div className="lg:max-w-6xl w-full mx-auto lg:px-4 py-8">

        <div className="md:mb-10 mb-5">
          <h2 className="xl:text-3xl md:text-2xl sm:text-xl text-lg font-medium">Business Settings</h2>
        </div>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex border-b flex-nowrap overflow-x-auto scrollbar-hide">
            <Tab
              className={({ selected }) =>
                `py-4 px-6 sm:text-base text-sm font-medium outline-none whitespace-nowrap ${
                  selected
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`
              }
            >
              Integrations
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-4 px-6 sm:text-base text-sm font-medium outline-none whitespace-nowrap ${
                  selected
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`
              }
            >
              Team 
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-4 px-6 sm:text-base text-sm font-medium outline-none whitespace-nowrap ${
                  selected
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`
              }
            >
              Roles Management
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
             <IntegrationComponent />
            </Tab.Panel>
            <Tab.Panel>
              <TeamManagement />
            </Tab.Panel>
            <Tab.Panel>
              <RolesManagement />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </WrapperLayout>
  )
}

