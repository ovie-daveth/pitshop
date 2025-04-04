"use client"

import type React from "react"

import { useState } from "react"
import { FiChevronDown, FiArrowLeft, FiSettings, FiLogOut } from "react-icons/fi"
import { BsBuilding } from "react-icons/bs"

// Sample data for businesses
const businesses = [
  { id: 1, name: "The Honey branch" },
  { id: 2, name: "Great works" },
  { id: 3, name: "Fusion 360" },
  { id: 4, name: "The merchant store" },
  { id: 5, name: "The merchant store" },
  { id: 6, name: "The merchant store" },
  { id: 7, name: "The merchant store" },
]

export default function BranchDropdown() {
  const [isBusinessSwitcherView, setIsBusinessSwitcherView] = useState(false)
  const [filterValue, setFilterValue] = useState("")
  const [currentBusiness, setCurrentBusiness] = useState(businesses[0])
  const [isOpen, setIsOpen] = useState(false)

  // Filter businesses based on search input
  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(filterValue.toLowerCase()),
  )

  // Handle business selection
  const selectBusiness = (business: (typeof businesses)[0]) => {
    setCurrentBusiness(business)
    setIsBusinessSwitcherView(false)
  }

  // Reset to main view when dropdown closes
  const handleCloseDropdown = () => {
    setIsBusinessSwitcherView(false)
    setFilterValue("")
  }

  // Handle switch business click without closing the menu
  const handleSwitchBusinessClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsBusinessSwitcherView(true)
  }

  return (
    <div className="relative"> 
      <div
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-600 rounded-full">
            <span>IA</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">Israel Adegbulugbe</span>
            <span className="text-xs text-gray-500">adegbulugbeisrael@gmail.com</span>
          </div>
        </div>
        <FiChevronDown
          className={`w-5 h-5 ml-1 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-72 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {!isBusinessSwitcherView ? (
            // Main dropdown view
            <div className="py-1">
              {/* Current Business Section */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-md">
                    <BsBuilding className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentBusiness.name}</span>
                    <span className="text-xs text-gray-500">Business</span>
                  </div>
                </div>
              </div>

              {/* Business Options */}
              <button
                type="button"
                onClick={handleSwitchBusinessClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiArrowLeft className="w-5 h-5 mr-3 rotate-180" />
                Switch Business
              </button>

              <button
                type="button"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                Business settings
              </button>

              <div className="border-t border-gray-200 my-1"></div>

              {/* User Profile Section */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-600 rounded-md">
                    <span className="text-xs">IA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Israel Adegbulugbe</span>
                    <span className="text-xs text-gray-500">adegbulugbeisrael@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* User Options */}
              <button
                type="button"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                Profile settings
              </button>

              <button
                type="button"
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <FiLogOut className="w-5 h-5 mr-3" />
                Sign out
              </button>
            </div>
          ) : (
            // Business Switcher View
            <div>
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBusinessSwitcherView(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiArrowLeft className="w-5 h-5 text-blue-600" />
                  </button>
                  <span className="text-base font-medium">Switch Business To...</span>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Filter Business"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                <ul className="py-1">
                  {filteredBusinesses.map((business) => (
                    <li key={business.id}>
                      <button
                        type="button"
                        onClick={() => selectBusiness(business)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                          currentBusiness.id === business.id ? "bg-blue-50" : ""
                        }`}
                      >
                        {business.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}



// BranchDropdown