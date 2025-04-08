"use client"

import { Dispatch, SetStateAction } from "react"

type PendingInvite = {
    id: string
    email: string
  }

const PendingInvites = ({pendingInvites, setPendingInvites}: {pendingInvites:  PendingInvite[], setPendingInvites: Dispatch<SetStateAction<PendingInvite[]>>}) => {

    
  const cancelInvite = (id: string) => {
    setPendingInvites(pendingInvites.filter((invite) => invite.id !== id))
  }

    return (
        <div className="mt-12 pt-8 border-t flex flex-col lg:flex-row items-start justify-between">
       <div className="lg:w-[40%] w-full">
        <h2 className="lg:text-2xl text-lg font-medium text-gray-800 mb-2">Pending Invites</h2>
        <p className="text-gray-500 mb-6 sm:text-sm text-xs">Users that have not yet responded to your invitation</p>
       </div>

        {pendingInvites.length > 0 ? (
          <div className="border rounded-lg overflow-hidden shadow-sm lg:w-[55%] w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex md:flex-row flex-col lg:items-center items-left sm:justify-between justify-end p-4 border-b last:border-b-0">
                <div className="flex items-center text-left">
                <span className="text-gray-800 sm:text-md text-sm sm:break-normal break-words">{invite.email}</span>
                <span className="ml-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hidden md:flex">Pending...</span>
                </div>
               <div className="flex flex-row-reverse items-end justify-between w-full gap-2">
               <span className="ml-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex md:hidden">Pending...</span>
                <button
                  onClick={() => cancelInvite(invite.id)}
                  className="text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium sm:mt-0 mt-5 sm:text-md dm:text-sm text-xs"
                >
                  Cancel Invite
                </button>
               </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 md:w-[55%] w-full">No pending invites</div>
        )}
      </div>
    )
}

export default PendingInvites