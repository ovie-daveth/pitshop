"use client";

import React, { useEffect, useState } from "react";
import { FiChevronDown, FiArrowLeft, FiSettings } from "react-icons/fi";
import { BsBuilding, BsFillBuildingsFill } from "react-icons/bs";
import { TbSwitchHorizontal, TbLogout } from "react-icons/tb";
import { useAuthState } from "@/api/context/AuthContext";
import { useCompanyState } from "@/api/context/CompanyContext";
import { useRouter } from "next/navigation";
import { ICompany } from "@/api/types";
import { saveKeysToLocalStorage } from "@/api/utils/switch";

export default function BranchDropdown() {
  const { logout, user } = useAuthState();
  const { company: companies, currentCompany, getUserCompanies, setCurrentCompany } = useCompanyState();
  const router = useRouter();

  const [isBusinessSwitcherView, setIsBusinessSwitcherView] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync with CompanyContext's currentCompany and initialize if needed
  useEffect(() => {
    const initializeCompany = async () => {
      if (!companies || companies.length === 0) {
        await getUserCompanies(); // Fetch companies if not already loaded
      }
      if (companies && companies.length > 0 && !currentCompany) {
        const storedCompanyId = sessionStorage.getItem("companyId");
        const initialCompany = storedCompanyId
          ? companies.find((c) => c.id === parseInt(storedCompanyId))
          : companies[0];
        if (initialCompany) {
          setCurrentCompany(initialCompany);
          saveKeysToLocalStorage(initialCompany);
        }
      }
    };
    initializeCompany();
  }, [companies, currentCompany, getUserCompanies, setCurrentCompany]);

  // Filter businesses based on search input
  const filteredBusinesses = companies?.filter((business) =>
    business.company?.name.toLowerCase().includes(filterValue.toLowerCase())
  ) || [];

  // Handle business selection
  const selectBusiness = (business: ICompany) => {
    setCurrentCompany(business); // Update CompanyContext
    sessionStorage.setItem("companyId", business.id.toString());
    saveKeysToLocalStorage(business); // Update keys
    console.log("keys", business.company?.reference, business.id.toString());
    setIsBusinessSwitcherView(false);
    setIsOpen(false);
  };

  const handleSwitchBusinessClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBusinessSwitcherView(true);
  };

  const LogoutFunction = async () => {
    setIsLoading(true);
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer inline-flex"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 text-white bg-[#EDF4FC] rounded-full">
            <BsFillBuildingsFill fill="#0055CC" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">{currentCompany?.company?.name || "Select Company"}</span>
            <span className="text-xs text-gray-500">Business</span>
          </div>
        </div>
        <FiChevronDown
          className={`w-5 h-5 ml-1 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-72 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          {!isBusinessSwitcherView ? (
            <div className="p-5">
              <div className="px-4 py-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-md">
                    <BsBuilding className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentCompany?.company?.name || "No Company Selected"}</span>
                    <span className="text-xs text-gray-500">Business</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSwitchBusinessClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-2"
              >
                <TbSwitchHorizontal className="w-5 h-5 mr-3 rotate-180" />
                Switch Business
              </button>

              <button
                onClick={() => router.push("/dashboard/settings")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-5"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                Business settings
              </button>

              <div className="border-t border-gray-200 my-1" />

              <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-[#EDF4FC] rounded-md">
                    <span className="text-xs text-[#0055CC]">
                      {(user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-normal text-sm">{user?.firstName + " " + user?.lastName}</span>
                    <span className="text-xs text-gray-500 font-light">{user?.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/dashboard/profile")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium mb-2"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                Profile settings
              </button>

              <button
                onClick={LogoutFunction}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <TbLogout className="w-5 h-5 mr-3" />
                {isLoading ? "Signing out..." : "Sign out"}
              </button>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBusinessSwitcherView(false)}
                    className="p-1 rounded-full hover:bg-gray- bg-[#EDF4FC]"
                  >
                    <FiArrowLeft className="w-4 h-4 text-blue-600" />
                  </button>
                  <span className="text-sm font-normal">Switch Business To...</span>
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
                        onClick={() => selectBusiness(business)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 font-normal text-sm ${
                          currentCompany?.id === business.id ? "bg-gray-100" : ""
                        }`}
                      >
                        {business.company?.name}
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
  );
}