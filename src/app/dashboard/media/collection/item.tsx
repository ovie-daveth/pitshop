import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { IoEllipsisVertical, IoFolderOutline } from "react-icons/io5";

    const Folder = ({ name }: {name: any}) => {

      return (
        <div className="flex items-center justify-between lg:p-4 p-3 bg-gray-50 rounded-xl  mb-5">
          <div className="flex items-center text-green-900">
            <IoFolderOutline className="text-green-900 mr-2" size={24} />
            <span className="text-sm">{name}</span>
          </div>
          <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none">
              <IoEllipsisVertical className="text-green-800" size={20} />
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-green-800`}
                      >
                        Rename
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-green-800`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      );
    };

    export default Folder;