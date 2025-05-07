"use client"

import { useUserState } from "@/api/context/UserContext"
import { IInvites } from "@/api/types"
import { Fragment, useEffect } from "react"
import { Transition, Menu, Popover } from "@headlessui/react"
import {
  BsThreeDots,
  BsPlus,
  BsTrash,
} from "react-icons/bs"
import { AiOutlineAlert } from "react-icons/ai"
import {FiRefreshCw} from "react-icons/fi"
import {RiShieldLine, RiUserUnfollowLine, RiUserFollowLine} from "react-icons/ri"
import RenderDialog from "./dialog"


const PendingInvites = ({pendingInvites}: {pendingInvites:  IInvites[]}) => {

  const { cancelInvites, getAllInvitedUsers, resendInvitationMail } = useUserState()
    
  const cancelInvite = async (id: string) => {
    if(!id) return

    await cancelInvites({
      ref: id,
      status: "canceled"
    })
    .then(async () => {
      await getAllInvitedUsers()
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const resendMail = async (reference: string) => {
    if(!reference) return

    await resendInvitationMail(reference)
    .then(async () => {
      console.log("success")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    console.log("pendingInvites", pendingInvites)
  }, [getAllInvitedUsers])

    return (
        <div className="mt-12 pt-8 border-t flex flex-col lg:flex-row items-start justify-between">
       <div className="lg:w-[40%] w-full">
        <h2 className="lg:text-2xl text-lg font-medium text-gray-800 mb-2">Pending Invites</h2>
        <p className="text-gray-500 mb-6 sm:text-sm text-xs">Users that have not yet responded to your invitation</p>
       </div>

        {pendingInvites.length > 0 ? (
          <div className="border rounded-lg shadow-sm lg:w-[55%] w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex md:flex-row flex-col lg:items-center items-left sm:justify-between justify-end p-4 border-b last:border-b-0">
                <div className="flex items-center text-left">
                <span className="text-gray-800 sm:text-md text-sm sm:break-normal break-words">{invite.email}</span>
                <span className="ml-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hidden md:flex">Pending...</span>
                </div>
               <div className="flex flex-row-reverse items-end justify-between w-full gap-2">
               <span className="ml-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex md:hidden">Pending...</span>
               <div className="flex">
                  
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
                      <BsThreeDots className="h-4 w-4 text-gray-500" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-1 py-1">     
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-green-600`}
                                onClick={() => {
                                  resendMail(invite.reference)
                                }}
                              >
                                <RiUserFollowLine className="h-4 w-4 mr-2" />
                                Resend Invite
                              </button>
                            )}
                          </Menu.Item>
                       
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100" : ""
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                              onClick={() => {
                                cancelInvite(invite.reference)
                              }}
                            >
                              <BsTrash className="h-4 w-4 mr-2" />
                              Cancel Invite
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
               </div>
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