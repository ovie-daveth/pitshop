"use client";

import { useState, useEffect } from "react";
import { Menu, Transition, Tab } from "@headlessui/react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/solid";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { RiSoundModuleLine } from "react-icons/ri";
import noMedia from "../../../../public/images/nomedia.png";
import AssetActions from "./components/asset_action";
import ReactPlayer from "react-player";
import NoItemComponent from "./components/noitem_component";
import { useMediaLibraryState } from "@/api/context/MediaLibraryContext";
import UploadDateFilter from "./components/upload-date-filter";
import Collection from "./collection/page";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";

type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  dimensions: string;
  fileSize: string;
  uploadDate: Date;
  displayName: string;
  approvalStatus: "approved" | "pending" | "rejected";
  tags: string[];
  sku: string;
};


export default function MediaLibrary() {
  const { getMedia } = useMediaLibraryState();

  const [selectedTab, setSelectedTab] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filters, setFilters] = useState({
    approvalStatus: "",
    displayName: "",
    tag: "",
    sku: "",
    dimensions: "",
    uploadDate: "",
    displayNameFilterType: "startsWith",
    tagFilterType: "any",
  });

  const [customDateRange, setCustomDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  // Filter media items based on selected tab and other filters
  const filteredItems = mediaItems.filter((item) => {
    // Apply tab filtering
    if (selectedTab === 1 && item.type !== "image") return false;
    if (selectedTab === 2 && item.type !== "video") return false;
    if (selectedTab === 3 && !item.tags.includes("collection")) return false;
  
    // Apply other filters
    if (filters.approvalStatus && item.approvalStatus !== filters.approvalStatus) return false;
    if (filters.displayName) {
      if (filters.displayNameFilterType === "startsWith" && !item.displayName.toLowerCase().startsWith(filters.displayName.toLowerCase())) return false;
      if (filters.displayNameFilterType === "equalsTo" && item.displayName.toLowerCase() !== filters.displayName.toLowerCase()) return false;
    }
    if (filters.tag) {
      if (filters.tagFilterType === "any") {
        return item.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()));
      }
    }
    if (filters.sku && !item.sku.toLowerCase().includes(filters.sku.toLowerCase())) return false;
  
    // Date filtering
    if (filters.uploadDate) {
      const today = new Date();
      const uploadDate = new Date(item.uploadDate);
      switch (filters.uploadDate) {
        case "Today":
          return uploadDate.toDateString() === today.toDateString();
        case "Last 7 Days":
          return uploadDate >= new Date(today.setDate(today.getDate() - 7));
        case "Last 30 Days":
          return uploadDate >= new Date(today.setDate(today.getDate() - 30));
        case "Last 90 Days":
          return uploadDate >= new Date(today.setDate(today.getDate() - 90));
        case "This Year":
          return uploadDate.getFullYear() === today.getFullYear();
        case "Custom":
          if (customDateRange.from && customDateRange.to) {
            return uploadDate >= customDateRange.from && uploadDate <= customDateRange.to;
          }
          return true;
        default:
          return true;
      }
    }
  
    return true;
  });
  
  // Update clearFilters to reset customDateRange
  const clearFilters = () => {
    setFilters({
      approvalStatus: "",
      displayName: "",
      tag: "",
      sku: "",
      dimensions: "",
      uploadDate: "",
      displayNameFilterType: "startsWith",
      tagFilterType: "any",
    });
    setCustomDateRange({ from: null, to: null });
  };

  // Fetch media items
  useEffect(() => {
    const getMediaFunc = async () => {
      const data = await getMedia({
        displayName: filters.displayName,
        displayNameFilterType: filters.displayNameFilterType,
        approvalStatus: filters.approvalStatus,
        tag: filters.tag,
        tagFilterType: filters.tagFilterType,
        sku: filters.sku,
      });
      console.log("media", data);
      setMediaItems(data || []);
    };
    getMediaFunc();
  }, [selectedTab, filters]);

  // Add visual indicators for active filters
  const filterCount = Object.values(filters).filter(Boolean).length;

  console.log("filter", filteredItems);

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
                  as="div"
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
            <h1 className="lg:text-2xl md:text-xl text-lg font-medium text-gray-900 mb-6">
              Media Library
            </h1>

            <Tab.Group onChange={setSelectedTab}>
              <div className="flex justify-between lg:items-center flex-col lg:flex-row mb-6 gap-y-5">
                <Tab.List className="flex py-1 px-1 space-x-1 bg-gray-100 rounded-full w-fit">
                  <Tab as="div"> 
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
                  <Tab as="div">
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
                  <Tab as="div">
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
                  <Tab as="div">
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
                    {
                      selectedTab === 3 ?  <button
                        type="button"
                        className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white primary-800 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 gap-3"
                      >
                        <BsPlus size={20} />
                        Create Collection
                      </button>
                      :  <AssetActions />
                    }
             
              </div>

              {selectedTab !== 3 && (
                <>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button as="div">
                        <button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                          Approval status
                          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </button>
                      </Menu.Button>
                      <Transition
                        as="div"
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
                        as="div"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="px-3 py-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <label className="flex items-center space-x-1 text-sm text-gray-700">
                                <input
                                  type="radio"
                                  name="displayNameFilterType"
                                  value="startsWith"
                                  checked={filters.displayNameFilterType === "startsWith"}
                                  onChange={() => setFilters({ ...filters, displayNameFilterType: "startsWith" })}
                                  className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                                />
                                <span>Starts With</span>
                              </label>
                              <label className="flex items-center space-x-1 text-sm text-gray-700">
                                <input
                                  type="radio"
                                  name="displayNameFilterType"
                                  value="equalsTo"
                                  checked={filters.displayNameFilterType === "equalsTo"}
                                  onChange={() => setFilters({ ...filters, displayNameFilterType: "equalsTo" })}
                                  className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                                />
                                <span>Equals To</span>
                              </label>
                            </div>
                            <div>
                              <label htmlFor="displayNameFilter" className="block text-xs text-gray-500 mb-1">
                                Type to Filter
                              </label>
                              <input
                                id="displayNameFilter"
                                type="text"
                                placeholder="Search by name"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                        as="div"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 w-72 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="px-3 py-2">
                            <div className="mb-2">
                              <label className="block text-sm font-medium text-gray-700">Value</label>
                              <select
                                value={filters.tagFilterType}
                                onChange={(e) => setFilters({ ...filters, tagFilterType: e.target.value })}
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-sm border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border text-xs font-light"
                              >
                                <option value="any" className="">Any Selected Value (OR)</option>
                              </select>
                            </div>
                            <div className="mt-5">
                              <label htmlFor="tagFilter" className="block text-xs text-gray-500 mb-1">
                                Type to Filter
                              </label>
                              <input
                                id="tagFilter"
                                type="text"
                                placeholder="Search by tag"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                        as="div"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="px-3 py-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <label className="flex items-center space-x-1 text-sm text-gray-700">
                                <input
                                  type="radio"
                                  name="displayNameFilterType"
                                  value="startsWith"
                                  checked={filters.displayNameFilterType === "startsWith"}
                                  onChange={() => setFilters({ ...filters, displayNameFilterType: "startsWith" })}
                                  className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                                />
                                <span>Starts With</span>
                              </label>
                              <label className="flex items-center space-x-1 text-sm text-gray-700">
                                <input
                                  type="radio"
                                  name="displayNameFilterType"
                                  value="equalsTo"
                                  checked={filters.displayNameFilterType === "equalsTo"}
                                  onChange={() => setFilters({ ...filters, displayNameFilterType: "equalsTo" })}
                                  className="h-4 w-4 text-green-600 border-green-300 focus:ring-green-500"
                                />
                                <span>Equals To</span>
                              </label>
                            </div>
                            <div>
                              <label htmlFor="displayNameFilter" className="block text-xs text-gray-500 mb-1">
                                Type to Filter
                              </label>
                              <input
                                id="sku"
                                type="text"
                                placeholder="Search by SKU"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
                        as="div"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute lgleft-0 -left-16 w-64 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-y-auto max-h-[200px] scrollbar-hide">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => setFilters({ ...filters, dimensions: "Large" })}
                                  className={`${
                                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  9:16
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
                                  post / story
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
                                  feed / story
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
                                  1x1 / 9x16
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
                                  4x5 / 9x16
                                </button>
                              )}
                            </Menu.Item>
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
                      <UploadDateFilter 
                        uploadDate={filters.uploadDate}
                        customDateRange={customDateRange}
                        onChange={(value, customRange) => {
                          setFilters({ ...filters, uploadDate: value });
                          if (customRange) {
                            setCustomDateRange(customRange);
                          }
                        }}
                      />
                    </Menu>

                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                      onClick={clearFilters}
                    >
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
                          Date: {filters.uploadDate === "Custom" ? `${customDateRange.from?.toLocaleDateString() || "N/A"} - ${customDateRange.to?.toLocaleDateString() || "N/A"}` : filters.uploadDate}
                          <button
                            onClick={() => {
                              setFilters({ ...filters, uploadDate: "" });
                              setCustomDateRange({ from: null, to: null });
                            }}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}

              {selectedTab === 3 ? (
                <Collection />
              ) : filteredItems.length < 1 ? (
                <NoItemComponent />
              ) : (
                <Tab.Panels>
                  <Tab.Panel>
                    <Grid items={filteredItems} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Grid items={filteredItems.filter((item) => item.type === "image")} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Grid items={filteredItems.filter((item) => item.type === "video")} />
                  </Tab.Panel>
                </Tab.Panels>
              )}
            </Tab.Group>
          </div>
        </div>
      </WrapperLayout>
    </ProtectedRoute>
  );
}