"use client";

import { FiPlus } from "react-icons/fi";

type Props = {
  onClick: () => void;
};

export default function CreateRoleButton({ onClick }: Props) {
  return (
    <div className="flex justify-end mb-8">
      <button
        onClick={onClick}
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs sm:text-sm lg:text-base"
      >
        <FiPlus className="h-5 w-5 mr-2" />
        <span className="hidden lg:block">Create New Role</span>
        <span className="block lg:hidden">New</span>
      </button>
    </div>
  );
}