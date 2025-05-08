"use client"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { Fragment, useState } from "react"
import { FaCloudDownloadAlt } from "react-icons/fa"
import UploadMediaForm from "./upload-form"

const AssetActions = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    return (
        <>
            <div className="flex space-x-2">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button as="div">
            <button className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-green-700 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-green-800">
              Import asset
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      From computer
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      From URL
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
        onClick={openModal}
          type="button"
          className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white primary-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 gap-3"
        >
          <FaCloudDownloadAlt size={20} />
         Upload assets
        </button>
      </div>

      {
        isOpenModal && <UploadMediaForm setIsOpenModal={setIsOpenModal} />
      }
        </>
    )
}


export default AssetActions