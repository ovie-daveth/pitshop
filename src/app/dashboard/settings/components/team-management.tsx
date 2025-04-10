"use client"

import { useEffect, useState} from "react"
import AddMmebers from "./add-memebers"
import PendingInvites from "./pending-invites"
import { useUserState } from "@/api/context/UserContext"
import { useRolesState } from "@/api/context/RolesContext"
import { LoaderIcon } from "react-hot-toast"

type PendingInvite = {
  id: string
  email: string
}

const mockRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all system features",
    permissions: ["read", "write", "delete", "manage_users"],
    external: false,
    type: "system",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Editor",
    description: "Can edit and publish content",
    permissions: ["read", "write"],
    external: false,
    type: "content",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Viewer",
    description: "Read-only access to content",
    permissions: ["read"],
    external: false,
    type: "content",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Billing Manager",
    description: "Manage billing and subscriptions",
    permissions: ["read", "manage_billing"],
    external: true,
    type: "finance",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: " Manager",
    description: "Manage billing and subscriptions",
    permissions: ["read", "manage_billing"],
    external: true,
    type: "finance",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Billing ",
    description: "Manage billing and subscriptions",
    permissions: ["read", "manage_billing"],
    external: true,
    type: "finance",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

export default function TeamManagement() {
  const { invites } = useUserState();
  const { roles, loading, error } = useRolesState();

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([
   
  ])

 useEffect(() => {
  console.log("invite", invites)
  if(invites){
    const fetchedInvites = invites.map((member) => ({
      id: member.id,
      email: member.email,
    })).filter((member): member is { id: string; email: string } => member !== null);

    setPendingInvites([...pendingInvites, ...fetchedInvites || []]);
  // UI is already updated, so no rollback needed; UserContext handles toast errors
   }
 }, [roles])

  return (
    <div className="py-6">
      {/* Team Management Content */}
         {
          loading ? <LoaderIcon /> : roles && <AddMmebers pendingInvites={pendingInvites} setPendingInvites={setPendingInvites} roles={mockRoles} rolesLoading={loading} rolesError={error}  />
         }
      {/* Pending Invites Section */}
      <PendingInvites  pendingInvites={pendingInvites} setPendingInvites={setPendingInvites} />
     
    </div>
  )
}

