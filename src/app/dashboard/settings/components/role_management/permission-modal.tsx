"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  permissionNames: string; // Comma-separated string of permission names
};

export default function PermissionsModal({ isOpen, onClose, permissionNames }: Props) {
  const permissionsList = permissionNames === "No permissions" ? [] : permissionNames.split(", ");

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Permissions
                </Dialog.Title>
                <div className="mt-4">
                  {permissionsList.length === 0 ? (
                    <p className="text-gray-500">No permissions assigned</p>
                  ) : (
                    <ul className="list-disc pl-5 space-y-2">
                      {permissionsList.map((permission, index) => (
                        <li key={index} className="text-gray-700 text-sm">
                          {permission}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}