"use client"

import { Fragment, ReactNode } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { IoClose, IoCheckmark } from "react-icons/io5"
import { ArrowLeftIcon } from "@heroicons/react/solid"

type ResetType = "email" | "password" | "complete"
interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode,
}

export function ResetModalLayout({ isOpen, onClose, children }: SuccessModalProps) {
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
              <Dialog.Panel className="w-full lg:max-w-[45%] md:max-w-[70%] transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all">
                <div className="relative p-6 pt-8 flex flex-col items-center">
                    {
                        children
                    }
                    <button
                    type="button"
                    onClick={onClose}
                    className="mt-5 rounded-sm opacity-90 transition-opacity hover:opacity-100 flex items-center gap-2 text-base text-[#2F6469] font-bold"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to login</span>
                    <span className="sr-only">Close</span>
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
