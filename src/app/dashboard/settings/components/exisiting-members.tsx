"use client"

import { useEffect, useState, Fragment } from "react"
import { Transition, Menu, Popover } from "@headlessui/react"
import {
  BsThreeDots,
  BsPlus,
  BsTrash,
} from "react-icons/bs"
import { AiOutlineAlert } from "react-icons/ai"
import {FiRefreshCw} from "react-icons/fi"
import {RiShieldLine, RiUserUnfollowLine, RiUserFollowLine} from "react-icons/ri"
import RenderDialog from "./dialog"
import { IRole } from "@/api/types"

type ExistingMember = {
  id: string
  name: string
  email: string
  roleIds: number[]
  username?: string
  status: "active" | "suspended"
}

const ExistingMembersContainer = ({ roles }: { roles: IRole[] }) => {
  const [existingMembers, setExistingMembers] = useState<ExistingMember[]>([])
  const [membersLoading, setMembersLoading] = useState(true)
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)
  const [dialogType, setDialogType] = useState<"remove" | "suspend" | "restore" | "addRole" | "removeRole">("remove")
  const [selectedRole, setSelectedRole] = useState<number>(0)
  const [roleToRemove, setRoleToRemove] = useState<number>(0)
  const [tooltipContent, setTooltipContent] = useState<{ id: string; content: string } | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      setMembersLoading(true)
      try {
        const mockMembers = [
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            roleIds: [roles[0]?.id, roles[1]?.id],
            username: "johndoe",
            status: "active" as const,
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            roleIds: [roles[1]?.id],
            username: "janesmith",
            status: "active" as const,
          },
          {
            id: "3",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            roleIds: [roles[0]?.id, roles[2]?.id],
            username: "michaelb",
            status: "suspended" as const,
          },
        ]
        setExistingMembers(mockMembers)
      } catch (error) {
        console.error("Failed to fetch team members:", error)
      } finally {
        setMembersLoading(false)
      }
    }

    if (roles && roles.length > 0) {
      fetchMembers()
    }
  }, [roles])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  const getRoleById = (roleId: number) => {
    return roles.find((r) => r.id === roleId)
  }

  const getAvailableRoles = (member: ExistingMember) => {
    return roles.filter((role) => !member.roleIds.includes(role.id))
  }

  const openAddRoleDialog = (memberId: string) => {
    setDialogType("addRole")
    setOpenDialogId(memberId)
    setSelectedRole(0)
  }

  const openRemoveRoleDialog = (memberId: string, roleId: number) => {
    setDialogType("removeRole")
    setOpenDialogId(memberId)
    setRoleToRemove(roleId)
  }

  return (
    <>
      {membersLoading ? (
        <div className="flex justify-center items-center py-12">
          <FiRefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="bg-white border rounded-lg shadow-sm  z-50">
          {existingMembers.map((member) => (
            <div
              key={member.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b last:border-b-0 z-50 ${
                member.status === "suspended" ? "bg-gray-50" : ""
              }`}
            >
              {/* Left side: User info */}
              <div className="sm:w-auto w-full flex items-center gap-3 z-0">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 ${
                    member.status === "suspended" ? "opacity-70" : ""
                  }`}
                >
                  <span className="font-medium">{getInitials(member.name)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 flex items-center gap-2 z-50">
                    {member.name}
                    {member.status === "suspended" && (
                      <div className="relative">
                        <div
                        className="z-50"
                          onMouseEnter={() =>
                            setTooltipContent({ id: `suspended-${member.id}`, content: "Account Suspended" })
                          }
                          onMouseLeave={() => setTooltipContent(null)}
                        >
                          <AiOutlineAlert className="h-4 w-4 text-amber-500" />
                        </div>
                        {tooltipContent?.id === `suspended-${member.id}` && (
                          <div className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            {tooltipContent.content}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">{member.email}</div>
                  {member.username && <div className="text-xs text-gray-500 mt-0.5">@{member.username}</div>}
                </div>
              </div>

              {/* Right side: Roles and actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 mt-3 sm:mt-0 w-full sm:w-auto">
                <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-0 w-full sm:w-auto">
                  {member.roleIds.map((roleId) => {
                    const role = getRoleById(roleId)
                    if (!role) return null

                    return (
                      <div key={roleId} className="relative inline-flex items-center bg-gray-100 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-200">
                        <span
                          className=" text-gray-800 text-xs font-medium flex items-center group  transition-colors"
                        >
                          <RiShieldLine className="h-3 w-3 mr-1 inline" />
                          {role.name}
                        </span>
                        <button
                          onClick={() => openRemoveRoleDialog(member.id, roleId)}
                          className="ml-1 p-1 hover:bg-gray-200 rounded-full transition-colors"
                          title={`Remove ${role.name} role`}
                        >
                          <BsTrash className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    )
                  })}
                  <button
                    className={`px-2 py-1 text-xs border border-gray-300 rounded-md flex items-center hover:bg-gray-50 ${
                      getAvailableRoles(member).length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => openAddRoleDialog(member.id)}
                    disabled={getAvailableRoles(member).length === 0}
                  >
                    <BsPlus className="h-3 w-3 mr-1" />
                    Add Role
                  </button>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
                      <BsThreeDots className="h-4 w-4 text-gray-500" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-1 py-1">
                        {member.status === "active" ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-amber-600`}
                                onClick={() => {
                                  setDialogType("suspend")
                                  setOpenDialogId(member.id)
                                }}
                              >
                                <RiUserUnfollowLine className="h-4 w-4 mr-2" />
                                Suspend User
                              </button>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-green-600`}
                                onClick={() => {
                                  setDialogType("restore")
                                  setOpenDialogId(member.id)
                                }}
                              >
                                <RiUserFollowLine className="h-4 w-4 mr-2" />
                                Restore User
                              </button>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100" : ""
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                              onClick={() => {
                                setDialogType("remove")
                                setOpenDialogId(member.id)
                              }}
                            >
                              <BsTrash className="h-4 w-4 mr-2" />
                              Remove User
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}
      <RenderDialog 
        openDialogId={openDialogId} 
        dialogType={dialogType} 
        selectedRole={selectedRole} 
        setSelectedRole={setSelectedRole} 
        roleToRemove={roleToRemove} 
        setExistingMembers={setExistingMembers} 
        existingMembers={existingMembers} 
        setOpenDialogId={setOpenDialogId} 
        setRoleToRemove={setRoleToRemove} 
        getAvailableRoles={getAvailableRoles} 
        getRoleById={getRoleById} 
      />
    </>
  )
}

export default ExistingMembersContainer