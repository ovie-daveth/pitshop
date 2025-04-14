"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

export default function UserDropdown() {
  const user = {
    name: "Israel Adegbulugbe",
    email: "adegbulugbeisrael@gmail.com",
    initials: "IA",
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
        <Menu.Button className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-full">
            {user.initials}
          </div>
          <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} block px-4 py-2 text-sm`}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} block px-4 py-2 text-sm`}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
