"use client"
import { Menu, Tab, TabGroup, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import Filters from "./filters";
import { PlayIcon } from "@heroicons/react/solid";

const UploadMediaForm = ({setIsOpenModal}: {setIsOpenModal: Dispatch<SetStateAction<boolean>>}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(
    [
        {
          "id": "img645ddd1",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
            "id": "img645ddd12",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd15",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd16",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd17",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd18",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd19",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
          {
            "id": "img645ddd3",
            "type": "image",
            "src": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
            "dimensions": "300KB",
            "fileSize": "15.48kpm"
          },
        {
          "id": "img645ddd2",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "img645ddd3",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd4",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd5",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd6",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "img645ddd7",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "img645ddd8",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1533142266415-ac591a4c1b94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd9",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "img645ddd10",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1543353071-087092ec3935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "img645ddd11",
          "type": "image",
          "src": "https://images.unsplash.com/photo-1576866209830-607c4ca4e823?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd12",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        },
        {
          "id": "vid645ddd13",
          "type": "video",
          "src": "/placeholder.svg?height=300&width=300",
          "dimensions": "300KB",
          "fileSize": "15.48kpm"
        }
      ]
  )
  const [selectedTab, setSelectedTab] = useState(0)

  const filteredItems = assets.filter((item) => {
    // Filter by tab selection
    if (selectedTab === 0) return true; // All tab
    if (selectedTab === 1) return item.type === "image"; // Images tab
    if (selectedTab === 2) return item.type === "video"; // Videos tab
    return false; // Default case (no items for other tabs)
  })

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed w-full h-screen inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start px-4 pt-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Upload Your Creative Assets
            </h2>
            <p className="text-sm text-gray-500 font-light mb-4">
              You can upload images, videos, and text-based assets
            </p>
          </div>
          <button onClick={() => setIsOpenModal(false)} className="text-gray-500 hover:text-gray-700 shadow rounded-full p-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr />

        {/* Radio Buttons */}
        <div className="mb-4 mt-3 px-4">
          <p className="text-sm font-medium text-gray-700 mb-2 font-semibold tracking-wide">
            Distribute media into assets
          </p>
          <div className="flex space-x-4 font-light mt-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="distribution"
                className="form-radio text-white primary-600"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">One asset per item</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="distribution"
                className="form-radio text-teal-500"
              />
              <span className="ml-2 text-sm text-gray-700">Group assets by name</span>
            </label>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 mx-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-8">
            Drag & drop your files here or <br />
           <div className="flex items-center justify-center gap-1">
            <p>click</p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="font-medium text-teal-500 underline"
            >
              Browse Files
            </button>
            <p>to select from your device</p>
           </div>
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept="image/*,video/*,.txt,.pdf"
          />

          <p className="text-xs text-gray-800 lg:w-[35%] text-center w-full flex items-center justify-center mx-auto font-light">
            Supports PNG, JPG, MP4, and more (Max size: 500MB per file)
          </p>
        </div>

        {
            assets.length >= 1 && <div className="w-full p-4 flex-1 overflow-hidden">
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold">Assets</h2>
                        <p className="font-light text-sm text-gray-500">305 images/videos</p>
                    </div>
                    <div>                        
        <Tab.Group onChange={setSelectedTab}>
          <div className="flex justify-between lg:items-center flex-row mb-6 gap-y-5">
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
            </Tab.List>
            <Filters />
        </div>
        <Tab.Panels>
            <Tab.Panel className="flex-1">
             {
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto overflow-x-hidden max-h-[400px] custom-scrollbar">
                  {filteredItems.map((item) => (
                      <div key={item.id} className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                          <img
                            src={item.src || "/placeholder.svg"}
                            alt={item.id}
                            className="w-full h-full object-cover"
                          />
                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white bg-opacity-70 rounded-full p-2">
                                <PlayIcon className="h-6 w-6 text-gray-800" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-1 w-[65%]">
                            <h3 className="text-sm mb-1">{item.id}</h3>
                          <div className="text-xs text-gray-500 flex gap-2 flex justify-between items-center">
                            <span>{item.dimensions}</span> 
                            •
                            <span>{item.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
             }
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
                    </div>
                </div>
            </div>
        }

        <hr />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-5 pb-5 px-4 w-full">
          <button onClick={() => setIsOpenModal(false)} className="px-4 py-2 border border-green-700 font-light text-sm rounded-full text-green-800 hover:bg-gray-100 w-32 font-medium">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-400 text-gray-100 font-light text-sm rounded-full hover:bg-gray-500 w-32">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMediaForm;