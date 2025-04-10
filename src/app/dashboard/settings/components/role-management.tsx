"use client"

import type React from "react"
import { useState, Fragment, forwardRef, useEffect } from "react"
import { Menu, Transition, Dialog, Input } from "@headlessui/react"
import { FiPlus, FiMoreHorizontal, FiArrowLeft, FiCheck, FiRefreshCw } from "react-icons/fi"
import PermissionsView from "./show-permission"
import { useRolesState } from "@/api/context/RolesContext"
import { IPermissions, IRole } from "@/api/types"

// Create a forwardRef wrapper for the Menu.Button
const MenuButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <button
    ref={ref}
    type="button"
    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
    {...props}
  >
    <FiMoreHorizontal className="h-5 w-5 text-gray-500" />
  </button>
))
MenuButton.displayName = "MenuButton"

export default function RolesManagement() {
  const { roles: data, permissions } = useRolesState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEditView, setShowEditView] = useState(false)
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null)
  const [roles, setRoles] = useState<IRole[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateRole = () => {
    console.log("roles role management", data)
    setIsModalOpen(true) // Uncomment this to show the modal
  }

  const handleEditRole = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId)
    if (role) {
      setIsCreating(false)
      setSelectedRole(role)
      setShowEditView(true)
    }
  }

  useEffect(() => {
    console.log("the permissions", permissions)
    // Only set roles if data is an array
    if (Array.isArray(data)) {
      setRoles(data)
    }
  }, [data]) // Depend on data, not roles

  const handleDuplicateRole = (roleId: number) => {
    const roleToDuplicate = roles.find((role) => role.id === roleId)
    if (roleToDuplicate) {
      const newRole: IRole = {
        id: roleId, // Note: In a real app, you'd generate a unique ID
        name: `${roleToDuplicate.name} (Copy)`,
        updatedAt: "",
        description: "",
        type: "",
        external: false,
        permissions: []
      }
      setRoles([...roles, newRole])
    }
  }

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const handleAddPermission = () => {
    setIsCreating(true)
    setIsModalOpen(false)
    setSelectedRole(roles[0] || null) // Fallback to null if roles is empty
    setShowEditView(true)
  }

  // Function to get permission names for a role
  const getPermissionNames = (permissionIds: number[]) => {
    if (!permissions || !Array.isArray(permissions) || !permissionIds || !Array.isArray(permissionIds)) {
      return "No permissions"
    }
    const permissionNames = permissionIds
      .map((id) => permissions.find((perm: IPermissions) => perm.id === id)?.name)
      .filter(Boolean)
    return permissionNames.length > 0 ? permissionNames.join(", ") : "No permissions"
  }

  // Render the edit view
  if (showEditView && selectedRole) {
    return (
      <PermissionsView 
        showEditView={showEditView} 
        setShowEditView={setShowEditView} 
        setSelectedRole={setSelectedRole} 
        selectedRole={selectedRole} 
        isCreating={isCreating}
      />
    )
  }

  // Render loading state if roles data isn't ready
  if (!data) {
    return (
      <div className="flex justify-center items-center py-12">
        <FiRefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  // Render the main roles list view
  return (
    <div className="py-6">
      <div className="flex justify-end mb-8">
        <button
          onClick={handleCreateRole}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs sm:text-sm lg:text-base"
        >
          <FiPlus className="h-5 w-5 mr-2" />
          <span className="hidden lg:block">Create New Role</span>
          <span className="block lg:hidden">New</span>
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-2 py-4 px-6 bg-gray-50 border-b text-xs sm:text-base">
          <div className="font-medium text-gray-600">Roles</div>
          <div className="font-medium text-gray-600">Access</div>
        </div>

        {/* Role rows */}
        {roles.map((role) => (
          <div key={role.id} className="grid grid-cols-2 py-4 px-6 border-b last:border-b-0 text-xs sm:text-base">
            <div className="font-medium text-gray-800">{role.name}</div>
            <div className="flex items-center justify-between">
              <div className="text-gray-700">{getPermissionNames(role.permissions.map(x => {return x.id}) as number[])}</div>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button as={MenuButton} />
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleEditRole(role.id)}
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Edit Role
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDuplicateRole(role.id)}
                                className={`${
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                } flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Duplicate Role
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDeleteRole(role.id)}
                                className={`${
                                  active ? "bg-red-50 text-red-700" : "text-red-600"
                                } flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Delete Role
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Create New Role
                  </Dialog.Title>
                  <div className="mt-4">
                    <Input type="text" placeholder="Role name" className="w-full py-2 border rounded-sm p-2 outline-none focus:border" />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={handleAddPermission}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}