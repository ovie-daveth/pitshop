"use client"

import { useState, useEffect } from "react"
import { Menu, Transition, Tab } from "@headlessui/react"
import { ChevronDownIcon, DownloadIcon, FilterIcon, PlayIcon } from "@heroicons/react/solid"
import { Fragment } from "react"
import ProtectedRoute from "@/api/protected/ProtectedRoute"
import WrapperLayout from "@/components/WrapperLayout"
import { FaCloudDownloadAlt } from "react-icons/fa"
import { BiFilter } from "react-icons/bi"
import { RiSoundModuleLine } from "react-icons/ri"
import Image from "next/image"
import noMedia from "../../../../public/images/nomedia.png"
import AssetActions from "./components/asset_action"
import ReactPlayer from "react-player"

type MediaItem = {
  id: string
  type: "image" | "video"
  src: string,
  thumbnail?: string,
  dimensions: string
  fileSize: string
  uploadDate: Date
  displayName: string
  approvalStatus: "approved" | "pending" | "rejected"
  tags: string[]
  sku: string
}

export default function MediaLibrary() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [filters, setFilters] = useState({
    approvalStatus: "",
    displayName: "",
    tag: "",
    sku: "",
    dimensions: "",
    uploadDate: "",
  })

  // Filter media items based on selected tab and other filters
  const filteredItems = mediaItems.filter((item) => {
    // First apply tab filtering
    if (selectedTab === 1 && item.type !== "image") return false;
    if (selectedTab === 2 && item.type !== "video") return false;
    if (selectedTab === 3 && !item.tags.includes("collection")) return false;

    // Then apply other filters
    if (filters.approvalStatus && item.approvalStatus !== filters.approvalStatus) return false;
    if (filters.displayName && !item.displayName.toLowerCase().includes(filters.displayName.toLowerCase())) return false;
    if (filters.tag && !item.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()))) return false;
    if (filters.sku && !item.sku.toLowerCase().includes(filters.sku.toLowerCase())) return false;

    return true;
  });

  // Simulate loading media items
  useEffect(() => {
    // Mock data
    const mockItems: MediaItem[] = []
    setMediaItems(mockItems)
  }, [])

  const clearFilters = () => {
    setFilters({
      approvalStatus: "",
      displayName: "",
      tag: "",
      sku: "",
      dimensions: "",
      uploadDate: "",
    })
  }

  // Add visual indicators for active filters
  const filterCount = Object.values(filters).filter(Boolean).length

  console.log("filter", filteredItems)

  const isYouTubeUrl = (url: string) => /youtu\.?be/.test(url);
  const [playingId, setPlayingId] = useState<string | null>(null);


  const Grid = ({ items }: { items: MediaItem[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-y-4 gap-x-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
      {items.map((item) => {
        const isPlaying = playingId === item.id;
        const isVideo = item.type === "video";

        return (
          <div
            key={item.id}
            className="relative group rounded-lg shadow w-[170px] h-[220px]"
          >
            <div className="relative aspect-square rounded-lg bg-gray-100 w-[90%] mx-auto h-[75%]">
              {isVideo && isPlaying ? (
                isYouTubeUrl(item.src) ? (
                  <ReactPlayer
                    url={item.src}
                    light={item.thumbnail || noMedia.src}
                    playing
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <video
                    src={item.src}
                    controls
                    autoPlay
                    className="w-full h-full object-cover rounded-md"
                  />
                )
              ) : (
                <>
                  <img
                      src={isVideo ? item.thumbnail || noMedia.src : item.src}
                      alt={item.displayName}
                      className="w-full h-full object-cover"
                    />
                  {isVideo && (
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => setPlayingId(item.id)}
                    >
                      <div className="bg-white bg-opacity-70 rounded-full p-2">
                        <PlayIcon className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-1 flex justify-between items-center p-1">
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {item.displayName}
                </div>
                <div className="text-xs text-gray-500">
                  {item.dimensions} • {item.fileSize}
                </div>
              </div>
              <Menu as="div" className="relative inline-block text-left">
         <Menu.Button as="div">
           <button className="inline-flex justify-center p-1 text-gray-400 hover:text-gray-500">
             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
               <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
             </svg>
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
           <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
             <div className="px-1 py-1">
               <Menu.Item>
                 {({ active }) => (
                   <button
                     className={`${
                       active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                     } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                   >
                     View details
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
                     Download
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
                     Delete
                   </button>
                 )}
               </Menu.Item>
             </div>
           </Menu.Items>
         </Transition>
       </Menu>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
   <ProtectedRoute>
    <WrapperLayout>
    <div className="bg-white min-h-screen rounded-3xl z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="lg:text-2xl md:text-xl text-lg font-medium text-gray-900 mb-6">Media Library</h1>

        <Tab.Group onChange={setSelectedTab}>
          <div className="flex justify-between lg:items-center flex-col lg:flex-row mb-6 gap-y-5">
            <Tab.List className="flex py-1 px-1 space-x-1 bg-gray-100 rounded-full w-fit">
              <Tab as={Fragment}>
                {({ selected }) => (
                 <button
                 className={`
                   px-4 py-2 text-sm rounded-full border-none min-w-24 
                   focus:outline-none focus:ring-0 active:border-none
                   ${selected ? "bg-white shadow-lg text-green-700 font-bold" : "text-gray-500 hover:text-gray-700"}
                 `}
               >
                 All
               </button>
               
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                  className={`
                    px-4 py-2 text-sm rounded-full border-none min-w-24 
                    focus:outline-none focus:ring-0 active:border-none
                    ${selected ? "bg-white shadow-lg text-green-700 font-bold" : "text-gray-500 hover:text-gray-700"}
                  `}
                  >
                    Images
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                  className={`
                    px-4 py-2 text-sm rounded-full border-none min-w-24 
                    focus:outline-none focus:ring-0 active:border-none
                    ${selected ? "bg-white shadow-lg text-green-700 font-bold" : "text-gray-500 hover:text-gray-700"}
                  `}
                  >
                    Videos
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                  className={`
                    px-4 py-2 text-sm rounded-full border-none min-w-24 
                    focus:outline-none focus:ring-0 active:border-none
                    ${selected ? "bg-white shadow-lg text-green-700 font-bold" : "text-gray-500 hover:text-gray-700"}
                  `}
                  >
                    Collections
                  </button>
                )}
              </Tab>
            </Tab.List>

           <AssetActions />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Approval status
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, approvalStatus: "approved" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Approved
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, approvalStatus: "pending" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Pending
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, approvalStatus: "rejected" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Rejected
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Display name
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <div className="px-2 py-2">
                      <input
                        type="text"
                        placeholder="Search by name"
                        className="w-full px-2 py-1 border rounded"
                        value={filters.displayName}
                        onChange={(e) => setFilters({ ...filters, displayName: e.target.value })}
                      />
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Tag
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <div className="px-2 py-2">
                      <input
                        type="text"
                        placeholder="Search by tag"
                        className="w-full px-2 py-1 border rounded"
                        value={filters.tag}
                        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                      />
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  SKU
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <div className="px-2 py-2">
                      <input
                        type="text"
                        placeholder="Search by SKU"
                        className="w-full px-2 py-1 border rounded"
                        value={filters.sku}
                        onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
                      />
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Dimensions
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, dimensions: "Small" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Small (under 100KB)
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, dimensions: "Medium" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Medium (100KB - 500KB)
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, dimensions: "Large" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Large (over 500KB)
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button as="div">
                <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-[#3753441A] border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none relative">
                  Upload date
                    <span className="ml-1 primary-800 text-white font-bold h-5 w-4 rounded-sm -mt-1/2">1</span>
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
                <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, uploadDate: "Today" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Today
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, uploadDate: "Last 7 days" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Last 7 days
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, uploadDate: "Last 30 days" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Last 30 days
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setFilters({ ...filters, uploadDate: "Custom range" })}
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Custom range
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <button  type="button"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={clearFilters}>
              <RiSoundModuleLine color="black" size={24} />
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={clearFilters}
            >
              Clear filter
            </button>
          </div>

          {filterCount > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {filters.approvalStatus && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Status: {filters.approvalStatus}
                  <button
                    onClick={() => setFilters({ ...filters, approvalStatus: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.displayName && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Name: {filters.displayName}
                  <button
                    onClick={() => setFilters({ ...filters, displayName: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.tag && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Tag: {filters.tag}
                  <button
                    onClick={() => setFilters({ ...filters, tag: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.sku && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  SKU: {filters.sku}
                  <button
                    onClick={() => setFilters({ ...filters, sku: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.dimensions && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Size: {filters.dimensions}
                  <button
                    onClick={() => setFilters({ ...filters, dimensions: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.uploadDate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Date: {filters.uploadDate}
                  <button
                    onClick={() => setFilters({ ...filters, uploadDate: "" })}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

        {
          filteredItems.length < 1 ? <>No data</> : <Tab.Panels>
          {/* All */}
          <Tab.Panel>
            <Grid items={filteredItems} />
          </Tab.Panel>

          {/* Images */}
          <Tab.Panel>
            <Grid items={filteredItems.filter((item) => item.type === "image")} />
          </Tab.Panel>

          {/* Videos */}
          <Tab.Panel>
            <Grid items={filteredItems.filter((item) => item.type === "video")} />
          </Tab.Panel>
        </Tab.Panels>
        }

        </Tab.Group>
      </div>
    </div>
    </WrapperLayout>
   </ProtectedRoute>
  )
}

