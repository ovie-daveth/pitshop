"use client"

import logo from "../../../public/logo.svg";
import icon from "../../../public/logoicon.svg";
import Image from "next/image";
import ExisitingUserInvited from "./components/existingUser";
import { useState } from "react";

const AcceptInvitePage = () => {

  const [exist, setExist] = useState(false)

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-4 w-full justify-center flex">
        <div className="items-center justify-center flex flex-col lg:w-[50%] md:w-[80%] w-full px-5 md:mx-auto">
            <div className="w-full mb-10 -mt-10">
              <div className="text-[#4AE290] flex items-left gap-2">
                  <Image src={icon} alt="icon" width={50} height={50} className="w-8 h-8" />
                  <Image src={logo} alt="logo" width={150} height={150} className="w-36 mt-2" />
              </div>
            </div>
            <div className="w-full">
                <ExisitingUserInvited isExist={exist} />
            </div>
        </div>
    </main>
  )
}

export default AcceptInvitePage;
