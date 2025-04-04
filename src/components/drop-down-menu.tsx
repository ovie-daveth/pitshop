"use client";

import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon, BuildingOfficeIcon } from "@heroicons/react";
import { Fragment } from "react";
import { ChevronDownIcon, OfficeBuildingIcon } from "@heroicons/react/solid";

const BranchDropdown = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <div className="relative w-fit">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center gap-3 p-2 bg-white shadow-md rounded-lg w-64">
          <OfficeBuildingIcon className="h-6 w-6 text-blue-500" />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">The Honey Branch</p>
            <p className="text-xs text-gray-500">Business</p>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-gray-600" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } w-full text-left px-3 py-2 rounded-md`}
                >
                  Dashboard
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onMouseEnter={() => setOpenSubmenu("settings")}
                  onMouseLeave={() => setOpenSubmenu(null)}
                  className="relative w-full text-left px-3 py-2 rounded-md flex justify-between items-center"
                >
                  Settings
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  {openSubmenu === "settings" && (
                    <div className="absolute left-full top-0 mt-0 ml-2 w-48 bg-white shadow-lg rounded-lg p-2">
                      <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">
                        Profile
                      </button>
                      <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">
                        Notifications
                      </button>
                      <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100">
                        Security
                      </button>
                    </div>
                  )}
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-3 py-2 rounded-md`}>
                  Reports
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button className={`${
                  active ? "bg-gray-100" : ""
                } w-full text-left px-3 py-2 rounded-md`}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default BranchDropdown;
