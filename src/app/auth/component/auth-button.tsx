import { ArrowRightIcon, ArrowSmRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { BiLoader } from 'react-icons/bi'

const AuthButton = ({isLoading, disabled, title}: {isLoading: boolean, disabled: boolean, title: string}) => {
  return (
    <button
        disabled={isLoading || disabled}
          type="submit"
          className={`w-full text-white py-2 rounded-lg mt-4  ${disabled ? "bg-blue-300 hover:bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          {
            isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <BiLoader />
                Connecting...
              </div>
            ) : (
              <span className="flex items-center justify-center gap-1">
                {title}
                <ArrowSmRightIcon className="w-5 h-5 inline-block" />
              </span>
            )
          }
        </button>
  )
}

export default AuthButton