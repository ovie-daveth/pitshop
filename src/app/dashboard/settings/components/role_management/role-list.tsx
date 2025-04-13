"use client";

import { IPermissions, IRole } from "@/api/types";
import RoleRow from "./role-row";

type Props = {
  roles: IRole[];
  permissions: IPermissions[] | null;
  onEditRole: (roleId: number) => void;
  onEditPermission: (roleId: number) => void;
  openViewPermissions: (roleId: number) => void;
  onDeleteRole: (roleId: number) => void;
};

export default function RolesList({
  roles,
  permissions,
  onEditRole,
  onEditPermission,
  openViewPermissions,
  onDeleteRole,
}: Props) {
  return (
    <div className="border rounded-lg shadow-sm">
      <div className="grid  grid-cols-2 py-4 px-6 bg-gray-50 border-b text-xs sm:text-base">
        <div className="font-medium text-gray-600">Roles</div>
        {/* <div className="font-medium text-gray-600 hidden md:flex">Category</div> */}
        <div className="font-medium text-gray-600">Description</div>
      </div>
      {roles.map((role) => (
        <RoleRow
          key={role.id}
          role={role}
          permissions={permissions}
          onEditRole={onEditRole}
          onEditPermission={onEditPermission}
          openViewPermissions={openViewPermissions}
          onDeleteRole={onDeleteRole}
        />
      ))}
    </div>
  );
}