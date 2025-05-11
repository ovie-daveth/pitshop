"use client";
import { Menu, Tab, TabGroup, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import Filters from "./filters";
import { PlayIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import noMedia from "../../../../../public/images/nomedia.png";
import { IoIosWarning } from "react-icons/io";

type ItemsType = {
  id: string;
  type: string;
  thumbnail?: string;
  src: string;
  dimensions: string;
  fileSize: string;
  status?: "pending" | "uploading" | "failed" | "success";
  progress?: number;
  error?: string;
  name: string;
  size: number;
};

const UploadMediaForm = ({ setIsOpenModal }: { setIsOpenModal: Dispatch<SetStateAction<boolean>> }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [assets, setAssets] = useState<ItemsType[]>([]);
  const [distribution, setDistribution] = useState<"one" | "group">("one");
  const [selectedTab, setSelectedTab] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [failedImages, setFailedImages] = useState(0);
  const [failedVideos, setFailedVideos] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);
  const [duplicateFile, setDuplicateFile] = useState<File | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all"); // Add state for status filter

  const filteredItems = assets.filter((item) => {
    // Apply tab-based filtering (All, Images, Videos)
    let tabFilter = true;
    if (selectedTab === 1) tabFilter = item.type === "image";
    if (selectedTab === 2) tabFilter = item.type === "video";

    // Apply status-based filtering (All, Successful, Failed)
    let statusFilterResult = true;
    if (statusFilter === "success") statusFilterResult = item.status === "success";
    if (statusFilter === "failed") statusFilterResult = item.status === "failed";

    return tabFilter && statusFilterResult;
  });

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const isYouTubeUrl = (url: string) => /youtu\.?be/.test(url);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => resolve({ width: 0, height: 0 });
    });
  };

  const getVideoDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth, height: video.videoHeight });
        URL.revokeObjectURL(video.src);
      };
      video.onerror = () => resolve({ width: 0, height: 0 });
    });
  };

  const simulateUpload = (assetId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setAssets((prev) =>
          prev.map((asset) =>
            asset.id === assetId ? { ...asset, progress } : asset
          )
        );
        if (progress >= 100) {
          clearInterval(interval);
          setAssets((prev) =>
            prev.map((asset) =>
              asset.id === assetId ? { ...asset, status: "success" } : asset
            )
          );
          resolve();
        }
      }, 200);
    });
  };

  const processFile = async (file: File) => {
    const isDuplicate = assets.some(
      (asset) => asset.name === file.name && asset.size === file.size
    );

    if (isDuplicate) {
      setDuplicateFile(file);
      setShowDuplicatePopup(true);
      return;
    }

    const id = `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "other";
    const src = URL.createObjectURL(file);
    const fileSize = formatFileSize(file.size);
    const maxSize = 2 * 1024 * 1024;

    let dimensions = "Unknown";
    if (type === "image") {
      const { width, height } = await getImageDimensions(file);
      dimensions = `${width}x${height}`;
    } else if (type === "video") {
      const { width, height } = await getVideoDimensions(file);
      dimensions = `${width}x${height}`;
    }

    const newAsset: ItemsType = {
      id,
      type,
      src,
      dimensions,
      fileSize,
      status: file.size > maxSize ? "failed" : "pending",
      progress: 0,
      error: file.size > maxSize ? "File size too large" : undefined,
      name: file.name,
      size: file.size,
      ...(type === "video" && { thumbnail: noMedia.src }),
    };

    setAssets((prev) => [...prev, newAsset]);

    if (file.size > maxSize) {
      if (type === "image") {
        setFailedImages((prev) => prev + 1);
      } else if (type === "video") {
        setFailedVideos((prev) => prev + 1);
      }
    }
  };

  const handleAcceptDuplicate = async () => {
    if (duplicateFile) {
      await processFile(duplicateFile);
      setShowDuplicatePopup(false);
      setDuplicateFile(null);
    }
  };

  const handleRejectDuplicate = () => {
    setShowDuplicatePopup(false);
    setDuplicateFile(null);
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    for (const file of Array.from(files)) {
      await processFile(file);
    }
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    for (const file of Array.from(files)) {
      await processFile(file);
    }
    setIsProcessing(false);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setFailedImages(0);
    setFailedVideos(0);

    const uploadableAssets = assets.filter((asset) => asset.status === "pending");
    for (const asset of uploadableAssets) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === asset.id ? { ...a, status: "uploading", progress: 0 } : a
        )
      );
      await simulateUpload(asset.id);
    }

    const failed = assets.filter((asset) => asset.status === "failed");
    setFailedImages(failed.filter((asset) => asset.type === "image").length);
    setFailedVideos(failed.filter((asset) => asset.type === "video").length);

    setIsUploading(false);
  };

  const Grid = ({ items }: { items: ItemsType[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => {
        const isPlaying = playingId === item.id;
        const isVideo = item.type === "video";
        const truncatedName = `${item.id.substring(0, 6)}.jpg...`;

        return (
          <div key={item.id} className="relative group rounded-lg shadow pb-2">
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
                    alt={item.fileSize}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {item.type === "video" && item.status !== "failed" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div onClick={() => setPlayingId(item.id)} className="bg-white bg-opacity-70 rounded-full p-2">
                        <PlayIcon className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  )}
                  {item.status === "pending" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <p className="text-white text-xs">Ready to upload</p>
                    </div>
                  )}
                  {item.status === "uploading" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                      <div className="w-3/4 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-white text-xs mt-1">Uploading...</p>
                    </div>
                  )}
                  {item.status === "failed" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="text-red-500 lg:text-sm text-xs flex flex-col items-center justify-center">
                        <IoIosWarning size={30} />
                        {item.error}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="mt-1 w-[65%] lg:w-full px-2">
              <h3 className="text-sm mb-1">{truncatedName}</h3>
              <div className="text-xs text-gray-500 flex flex gap-2 items-center">
                <span>{item.dimensions}</span>
                •
                <span>{item.fileSize}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const totalFailed = failedImages + failedVideos;
  let failureMessage = "";
  if (totalFailed > 0) {
    if (failedImages > 0 && failedVideos === 0) {
      failureMessage = `${failedImages} ${failedImages === 1 ? "image" : "images"} failed`;
    } else if (failedVideos > 0 && failedImages === 0) {
      failureMessage = `${failedVideos} ${failedVideos === 1 ? "video" : "videos"} failed`;
    } else {
      failureMessage = `${totalFailed} images/videos failed`;
    }
  }

  return (
    <div className="fixed w-full h-screen inset-0 bg-black/80 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[95vh] flex flex-col ${
          distribution === "group" ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"
        }`}
      >
        <div
          className={`w-full max-w-[99%] max-h-[95vh] flex flex-col ${
            distribution === "group" && "overflow-y-auto custom-scrollbar"
          }`}
        >
          <div className="flex justify-between items-start px-4 pt-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Upload Your Creative Assets</h2>
              <p className="text-sm text-gray-500 font-light mb-4">
                You can upload images, videos, and text-based assets
              </p>
            </div>
            <button
              onClick={() => setIsOpenModal(false)}
              className="text-gray-500 hover:text-gray-700 shadow rounded-full p-1"
            >
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

          <div className="mb-4 mt-3 px-4">
            <p className="text-sm font-medium text-gray-700 mb-2 font-semibold tracking-wide">
              Distribute media into assets
            </p>
            <div className="flex space-x-4 font-light mt-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="distribution"
                  value="one"
                  checked={distribution === "one"}
                  onChange={() => setDistribution("one")}
                  className="form-radio text-white primary-600"
                />
                <span className="ml-2 text-sm text-gray-700">One asset per item</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="distribution"
                  value="group"
                  checked={distribution === "group"}
                  onChange={() => setDistribution("group")}
                  className="form-radio text-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">Group assets by name</span>
              </label>
            </div>
          </div>

          {distribution === "group" && (
            <div className="p-5">
              <div className="bg-[#FCF0ED] border-2 border-[#FD9BA3] rounded-md p-4 w-full text-gray-700 text-sm">
                <p className="font-medium">
                  To group your media assets, use a shared prefix plus a valid suffix. The suffix can represent:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Aspect Ratio: e.g., 1:1, 4:5, 9:16, 16:9, 1.91:1</li>
                  <li>Pixel Dimensions: e.g., 1080×1080, 1080×1350, 1080×1920, 1920×1080, 1200×628</li>
                  <li>Descriptor: e.g., post, feed, story</li>
                </ul>
                <p className="mt-2">Allowed separators: colon (:), underscore (_), or dash (-)</p>
                <p className="mt-2 font-medium">Example:</p>
                <div className="mt-1 bg-red-50 p-3 rounded">
                  <p>
                    For instance, naming files Google_1080x1080.png and Google_1:1.png will automatically group them
                    together.
                  </p>
                  <p className="mt-2">
                    Files with the same prefix and a recognized suffix are grouped as one asset; any files that don't match
                    are treated separately.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed ${
              isDragging ? "border-teal-500 bg-teal-50" : "border-gray-300"
            } rounded-lg p-8 text-center mb-4 mx-4 relative`}
          >
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <p className="text-sm text-gray-700">Processing files...</p>
              </div>
            )}
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
              onChange={handleFileInputChange}
              className="hidden"
              accept="image/*,video/*,.txt,.pdf"
            />

            <p className="text-xs text-gray-800 lg:w-[35%] text-center w-full flex items-center justify-center mx-auto font-light">
              Supports PNG, JPG, MP4, and more (Max size: 2MB per file)
            </p>
          </div>

          {assets.length >= 1 && (
            <div
              className={`w-full p-4 flex-1 ${distribution !== "group" ? "overflow-y-auto" : ""} custom-scrollbar`}
            >
              <div className="w-full space-y-4 h-full pr-2 custom-scrollbar">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">Assets</h2>
                  <p className="font-light text-sm text-gray-500">{assets.length} assets</p>
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
                      <Filters onFilterChange={setStatusFilter} />
                    </div>
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
                  </Tab.Group>
                </div>
              </div>
            </div>
          )}

          <hr />

          <div className="flex justify-between items-center space-x-3 mt-5 pb-5 px-4 w-full">
            {totalFailed > 0 && (
              <div className="text-red-500 text-sm flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {failureMessage}
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-4 py-2 border border-green-700 font-light text-sm rounded-full text-green-800 hover:bg-gray-100 w-32 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || !assets.some((asset) => asset.status === "pending")}
                className={`px-4 py-2 text-sm rounded-full w-32 font-light ${
                  isUploading || !assets.some((asset) => asset.status === "pending")
                    ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                    : "bg-teal-500 text-white hover:bg-teal-600"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Duplicate File Popup */}
      {showDuplicatePopup && duplicateFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">We found duplicate(s)!</h3>
            <p className="text-sm text-gray-600 mb-4 shadow-md p-2 rounded-full">
            We found duplicates of some files in your library. What would you like to do?
            </p>
            <div className="flex justify-end space-x-4 w-full">
              <button
                onClick={handleAcceptDuplicate}
                className="px-4 py-2 border-green-800 border text-green-900 rounded-full hover:bg-gray-100 w-full text-sm"
              >
                Keep Both
              </button>
              <button
                onClick={handleRejectDuplicate}
                className="px-4 py-2 border-green-800 border text-green-900 rounded-full hover:bg-gray-100 w-full text-sm"
              >
                Replace existing file
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMediaForm;