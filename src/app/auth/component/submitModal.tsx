"use client"

import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { IoClose, IoCheckmark } from "react-icons/io5"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onGetStarted: () => void
}

export function SuccessModal({ isOpen, onClose, onGetStarted }: SuccessModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all">
                <div className="relative p-6 pt-8 flex flex-col items-center">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    <IoClose className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>

                  <div className="bg-teal-800 rounded-full p-4 mb-4">
                    <IoCheckmark className=" text-white font-extrabold" size={30} />
                  </div>

                  <Dialog.Title as="h2" className="text-lg font-semibold mb-5">
                    Account Setup Successfully
                  </Dialog.Title>

                  <p className="text-center text-gray-500 mb-6 text-sm font-light">
                    Awesome! Your account is good to go and your workspace is all set. Let&apos;s create some cool
                    stuff!
                  </p>

                  <button
                  type="button"
                    onClick={onGetStarted}
                    className="w-full py-4 primary-800 hover:bg-teal-800 text-white rounded-full transition-colors lg:text-sm text-xs"
                  >
                    Get started
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
