"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useRolesState } from "@/api/context/RolesContext";
import { IRole, IPermissions } from "@/api/types";

type Permission = {
  id: number;
  name: string;
};

type PermissionGroup = {
  id: number;
  name: string;
  permissions: Permission[];
};

type Props = {
  onClose: () => void;
  selectedRole: IRole | null;
};

export default function RolePermissionsPage({ onClose, selectedRole }: Props) {
  const { permissions } = useRolesState();
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);

  // Transform permissions into grouped structure, only including assigned permissions
  const initializePermissionGroups = (
    permissions: IPermissions[] | null,
    selectedRole: IRole | null
  ): PermissionGroup[] => {
    if (!permissions || !selectedRole) return [];

    const grouped = permissions.reduce((acc, perm) => {
      const categoryName = perm.permissionCategory.name;
      const categoryId = perm.permissionCategory.id;

      // Only include permissions that the role has
      if (selectedRole.permissions.some((p) => p.id === perm.id)) {
        if (!acc[categoryName]) {
          acc[categoryName] = {
            id: categoryId,
            name: categoryName,
            permissions: [],
          };
        }

        acc[categoryName].permissions.push({
          id: perm.id,
          name: perm.name,
        });
      }

      return acc;
    }, {} as Record<string, PermissionGroup>);

    return Object.values(grouped);
  };

  // Set permission groups when selectedRole or permissions change
  useEffect(() => {
    if (selectedRole) {
      setPermissionGroups(initializePermissionGroups(permissions, selectedRole));
    }
  }, [selectedRole, permissions]);

  if (!selectedRole) return null; // Fallback if no role is selected

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header with Back Arrow */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm lg:text-base"
          >
            <FiArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h2 className="lg:text-xl text-sm font-medium text-gray-900 hidden md:block">
            Permissions for {selectedRole.name}
          </h2>
          <h2 className="lg:text-xl text-sm font-medium text-gray-900 md:hidden block">
            {selectedRole.name}
          </h2>
        </div>
        <div className="space-y-6">
          <div>
            {permissionGroups.length === 0 ? (
              <div className="text-gray-500">No permissions assigned to this role</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {permissionGroups.map((group) => (
                  <div key={group.id} className="mb-4 flex items-start lg:gap-20 justify-between lg:justify-start">
                    <h4 className="text-sm font-medium text-black">{group.name}</h4>
                    <ul className="mt-2 space-y-2 list-disc pl-5">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="text-gray-700 text-sm flex items-center">
                             <div
                            className={`w-4 h-4 rounded flex items-center justify-center mr-2  bg-blue-100 text-blue-600`}
                          >
                            <FiCheck
                              className={`h-3 w-3 opacity-100`}
                            />
                          </div>
                          {permission.name}
                        </div>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}