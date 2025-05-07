"use client"

import { useUserState } from "@/api/context/UserContext";
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation";

const InviteError = ({message, CheckUser, setIsChecking, setIsERROR}: {message: string, CheckUser: () => void, setIsChecking: Dispatch<SetStateAction<boolean>>, setIsERROR:  Dispatch<SetStateAction<boolean>>}) => {

    const router = useRouter()
    const handleRetry = () => {
        setIsChecking(true)
        setIsERROR(false)
        CheckUser()
    }


    const handleSignUp = () => {
        router.push("/auth")
    }
    return (
        <div className="flex  justify-center items-center h-screen w-[80%] ">
                <div className="flex flex-col items-center gap-5 w-full">
                    <div className="bg-red-600 rounded-full text-white p-4 flex items-center justify-center h-20 w-20 text-4xl">
                        X
                    </div>
                    {message}

                    <div className="w-full flex gap-3">
                        <button className={`w-full text-white py-3 rounded-full mt-4 primary-800`} onClick={handleRetry}>Try again</button>
                        
                        <button className={`w-full text-white py-3 rounded-full mt-4 primary-800`} onClick={handleSignUp}>Go Home</button>
                        
                    </div>
                </div>
        </div>
    )
}

export default InviteError