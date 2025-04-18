"use client";

import { useState, useEffect } from "react";
import { useRolesState } from "@/api/context/RolesContext";
import { IRole, IPermissions } from "@/api/types";
import LoadingState from "./role_management/loading-state";
import CreateRoleButton from "./role_management/create-role-btn";
import RolesList from "./role_management/role-list";
import CreateRoleModal from "./role_management/create-role-modal";
import EditRolePage from "./role_management/edit-role-modal";
import RolePermissionsPage from "./role_management/view-permissin";


export default function RolesManagement() {
  const { roles: data, permissions } = useRolesState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isPermissionsViewOpen, setIsPermissionsViewOpen] = useState(false);

  useEffect(() => {
    console.log("the permissions", permissions);
    if (Array.isArray(data)) {
      setRoles(data);
    }
  }, [data]);

  const handleCreateRole = () => {
    console.log("roles role management", data);
    setIsModalOpen(true);
  };

  const handleEditRole = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setIsCreating(false);
      setSelectedRole(role);
      setIsEditModalOpen(true);
    }
  };

  const handleEditPermission = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setShowEditView(true);
    }
  };

  const handleRoleSave = (updatedRole: IRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
    setSelectedRole(null);
  };

  const handleDuplicateRole = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setIsPermissionsViewOpen(true);
    }
  };

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleAddPermission = () => {
    setIsCreating(true);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedRole(roles[0] || null);
    setShowEditView(true);
  };

  if (!data) {
    return <LoadingState />;
  }

  if(isEditModalOpen){
    return  <EditRolePage
    onClose={() => setIsEditModalOpen(false)}
    onSave={handleRoleSave}
    selectedRole={selectedRole}
  />
  }

  if(isModalOpen){
    return <CreateRoleModal onClose={() => setIsModalOpen(false)} onSave={handleAddPermission} />
  }

  if (isPermissionsViewOpen) {
    return (
      <RolePermissionsPage
        onClose={() => setIsPermissionsViewOpen(false)}
        selectedRole={selectedRole}
      />
    );
  }

  return (
    <div className="py-6">
      <CreateRoleButton onClick={handleCreateRole} />
      <RolesList
        roles={roles}
        permissions={permissions}
        onEditRole={handleEditRole}
        onEditPermission={handleEditPermission}
        openViewPermissions={handleDuplicateRole}
        onDeleteRole={handleDeleteRole}
      />
    </div>
  );
}

// const handleDuplicateRole = (roleId: number) => {
//   const roleToDuplicate = roles.find((role) => role.id === roleId);
//   if (roleToDuplicate) {
//     const newRole: IRole = {
//       id: roleId, // Note: In a real app, you'd generate a unique ID
//       name: `${roleToDuplicate.name} (Copy)`,
//       updatedAt: "",
//       description: "",
//       type: "",
//       external: false,
//       permissions: [],
//     };
//     setRoles([...roles, newRole]);
//   }
// };