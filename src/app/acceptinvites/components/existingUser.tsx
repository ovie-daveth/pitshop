import { Button } from "@headlessui/react"
import Link from "next/link"

const ExisitingUserInvited = (isExist: {isExist: boolean}) => {

    return (
        <div className="md:w-[550px] w-full rounded-3xl bg-white p-8 shadow-sm space-y-16 text-gray-800">
          <div>
            <h1 className="mb-3 text-center text-2xl font-semibold">Welcome!</h1>
            <p className="mb-6 text-center font-normal">
                You&apos;ve been invited to join <strong className="font-bold">Brent Hub</strong> as a <strong className="font-bold">collaborator</strong>
            </p>
          </div>
  
          <div className="mb-6 text-center  mx-auto">
            {!isExist ? <p className="mb-4 font-normal">Your email is already signed to an existing Plumetrix account</p> : <p>Plumetrix empowers teams and individuals to streamline campaign workflows. No chaos, just clarity.</p>}
          </div>
  
         <div className="text-center font-normal">
         {!isExist ? <p>Please sign in to complete your invitation and join the company with your existing Plumetrix account</p> : <p>We couldn't find this email in our system. To accept the invite, please sign up using feranmiajayi161@gmail.com</p>}
         {
          !isExist ?  <Button
          className="mt-8 block w-full rounded-full bg-teal-700 py-4 text-center text-white hover:bg-teal-800"
        >
          Sign in to accept
        </Button> : <div className="flex flex-col gap-3">
        <Button
            className="mt-8 block w-full rounded-full bg-teal-700 py-4 text-center text-white hover:bg-teal-800"
          >
            Accept invite
          </Button>
          <Button
            className="block w-full rounded-full text-teal-700 py-4 text-center text-white"
          >
            Decline invite
          </Button>
        </div>
         }
         </div>
      </div>
    )
}

export default ExisitingUserInvited