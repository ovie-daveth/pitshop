"use client";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IPermissions, IRole } from "@/api/types";
import MenuButton from "./menu-btn";
import PermissionsModal from "./permission-modal";

type Props = {
  role: IRole;
  permissions: IPermissions[] | null;
  onEditRole: (roleId: number) => void;
  onEditPermission: (roleId: number) => void;
  openViewPermissions: (roleId: number) => void;
  onDeleteRole: (roleId: number) => void;
};

export default function RoleRow({
  role,
  permissions,
  onEditRole,
  onEditPermission,
  openViewPermissions,
  onDeleteRole,
}: Props) {
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);

  const getPermissionNames = (permissionIds: number[]) => {
    if (!permissions || !Array.isArray(permissions) || !permissionIds || !Array.isArray(permissionIds)) {
      return "No permissions";
    }
    const permissionNames = permissionIds
      .map((id) => permissions.find((perm) => perm.id === id)?.name)
      .filter(Boolean);
    return permissionNames.length > 0 ? permissionNames.join(", ").toLowerCase() : "No permissions";
  };

  const permissionNames = getPermissionNames(role.permissions.map((x) => x.id) as number[]);

  return (
    <div className="grid grid-cols-2 py-4 px-6 border-b last:border-b-0 text-xs sm:text-base">
      <div className="font-medium text-gray-800">{role.name}</div>
      <div className="flex items-center justify-between">
        <div className="text-gray-700">{role.description}</div>
        <Menu as="div" className="relative inline-block text-left z-10">
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
                <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onEditRole(role.id)}
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
                          onClick={() => openViewPermissions(role.id)}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } flex w-full items-center px-4 py-2 text-sm`}
                        >
                          View Permissions
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onDeleteRole(role.id)}
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

      {/* Permissions Modal */}
      <PermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        permissionNames={permissionNames}
      />
    </div>
  );
}


// <div className="flex items-center hidden md:flex">
// <button
//   onClick={() => setIsPermissionsModalOpen(true)}
//   className="text-gray-700 hover:text-gray-900 bg-transparent border-none p-0 cursor-pointer hidden md:block"
// >
//   Show Category
// </button>
// {/* <div className="text-gray-700 md:hidden">{permissionNames}</div> */}
// </div>