"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { BiLoader } from "react-icons/bi"
import { Button } from "@headlessui/react"

import { useUserState } from "@/api/context/UserContext"
import { IAcceptUsersInviteInput } from "@/api/types"
import AcceptInviteForm from "./components/accept-form"

const AcceptInvitePage = () => {
  const { acceptInviteUsers } = useUserState()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [inviteStatus, setInviteStatus] = useState<"pending" | "success" | "error">("pending")

  useEffect(() => {
    const reference = searchParams.get("reference")
    const token = searchParams.get("token")

    if (!token || !reference) {
      setInviteStatus("error")
      return
    }

    localStorage.setItem("accept_token", token)

    const request: IAcceptUsersInviteInput = {
      status: "accepted",
      reference,
    }

    const checkIfUserIsPartOfOrganization = async () => {
      try {
        const response = await acceptInviteUsers(request)
        if (response) {
          console.log("response", response)
          setInviteStatus("success")
        } else {
          console.log("Invalid response")
          setInviteStatus("error")
        }
      } catch (error) {
        console.log("Error:", error)
        setInviteStatus("error")
      }
    }

    checkIfUserIsPartOfOrganization()
  }, [searchParams])

  // useEffect(() => {
  //   if (inviteStatus === "error") {
  //     router.push("/auth")
  //   }
  // }, [inviteStatus])

  // Handle success
  if (inviteStatus === "error") {
    return <AcceptInviteForm />
  }

  if (inviteStatus === "pending") {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center gap-2 justify-center">
          <h1>Searching for invites...</h1>
          <BiLoader className="animate-spin text-xl" />
        </div>
      </div>
    )
  }

}

export default AcceptInvitePage
