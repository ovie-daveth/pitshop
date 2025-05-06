"use client"
import { useStep } from "@/states/stepContext";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { Step } from "../type";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineMail } from "react-icons/ai";
import google from "../../../../public/images/google.png"
import Image from "next/image";

const WelcomeForm = ({setStepIndex, setCurrentStep}: {setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>}) => {

    const handleNextStep = () => {
          setCurrentStep("personal-info")
          setStepIndex(1)
      }

    return (
        <div className="w-full">
              <div className="space-y-8">
              <div className="text-left">
          <h1 className="lg:text-3xl text-xl font-bold">Get started</h1>
          <p className="mt-2 text-gray-600 lg:text-base text-sm">
            Welcome to Plumetrix! Let's kick things off by setting up your account.
          </p>
        </div>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-4 px-4 text-gray-700 hover:bg-gray-50 transition-colors text-lg">
                 <Image src={google.src} height={17} width={17} alt="icon" className="" />
                  <span>Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full flex items-center justify-center gap-4 bg-[#3A6B6B] rounded-full py-4 px-4 text-white hover:bg-[#2A5B5B] transition-colors text-lg"
                >
                    <span><AiOutlineMail size={23} /></span>
                  <span>Continue with email</span>
                </button>

                <p className="text-xs text-center text-gray-500">
                  By creating an account you have agreed to{" "}
                  <Link href="#" className="text-[#3A6B6B] hover:underline">
                    Plumetrix Terms & Privacy Policy
                  </Link>
                </p>
              </div>  
        </div>
    )
}

export default WelcomeForm;