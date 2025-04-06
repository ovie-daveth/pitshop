"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FiArrowLeft, FiCheck, FiSave } from "react-icons/fi";

type Role = {
  id: string;
  name: string;
  access: string[];
};

type Permission = {
  id: string;
  name: string;
  checked: boolean;
};

type PermissionGroup = {
  id: string;
  name: string;
  permissions: Permission[];
};

export default function PermissionsView({
  setShowEditView,
  setSelectedRole,
  selectedRole,
  showEditView,
  isCreating = false, // New prop to indicate create mode
}: {
  setShowEditView: Dispatch<SetStateAction<boolean>>;
  setSelectedRole: Dispatch<SetStateAction<Role | null>>;
  showEditView: boolean;
  selectedRole: Role | null;
  isCreating?: boolean;
}) {
  // Initialize permissions based on mode (create or edit)
  const initialPermissions = [
    {
      id: "dashboard",
      name: "Dashboard",
      permissions: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `dashboard-${i}`,
          name: "Google Ads (Full Access)",
          checked: isCreating ? false : true, // Unchecked for create mode
        })),
    },
    {
      id: "integrations",
      name: "Integrations",
      permissions: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `integrations-${i}`,
          name: "Google Ads (Full Access)",
          checked: isCreating ? false : true, // Unchecked for create mode
        })),
    },
  ];

  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>(initialPermissions);

  const handleGoBack = () => {
    setShowEditView(false);
    setSelectedRole(null);
  };

  const togglePermission = (groupId: string, permissionId: string) => {
    setPermissionGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              permissions: group.permissions.map((permission) =>
                permission.id === permissionId
                  ? { ...permission, checked: !permission.checked }
                  : permission,
              ),
            }
          : group,
      ),
    );
  };

  const handleSave = () => {
    if (!selectedRole) return;

    // Collect all checked permissions
    const updatedAccess: string[] = [];
    permissionGroups.forEach((group) => {
      group.permissions.forEach((permission) => {
        if (permission.checked) {
          updatedAccess.push(`${group.id}:${permission.name}`);
        }
      });
    });

    // Update the role with new permissions
    const updatedRole: Role = {
      ...selectedRole,
      access: updatedAccess,
    };

    // In a real app, you'd save this to a backend
    console.log("Saving role:", updatedRole);

    // Update the selected role and go back
    setSelectedRole(updatedRole);
    setShowEditView(false);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <FiArrowLeft className="mr-2" />
          <span className="sr-only">Go back</span>
        </button>

        {/* Show Save button only in create mode */}
        {isCreating && (
          <button
            onClick={handleSave}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            <FiSave className="mr-2" />
            Save
          </button>
        )}
      </div>

      <div className="mb-8">
        <h2 className="xl:text-2xl lg:text-xl text-base font-medium text-gray-800">
          {selectedRole && selectedRole.name}
          {isCreating ? " - Create New Role" : "'s Permissions"}
        </h2>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm ">
          {isCreating
            ? "Set permissions for the new role"
            : "You can view permissions for this User role"}
        </p>
      </div>

      {permissionGroups.map((group) => (
        <div key={group.id} className="mb-12 flex flex-row xl:gap-32 md:gap-16 gap-10  w-full">
          <h3 className="sm:text-lg font-medium text-black mb-6">{group.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {group.permissions.map((permission) => (
              <div key={permission.id} className="flex items-center">
                <div
                  className={`sm:w-5 sm:h-5 w-4 h-4 rounded flex items-center justify-center mr-2 cursor-pointer ${
                    permission.checked ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                  onClick={() => togglePermission(group.id, permission.id)}
                >
                  <FiCheck className={`h-3 w-3 ${permission.checked ? "opacity-100" : "opacity-0"}`} />
                </div>
                <span className="text-gray-700 text-sm sm:text-base">{permission.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}