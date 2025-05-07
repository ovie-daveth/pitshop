"use client"

import { Button } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/solid"
import { IoAdd, IoCreate } from "react-icons/io5"


interface BusinessListProps {
  onCreateNew: () => void
  onEdit: (business: { id: number; name: string }) => void
}


export default function BusinessList({ onCreateNew, onEdit }: BusinessListProps) {
  const businesses = [
    { id: 1, name: "The Honey branch" },
    { id: 2, name: "Great works" },
    { id: 3, name: "Fusion 360" },
    { id: 4, name: "The merchant store" },
  ]

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="lg:text-xl text-lg font-medium text-gray-900">Businesses</h2>
        <Button onClick={onCreateNew} className="w-fit bg-blue-600 hover:bg-blue-700 h-11 text-white rounded-md lg:flex hidden items-center justify-center px-5">
          Create New Business
        </Button>
        <Button onClick={onCreateNew} className="w-fit bg-blue-600 hover:bg-blue-700 h-11 text-white rounded-md lg:hidden flex items-center justify-center px-3">
          <IoAdd size={20} />
          New
        </Button>
      </div>

      <div className="overflow-hidden rounded-md">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-300 h-12">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name of Business
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Access
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {businesses.map((business) => (
              <tr className="border-b border-gray-200 h-16" key={business.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">{business.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                   onClick={() => onEdit(business)}
                    className="text-blue-600 hover:text-blue-900 flex items-end justify-end gap-1 w-full"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
