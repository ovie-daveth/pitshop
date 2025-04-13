"use client"
import { Dispatch, SetStateAction, useState, Fragment } from "react"
import {MdKeyboardArrowDown} from "react-icons/md"
import { Dialog, Transition, Listbox } from "@headlessui/react"
import { BsCheck } from "react-icons/bs"
import { IRole } from "@/api/types"
import { FiRefreshCw } from "react-icons/fi"

type ExistingMember = {
  id: string
  name: string
  email: string
  roleIds: number[]  // Change to number[]
  username?: string
  status: "active" | "suspended"
}

interface Prop {
  openDialogId: string | null
  dialogType: "remove" | "suspend" | "restore" | "addRole" | "removeRole"
  selectedRole: number  // Change to number
  setSelectedRole: Dispatch<SetStateAction<number>>  // Change to number
  roleToRemove: number  // Change to number
  setExistingMembers: Dispatch<SetStateAction<ExistingMember[]>>
  existingMembers: ExistingMember[]
  setOpenDialogId: Dispatch<SetStateAction<string | null>>
  setRoleToRemove: Dispatch<SetStateAction<number>>  // Change to number
  getAvailableRoles: (member: ExistingMember) => IRole[]
  getRoleById: (roleId: number) => IRole | undefined  // Change to number
}

const RenderDialog: React.FC<Prop> = ({
  openDialogId,
  existingMembers,
  setExistingMembers,
  setOpenDialogId,
  dialogType,
  selectedRole,
  roleToRemove,
  setSelectedRole,
  setRoleToRemove,
  getAvailableRoles,
  getRoleById
}) => {
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleRemoveMember = async (memberId: string) => {
    setActionLoading(memberId)
    try {
      setExistingMembers(existingMembers.filter((member) => member.id !== memberId))
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to remove member:", error)
    } finally {
      setActionLoading(null)
      setOpenDialogId(null)
    }
  }

  const handleSuspendMember = async (memberId: string) => {
    setActionLoading(memberId)
    try {
      setExistingMembers(
        existingMembers.map((member) => 
          member.id === memberId ? { ...member, status: "suspended" } : member
        )
      )
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to suspend member:", error)
    } finally {
      setActionLoading(null)
      setOpenDialogId(null)
    }
  }

  const handleRestoreMember = async (memberId: string) => {
    setActionLoading(memberId)
    try {
      setExistingMembers(
        existingMembers.map((member) => 
          member.id === memberId ? { ...member, status: "active" } : member
        )
      )
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to restore member:", error)
    } finally {
      setActionLoading(null)
      setOpenDialogId(null)
    }
  }

  const handleAddRole = async (memberId: string) => {
    if (!selectedRole) return

    setActionLoading(memberId)
    try {
      setExistingMembers(
        existingMembers.map((member) =>
          member.id === memberId && !member.roleIds.includes(selectedRole)
            ? { ...member, roleIds: [...member.roleIds, selectedRole] }
            : member
        )
      )
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to add role:", error)
    } finally {
      setActionLoading(null)
      setOpenDialogId(null)
      setSelectedRole(0)  // Reset to 0 (number)
    }
  }

  const handleRemoveRole = async (memberId: string, roleId: number) => {  // Change to number
    setActionLoading(memberId)
    try {
      setExistingMembers(
        existingMembers.map((member) =>
          member.id === memberId 
            ? { ...member, roleIds: member.roleIds.filter((id) => id !== roleId) } 
            : member
        )
      )
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error("Failed to remove role:", error)
    } finally {
      setActionLoading(null)
      setOpenDialogId(null)
      setRoleToRemove(0)  // Reset to 0 (number)
    }
  }

  if (!openDialogId) return null

  const member = existingMembers.find((m) => m.id === openDialogId)
  if (!member) return null

  interface DialogConfig {
    title: string
    description: string
    action: () => void
    actionText: string
    actionClass: string
    extraContent?: React.ReactNode
  }

  const dialogConfig: Record<"remove" | "suspend" | "restore" | "addRole" | "removeRole", DialogConfig> = {
    remove: {
      title: "Remove Team Member",
      description: `Are you sure you want to remove ${member.name} from your team? This action cannot be undone.`,
      action: () => handleRemoveMember(member.id),
      actionText: "Remove",
      actionClass: "bg-red-600 text-white hover:bg-red-700",
    },
    suspend: {
      title: "Suspend Team Member",
      description: `Are you sure you want to suspend ${member.name}? They will lose access to the system until restored.`,
      action: () => handleSuspendMember(member.id),
      actionText: "Suspend",
      actionClass: "bg-amber-500 text-white hover:bg-amber-600",
    },
    restore: {
      title: "Restore Team Member",
      description: `Are you sure you want to restore ${member.name}'s access?`,
      action: () => handleRestoreMember(member.id),
      actionText: "Restore",
      actionClass: "bg-green-600 text-white hover:bg-green-700",
    },
    addRole: {
      title: "Add Role to Team Member",
      description: `Select a role to add to ${member.name}.`,
      action: () => handleAddRole(member.id),
      actionText: "Add Role",
      actionClass: "bg-blue-600 text-white hover:bg-blue-700",
      extraContent: (
        <div className="my-4 relative">
          <Listbox value={selectedRole} onChange={setSelectedRole}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow-sm">
                <span className="block truncate">
                  {selectedRole ? getRoleById(selectedRole)?.name : "Select a role"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <MdKeyboardArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  {getAvailableRoles(member).map((role) => (
                    <Listbox.Option
                      key={role.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={role.id}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {role.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-blue-600" : "text-blue-600"
                              }`}
                            >
                              <BsCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      ),
    },
    removeRole: {
      title: "Remove Role from Team Member",
      description: `Are you sure you want to remove the role "${getRoleById(roleToRemove)?.name || ""}" from ${member.name}?`,
      action: () => handleRemoveRole(member.id, roleToRemove),
      actionText: "Remove Role",
      actionClass: "bg-red-600 text-white hover:bg-red-700",
    },
  }

  const config = dialogConfig[dialogType]

  return (
    <Transition appear show={!!openDialogId} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpenDialogId(null)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {config.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{config.description}</p>
                </div>

                {config.extraContent}

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setOpenDialogId(null)}
                    disabled={actionLoading === member.id}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${config.actionClass} ${
                      (dialogType === "addRole" && !selectedRole) || actionLoading === member.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={config.action}
                    disabled={actionLoading === member.id || (dialogType === "addRole" && !selectedRole)}
                  >
                    {actionLoading === member.id ? (
                      <>
                        <FiRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      config.actionText
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RenderDialog