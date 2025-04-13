"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck, FiRefreshCw } from "react-icons/fi";
import { useRolesState } from "@/api/context/RolesContext";
import { IRole, IPermissions } from "@/api/types";
import toast from "react-hot-toast"; // Optional: for error feedback

type Permission = {
  id: number;
  name: string;
  checked: boolean;
};

type PermissionGroup = {
  id: number;
  name: string;
  permissions: Permission[];
};

type Props = {
  onClose: () => void;
  onSave: (role: IRole) => void;
};

export default function CreateRolePage({ onClose, onSave }: Props) {
  const { permissions, createRoles } = useRolesState(); // Assuming createRoles exists; adjust if different

  // Form state for a new role
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [loadingState, setLoadingState] = useState(false);

  // Transform permissions into grouped structure with all unchecked by default
  const initializePermissionGroups = (permissions: IPermissions[] | null): PermissionGroup[] => {
    if (!permissions) return [];

    const grouped = permissions.reduce((acc, perm) => {
      const categoryName = perm.permissionCategory.name;
      const categoryId = perm.permissionCategory.id;

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
        checked: false, // New role, so no permissions are checked by default
      });

      return acc;
    }, {} as Record<string, PermissionGroup>);

    return Object.values(grouped);
  };

  // Initialize permissions when permissions data changes
  useEffect(() => {
    setPermissionGroups(initializePermissionGroups(permissions));
  }, [permissions]);

  const togglePermission = (groupId: number, permissionId: number) => {
    setPermissionGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              permissions: group.permissions.map((permission) =>
                permission.id === permissionId
                  ? { ...permission, checked: !permission.checked }
                  : permission
              ),
            }
          : group
      )
    );
  };

  const handleSave = async () => {
    if (!permissions || !roleName) {
      toast.error("Role name is required");
      return;
    }

    setLoadingState(true);
    const checkedPermissionIds = permissionGroups
      .flatMap((group) => group.permissions)
      .filter((perm) => perm.checked)
      .map((perm) => perm.id);

    const payload = {
      name: roleName,
      description: roleDescription,
      permissions: checkedPermissionIds,
    };

    try {
      const response = await createRoles(payload); // Replace with your actual create API call
      if (response) {
        // const newRole: IRole = {
        //   id: response || Date.now(), // Use backend ID if provided, else temporary
        //   name: roleName,
        //   description: roleDescription,
        //   permissions: permissions.filter((perm) => checkedPermissionIds.includes(perm.id)),
        //   updatedAt: new Date().toISOString(), // Add default fields as needed
        //   type: "", // Adjust based on your IRole type
        //   external: false,
        // };

        // onSave(newRole);
        setLoadingState(false);
        onClose(); // Navigate back by closing the page
        console.log("Role created:", response);
      } else {
        setLoadingState(false);
        toast.error("Failed to create role: No response from server");
      }
    } catch (error) {
      console.error("Failed to create role:", error);
      setLoadingState(false);
      toast.error("Failed to create role");
    }
  };

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
          <h2 className="lg:text-xl text-sm font-medium text-gray-900">Create New Role</h2>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Role name"
              className="w-full py-2 border border-gray-300 rounded-sm px-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Role Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role Description</label>
            <input
              type="text"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Role description"
              className="w-full py-2 border border-gray-300 rounded-sm px-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Permissions Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
            {permissionGroups.length === 0 ? (
              <div className="text-gray-500">Loading permissions...</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {permissionGroups.map((group) => (
                  <div key={group.id} className="mb-4 flex items-start md:justify-start justify-between md:gap-20">
                    <h4 className="text-sm font-medium text-black">{group.name}</h4>
                    <div className="mt-2 space-y-2 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center mr-2 cursor-pointer ${
                              permission.checked
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => togglePermission(group.id, permission.id)}
                          >
                            <FiCheck
                              className={`h-3 w-3 ${
                                permission.checked ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </div>
                          <span className="text-gray-700 text-sm">{permission.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleSave}
            disabled={loadingState}
          >
            {loadingState ? (
              <FiRefreshCw className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}