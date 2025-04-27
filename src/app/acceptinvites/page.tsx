"use client"

import logo from "../../../public/logo.svg";
import icon from "../../../public/logoicon.svg";
import Image from "next/image";
import ExisitingUserInvited from "./components/existingUser";
import { useState } from "react";

const AcceptInvitePage = () => {

  const [exist, setExist] = useState(true)

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-4 w-full justify-center flex">
         <div className="text-[#4AE290] flex items-left gap-2 md:ml-40 -mt-28 mb-20">
                <Image src={icon} alt="icon" width={50} height={50} className="w-8 h-8" />
                <Image src={logo} alt="logo" width={150} height={150} className="w-36 mt-2" />
              </div>
      <div className="items-center justify-center flex">
      {
        exist ? <ExisitingUserInvited /> : ""
      }
      </div>
    </main>
  )
}

export default AcceptInvitePage;
