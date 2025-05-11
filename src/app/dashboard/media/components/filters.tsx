import { Menu } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

interface FiltersProps {
  onFilterChange: (status: string) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-sm text-gray-500">
        <CiFilter className="text-lg text-black" />
        Filter:
      </div>
      <Menu as="div" className="relative z-50">
        <Menu.Button className="text-green-800 text-sm font-bold flex items-center gap-1">
          <span>Both</span>
          <BiChevronDown className="text-green-800" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => onFilterChange("all")}
          >
            All
          </div>
          <div
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => onFilterChange("success")}
          >
            Successful
          </div>
          <div
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => onFilterChange("failed")}
          >
            Failed
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Filters;