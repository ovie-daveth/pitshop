"use client"

import AddMmebers from "./add-memebers"
import PendingInvites from "./pending-invites"
import { useUserState } from "@/api/context/UserContext"
import { useRolesState } from "@/api/context/RolesContext"
import { LoaderIcon } from "react-hot-toast"


export default function TeamManagement() {
  const { invites } = useUserState();
  const { roles, loading, error } = useRolesState();



  return (
    <div className="py-6">
      {/* Team Management Content */}
         {
          loading ? <LoaderIcon /> : roles && <AddMmebers roles={roles} rolesLoading={loading} rolesError={error}  />
         }
      {/* Pending Invites Section */}
      {
        invites && <PendingInvites  pendingInvites={invites} />
      }
     
    </div>
  )
}

