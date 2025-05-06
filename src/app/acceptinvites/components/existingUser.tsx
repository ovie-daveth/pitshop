import { Button } from "@headlessui/react"
import Link from "next/link"

const ExisitingUserInvited = () => {

    return (
        <div className="w-[550px] rounded-3xl bg-white p-8 shadow-sm space-y-16 text-gray-800">
          <div>
            <h1 className="mb-3 text-center text-2xl font-semibold">Welcome!</h1>
            <p className="mb-6 text-center font-normal">
                You&apos;ve been invited to join <strong className="font-bold">Brent Hub</strong> as a <strong className="font-bold">collaborator</strong>
            </p>
          </div>
  
          <div className="mb-6 text-center w-[70%] mx-auto">
            <p className="mb-4 font-normal">Your email is already signed to an existing Plumetrix account</p>
          </div>
  
         <div className="text-center font-normal">
         <p>Please sign in to complete your invitation and join the company with your existing Plumetrix account</p>
          <Button
            className="mt-8 block w-full rounded-full bg-teal-700 py-4 text-center text-white hover:bg-teal-800"
          >
            Sign in to accept
          </Button>
         </div>
      </div>
    )
}

export default ExisitingUserInvited