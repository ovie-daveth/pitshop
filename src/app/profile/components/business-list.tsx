"use client"

import { Button } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/solid"


interface BusinessListProps {
  onCreateNew: () => void
}

export default function BusinessList({ onCreateNew }: BusinessListProps) {
  const businesses = [
    { id: 1, name: "The Honey branch" },
    { id: 2, name: "Great works" },
    { id: 3, name: "Fusion 360" },
    { id: 4, name: "The merchant store" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">Businesses</h2>
        <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
          Create New Business
        </Button>
      </div>

      <div className="overflow-hidden border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
          <tbody className="bg-white divide-y divide-gray-200">
            {businesses.map((business) => (
              <tr key={business.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{business.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 flex items-center justify-end gap-1">
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
