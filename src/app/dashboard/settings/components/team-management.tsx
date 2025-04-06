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
          loading ? <LoaderIcon /> : roles && <AddMmebers pendingInvites={pendingInvites} setPendingInvites={setPendingInvites} roles={roles} rolesLoading={loading} rolesError={error} />
         }
      {/* Pending Invites Section */}
      <PendingInvites  pendingInvites={pendingInvites} setPendingInvites={setPendingInvites} />
     
    </div>
  )
}

