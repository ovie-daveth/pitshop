"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition, Menu, Popover } from "@headlessui/react";

import { ChevronDownIcon, MenuAlt1Icon } from "@heroicons/react/solid";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileGroup {
  id: string;
  files: File[];
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const filters = [
    {
      id: "More Options",
      name: "More Options",
      options: [
        { value: "add", label: "Add new asset" },
        { value: "categorize", label: "Categorize file" },
      ],
    },
  ];

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  const updateValue = (id: string, label: string) => {
    setSelectedValues((prev) => ({ ...prev, [id]: label }));
  };
  const [isCategorizeOpen, setIsCategorizeOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [modalStep, setModalStep] = useState("initial");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [groupByName, setGroupByName] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);
  const [finalItems, setFinalItems] = useState<FileGroup[]>([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [fileTypeFilter, setFileTypeFilter] = useState<
    "all" | "image" | "video"
  >("all");

  const filePattern =
    /^(.+?)[_\-x:](\d+[x:]\d+|1:1|4:5|9:16|16:9|1\.91:1|post|story|feed)(?:\..+)?$/i;

  const reset = () => {
    setModalStep("initial");
    setUploadedFiles([]);
    setFinalItems([]);
    setGroupByName(false);
    setErrorMessage("null");
    setFileInputKey((prev) => prev + 1);
    setFileTypeFilter("all");
    onClose();
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!categories.includes(inputValue.trim())) {
        setCategories([...categories, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    setUploadedFiles(files);
  };

  const handleConfirm = () => {
    if (!uploadedFiles.length) return;

    const grouped: Record<string, File[]> = {};
    const ungrouped: File[] = [];

    uploadedFiles.forEach((file) => {
      const match = file.name.match(filePattern);
      if (match) {
        const prefix = match[1];
        if (!grouped[prefix]) grouped[prefix] = [];
        grouped[prefix].push(file);
      } else {
        ungrouped.push(file);
      }
    });

    const result: FileGroup[] = [];

    if (groupByName) {
      const groupedEntries = Object.entries(grouped);

      if (groupedEntries.length > 0) {
        groupedEntries.forEach(([prefix, files]) => {
          result.push({ id: prefix, files });
        });

        if (ungrouped.length > 0) {
          result.push({ id: "Ungrouped", files: ungrouped });
        }
      } else {
        result.push({ id: "All Files", files: uploadedFiles });
      }
    } else {
      uploadedFiles.forEach((file, index) => {
        result.push({ id: `item-${index + 1}`, files: [file] });
      });
    }

    setFinalItems(result);
    setSelectedGroupIndex(0);
    setModalStep("review");
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    if (fileTypeFilter === "image") return file.type.startsWith("image/");
    if (fileTypeFilter === "video") return file.type.startsWith("video/");
    return true;
  });

  const showErrorMessage = (
    <div className="text-left space-y-2 font-light text-gray-500">
      <p>
        To group your media assets, use a shared prefix plus a valid suffix. The
        suffix can represent:
      </p>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>Aspect Ratio: e.g., 1:1, 4:5, 9:16, 16:9, 1.91:1</li>
        <li>
          Pixel Dimensions: e.g., 1080x1080, 1080x1350, 1080x1920, 1920x1080,
          1200x628
        </li>
        <li>Descriptor: e.g., post, feed, story</li>
        <li>Allowed separators: colon (:), x, or dash (-)</li>
      </ul>
      <p>
        <span>Example:</span>
        <br />
        <br />
        <br /> For instance, Naming files <>Google_1080x1080.png</> and{" "}
        <>Google_1:1.png</> will automatically group them together.
      </p>
      <p>
        Files with the same prefix and a recognized suffix are grouped as one
        asset; any files that don’t match are treated separately.
      </p>
    </div>
  );

  return (
    <>
      <Transition.Root show={isCategorizeOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsCategorizeOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Categorize file
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">
                      Add different categories
                    </p>
                    <div className="border rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2">
                      {categories.map((cat) => (
                        <span
                          key={cat}
                          className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                          {cat}
                          <button
                            onClick={() => removeCategory(cat)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleCategoryKeyDown}
                        placeholder="Press enter to add more"
                        className="flex-1 min-w-[100px] outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setIsCategorizeOpen(false)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Save action here
                        setIsCategorizeOpen(false);
                      }}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={reset}
        >
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-6xl w-full">
                <div className="py-6 px-12">
                  {modalStep === "review" ? (
                    <>
                      <div className="flex items-start justify-between pb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Adjust your items
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Carefully adjust your items
                          </p>
                        </div>
                        <button
                          onClick={reset}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          &#x2715;
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-1/3 space-y-2 overflow-y-auto max-h-[60vh] border-r pr-4">
                          {finalItems.map((group, index) => (
                            <div
                              key={index}
                              onClick={() => setSelectedGroupIndex(index)}
                              className={`py-4 px-2 rounded-lg cursor-pointer ${
                                selectedGroupIndex === index
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex flex-row items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {group.id}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {group.files.length > 1
                                      ? "Multiple Asset"
                                      : "Single Asset"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-white inline-flex items-center rounded-full px-2.5 py-1 font-medium bg-indigo-800">
                                    {group.files.length}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="w-2/3 space-y-4 border border-gray-200 rounded-lg p-6">
                          {finalItems[selectedGroupIndex] && (
                            <div>
                              <div className="flex flex-row items-center justify-between py-4">
                                <div>
                                  <p className="text-gray-700 font-semibold mb-2">
                                    {finalItems[selectedGroupIndex].id} (
                                    {
                                      finalItems[selectedGroupIndex].files
                                        .length
                                    }{" "}
                                    {finalItems[selectedGroupIndex].files
                                      .length > 1
                                      ? "Multiple"
                                      : "Single"}{" "}
                                    Asset )
                                  </p>
                                </div>

                                <div>
                                  {" "}
                                  <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                                    <form className="mt-4">
                                      <div className="flex flex-wrap gap-4">
                                        {filters.map((section) => (
                                          <Popover
                                            key={section.id}
                                            className="relative"
                                          >
                                            {({ open }) => (
                                              <>
                                                <Popover.Button className="flex items-center justify-between px-4 py-2 text-sm  text-gray-500 bg-white border-2 border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none min-w-[160px]">
                                                  {selectedValues[section.id] ||
                                                    section.name}
                                                  <ChevronDownIcon
                                                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                                                      open
                                                        ? "-rotate-180"
                                                        : "rotate-0"
                                                    }`}
                                                  />
                                                </Popover.Button>

                                                <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                                                  {/* Approval Status & Dimensions */}
                                                  <ul className="space-y-2">
                                                    {section.options.map(
                                                      (opt) => (
                                                        <li key={opt.value}>
                                                          <button
                                                            className="w-full text-left text-sm text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"
                                                            onClick={(e) => {
                                                              e.preventDefault();

                                                              if (
                                                                opt.value ===
                                                                "categorize"
                                                              ) {
                                                                setIsCategorizeOpen(
                                                                  true
                                                                );
                                                              } else {
                                                                updateValue(
                                                                  section.id,
                                                                  opt.label
                                                                );
                                                              }
                                                            }}
                                                          >
                                                            {opt.label}
                                                          </button>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </Popover.Panel>
                                              </>
                                            )}
                                          </Popover>
                                        ))}
                                      </div>
                                    </form>
                                  </Popover.Group>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {finalItems[selectedGroupIndex].files.map(
                                  (file, idx) => {
                                    const objectUrl = URL.createObjectURL(file);
                                    return (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border"
                                      >
                                        <div className="flex items-center space-x-4">
                                          <img
                                            src={objectUrl}
                                            alt={file.name}
                                            className="w-16 h-16 rounded object-cover"
                                            onLoad={() =>
                                              URL.revokeObjectURL(objectUrl)
                                            }
                                          />
                                          <p className="text-sm text-gray-600">
                                            {file.name}
                                          </p>
                                        </div>
                                        <div>
                                          <Popover className="relative">
                                            <Popover.Button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                                />
                                              </svg>
                                            </Popover.Button>

                                            <Popover.Panel className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                                              <button
                                                onClick={() =>
                                                  alert("Replace file clicked")
                                                }
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              >
                                                Replace file
                                              </button>
                                              <button
                                                onClick={() =>
                                                  alert("Delete file clicked")
                                                }
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                              >
                                                Delete file
                                              </button>
                                            </Popover.Panel>
                                          </Popover>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={reset}
                          className="bg-white border px-4 py-2 rounded-md text-sm text-gray-700 mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => alert("Final upload confirmed")}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Upload Your Creative Assets
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            You can upload images, videos, and text-based
                            assets.
                          </p>
                        </div>
                        <button
                          onClick={reset}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          &#x2715;
                        </button>
                      </div>

                      <fieldset className="mt-6">
                        <legend className="text-base font-medium text-gray-900 mb-2">
                          Distribute media into assets
                        </legend>
                        <div className="flex items-center space-x-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={!groupByName}
                              onChange={() => {
                                setGroupByName(false);
                                setErrorMessage("null");
                              }}
                              className="h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              One asset per item
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={groupByName}
                              onChange={() => {
                                setGroupByName(true);
                                setErrorMessage(showErrorMessage);
                              }}
                              className="h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Group assets by name
                            </span>
                          </label>
                        </div>

                        {groupByName && errorMessage !== "null" && (
                          <div className="pt-4 border-2 border-red-600 text-center text-sm bg-red-100 py-4 px-4 rounded-md mt-4">
                            {errorMessage}
                          </div>
                        )}
                      </fieldset>

                      <div className="mt-6 mb-8 border-2 border-dashed border-gray-300 rounded-lg py-24 px-4 text-center">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-16 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="text-sm text-gray-600">
                            <span>Drag & drop files or </span>
                            <label
                              htmlFor="file-upload"
                              className="text-indigo-600 cursor-pointer font-medium"
                            >
                              click to browse
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                key={fileInputKey}
                                multiple
                                onChange={handleFileUpload}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            Supports PNG, JPG, MP4, and more (Max 500MB per
                            file)
                          </p>
                        </div>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex space-x-2">
                            {["all", "image", "video"].map((type) => (
                              <button
                                key={type}
                                className={`px-3 py-1 rounded-md text-sm border ${
                                  fileTypeFilter === type
                                    ? "bg-indigo-100 border-indigo-500"
                                    : "border-gray-300"
                                }`}
                                onClick={() => setFileTypeFilter(type as any)}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </button>
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">
                            {filteredFiles.length}{" "}
                            {fileTypeFilter === "all"
                              ? "items"
                              : `${fileTypeFilter}s`}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredFiles.map((file, i) => {
                          const objectUrl = URL.createObjectURL(file);
                          return (
                            <div
                              key={i}
                              className="p-1 border rounded-md hover:bg-gray-100"
                            >
                              <img
                                src={objectUrl}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded"
                                onLoad={() => URL.revokeObjectURL(objectUrl)}
                              />
                              <p className="text-xs text-gray-500 truncate">
                                {file.name}
                              </p>
                              <div className="text-[11px] text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(1)}MB
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          onClick={reset}
                          className="bg-white border px-4 py-2 rounded-md text-sm text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={uploadedFiles.length === 0}
                          onClick={handleConfirm}
                          className={`px-4 py-2 rounded-md text-sm text-white ${
                            uploadedFiles.length
                              ? "bg-indigo-600"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UploadModal;
