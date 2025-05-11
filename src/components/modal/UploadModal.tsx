"use client";
import { Fragment, useState, useRef, useLayoutEffect } from "react";
import { Dialog, Transition, Menu, Popover } from "@headlessui/react";
import { useMediaLibraryState } from "@/api/context/MediaLibraryContext";
import toast from "react-hot-toast";
import { ChevronDownIcon, MenuAlt1Icon } from "@heroicons/react/solid";
import { Oval } from "@agney/react-loading";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileGroup {
  id: string;
  files: {
    file: File;
    presigned: {
      uploadUrl: string;
      assetUrl: string;
      mimetype: string;
      key: string;
    };
  }[];
}
const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const {
    loading,
    getPresigned,
    uploadPresigned,
    validateMedia,
    placements,
    getPlacements,
    postPresigned,
  } = useMediaLibraryState();

  useLayoutEffect(() => {
    getPlacements();
    console.log("PLACEMENTS", placements);
  }, []);

  const filters = [
    {
      id: "More Options",
      name: "More Options",
      options: [{ value: "add", label: "Add new asset" }],
    },
  ];

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  const [isCategorizeOpen, setIsCategorizeOpen] = useState(false);
  const [modalStep, setModalStep] = useState("initial");
  const [uploadedFiles, setUploadedFiles] = useState<
    {
      file: File;
      presigned: {
        uploadUrl: string;
        assetUrl: string;
        mimetype: string;
        key: string;
      };
    }[]
  >([]);

  const [finalItems, setFinalItems] = useState<FileGroup[]>([]);

  const [groupByName, setGroupByName] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [replacementTarget, setReplacementTarget] = useState<{
    groupIdx: number;
    fileIdx: number;
  } | null>(null);
  const dropRef = useRef<HTMLInputElement | null>(null);
  const [fileTypeFilter, setFileTypeFilter] = useState<
    "all" | "image" | "video"
  >("all");
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const addRef = useRef<HTMLInputElement | null>(null);
  const [filePermissions, setFilePermissions] = useState<
    Record<string, number[]>
  >({});
  const [categorizeFile, setCategorizeFile] = useState<File | null>(null);
  const [selectedPlacementIds, setSelectedPlacementIds] = useState<number[]>(
    []
  );

  const descriptors = new Set([
    "square",
    "story",
    "reel",
    "feed",
    "vertical",
    "horizontal",
    "landscape",
    "portrait",
    "post",
  ]);

  const numericPattern = /^\d+([:xX\-_])\d+$/;
  function extractBaseName(filename: string): string {
    const name = filename.toLowerCase().replace(/\.[^/.]+$/, "");

    const parts = name.split(/[\s_]/);

    while (parts.length > 1) {
      const last = parts[parts.length - 1];
      if (numericPattern.test(last) || descriptors.has(last)) {
        parts.pop();
      } else {
        break;
      }
    }

    let base = parts.join("_");

    const attachedPattern = new RegExp(
      `^(.*?)(?:(?:${Array.from(descriptors).join("|")})|\\d+[:xX\\-_]\\d+)$`
    );

    const attachedMatch = base.match(attachedPattern);
    if (attachedMatch) {
      base = attachedMatch[1];
    }

    return base;
  }

  const reset = () => {
    setModalStep("initial");
    setUploadedFiles([]);
    setFinalItems([]);
    setGroupByName(false);
    setErrorMessage("null");
    setFileInputKey((prev) => prev + 1);
    setFileTypeFilter("all");
    setSelectedValues({});
    setFilePermissions({});
    setCategorizeFile(null);
    setSelectedPlacementIds([]);
    onClose();
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    if (fileTypeFilter === "image") return file.file.type.startsWith("image/");
    if (fileTypeFilter === "video") return file.file.type.startsWith("video/");
    return true;
  });

  const updateValue = (id: string, label: string) => {
    setSelectedValues((prev) => ({ ...prev, [id]: label }));
    if (label === "Add new asset") {
      addRef.current?.click();
    }
  };

  const prepareFileUpload = async (file: File) => {
    try {
      const presigned = await getPresigned(file);
      await uploadPresigned({ url: presigned.uploadUrl, file });
      return { file, presigned };
    } catch (err) {
      console.error("Failed to upload file:", file.name, err);
      toast.error(`Failed to upload ${file.name}`);
      throw err;
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    const prepared = await Promise.all(
      files.map((file) => prepareFileUpload(file))
    );

    setUploadedFiles(prepared);
    setFinalItems(
      prepared.map((item, idx) => ({
        id: `item-${idx + 1}`,
        files: [item],
      }))
    );
  };

  const handleCategorizeFile = (file: File) => {
    setCategorizeFile(file);
    setIsCategorizeOpen(true);
    setSelectedPlacementIds(filePermissions[file.name] || []);
  };

  const handleConfirm = () => {
    if (!uploadedFiles.length) return;

    const grouped: Record<string, File[]> = {};
    const usedFiles = new Set<File>();

    uploadedFiles.forEach((fileWrapper) => {
      const base = extractBaseName(fileWrapper.file.name);
      if (!grouped[base]) grouped[base] = [];
      grouped[base].push(fileWrapper.file);
      usedFiles.add(fileWrapper.file);
    });

    const result: FileGroup[] = [];

    if (groupByName) {
      Object.entries(grouped).forEach(([base, files]) => {
        result.push({
          id: base,
          files: files.map(
            (file) => uploadedFiles.find((uf) => uf.file === file)!
          ),
        });
      });

      let itemCount = 1;
      uploadedFiles.forEach((file) => {
        if (!usedFiles.has(file.file)) {
          result.push({ id: `item-${itemCount++}`, files: [file] });
        }
      });
    } else {
      uploadedFiles.forEach((file, idx) => {
        result.push({ id: `item-${idx + 1}`, files: [file] });
      });
    }

    setFinalItems(result);
    setSelectedGroupIndex(0);
    setModalStep("review");
  };

  const handleDeleteFile = (fileToDelete: File) => {
    const updatedFinalItems = [...finalItems];
    const currentGroup = updatedFinalItems[selectedGroupIndex];
    currentGroup.files = currentGroup.files.filter(
      (f) => f.file !== fileToDelete
    );
    if (currentGroup.files.length === 0) {
      updatedFinalItems.splice(selectedGroupIndex, 1);
      setSelectedGroupIndex((prev) => Math.max(0, prev - 1));
    }

    setFinalItems(updatedFinalItems);
  };
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    fileIdx: number
  ) => {
    e.preventDefault();
    setDragOverIdx(fileIdx);
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDropReplace = (
    e: React.DragEvent<HTMLDivElement>,
    groupIdx: number,
    fileIdx: number
  ) => {
    e.preventDefault();
    setDragOverIdx(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const updatedFinalItems = [...finalItems];
    updatedFinalItems[groupIdx].files[fileIdx] = {
      file,
      presigned: { uploadUrl: "", assetUrl: "", mimetype: "", key: "" },
    };
    setFinalItems(updatedFinalItems);
  };

  const handleAddAssetFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.[0]) return;

    const newFile = event.target.files[0];
    const uploaded = await prepareFileUpload(newFile);

    const updatedFinalItems = [...finalItems];
    updatedFinalItems[selectedGroupIndex].files.push({
      file: uploaded.file,
      presigned: uploaded.presigned,
    });

    setFinalItems(updatedFinalItems);
    event.target.value = "";
  };

  const handleFileReplaceUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!replacementTarget || !event.target.files?.[0]) return;

    const newFile = event.target.files[0];
    const uploaded = await prepareFileUpload(newFile);

    const updatedFinalItems = [...finalItems];
    updatedFinalItems[replacementTarget.groupIdx].files[
      replacementTarget.fileIdx
    ] = { file: uploaded.file, presigned: uploaded.presigned };

    setFinalItems(updatedFinalItems);
    setReplacementTarget(null);
    event.target.value = "";
  };

  const saveCategorization = async () => {
    if (categorizeFile) {
      const placementIds = selectedPlacementIds;

      const allFiles = finalItems.flatMap((group) => group.files);
      const fileItem: any = allFiles.find(
        (f: any) => f.file.name === categorizeFile.name
      );
      if (!fileItem) return;

      try {
        await validateMedia({
          url: fileItem.presigned.assetUrl,
          mimetype: fileItem.presigned?.mimetype,
          key: fileItem.presigned.key,
          fileName: fileItem.file.name,
          placements: placementIds,
        });

        setFilePermissions((prev) => ({
          ...prev,
          [categorizeFile.name]: placementIds,
        }));

        toast.success(`Validated ${categorizeFile.name} successfully`);
      } catch (error) {
        console.error("Validation failed:", error);
        toast.error(`Validation failed for ${categorizeFile.name}`);
      }

      setCategorizeFile(null);
    }
  };

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

  const handleFinalUpload = async () => {
    try {
      const postTasks = finalItems.map(async (group) => {
        if (groupByName) {
          const parentFile: any =
            group.files.find((file) => file.file.name.includes("1:1")) ||
            group.files[0];
          const children = group.files.filter((file) => file !== parentFile);

          await postPresigned({
            parent: {
              url: parentFile.presigned.assetUrl,
              mimetype: parentFile.presigned.mimetype,
              key: parentFile.presigned.key,
              fileName: parentFile.file.name,
              placements: filePermissions[parentFile.file.name] || [],
            },
            children: children.map((child: any) => ({
              url: child.presigned.assetUrl,
              mimetype: child.presigned.mimetype,
              key: child.presigned.key,
              fileName: child.file.name,
            })),
          });
        } else {
          // Single Asset Upload
          const onlyFile: any = group.files[0];

          await postPresigned({
            parent: {
              url: onlyFile.presigned.assetUrl,
              mimetype: onlyFile.presigned.mimetype,
              key: onlyFile.presigned.key,
              fileName: onlyFile.file.name,
              placements: filePermissions[onlyFile.file.name] || [],
            },
          });
        }
      });

      await Promise.all(postTasks);
      toast.success("All media uploaded successfully!");
      reset();
    } catch (err) {
      console.error("Something went wrong during final upload:", err);
      toast.error("Upload failed.");
    }
  };

  return (
    <>
      <input
        ref={dropRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileReplaceUpload}
      />
      <input
        ref={addRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={handleAddAssetFileUpload}
      />
      <Transition.Root show={!!categorizeFile} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setCategorizeFile(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
                <Dialog.Title className="text-lg font-medium mb-4">
                  Categorize {categorizeFile?.name}
                </Dialog.Title>

                {/* Placement Popover */}
                <Popover className="relative w-full">
                  {({ open }) => (
                    <>
                      <Popover.Button className="w-full border rounded p-2 text-left">
                        {selectedPlacementIds.length > 0
                          ? `${selectedPlacementIds.length} placements selected`
                          : "Select placements"}
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg p-4">
                          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {(placements || []).map((placement: any) => (
                              <label
                                key={placement.id}
                                className="flex items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedPlacementIds.includes(
                                    placement.id
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedPlacementIds((prev) => [
                                        ...prev,
                                        placement.id,
                                      ]);
                                    } else {
                                      setSelectedPlacementIds((prev) =>
                                        prev.filter((id) => id !== placement.id)
                                      );
                                    }
                                  }}
                                />
                                {placement.name}
                              </label>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setCategorizeFile(null)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCategorization}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
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
                                                  {section.name}
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
                                                              updateValue(
                                                                section.id,
                                                                opt.label
                                                              );
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
                                    const objectUrl = URL.createObjectURL(
                                      file.file
                                    );
                                    function handleReplaceFile(
                                      selectedGroupIndex: number,
                                      idx: number
                                    ): void {
                                      setReplacementTarget({
                                        groupIdx: selectedGroupIndex,
                                        fileIdx: idx,
                                      });
                                      dropRef.current?.click();
                                    }
                                    return (
                                      <div
                                        key={idx}
                                        className={`flex items-center justify-between bg-gray-50 p-2 rounded-lg border transition-colors ${
                                          dragOverIdx === idx
                                            ? "bg-blue-100 border-blue-400"
                                            : ""
                                        }`}
                                        onDragOver={(e) =>
                                          handleDragOver(e, idx)
                                        }
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) =>
                                          handleDropReplace(
                                            e,
                                            selectedGroupIndex,
                                            idx
                                          )
                                        }
                                      >
                                        <div className="flex items-center space-x-4">
                                          <img
                                            src={objectUrl}
                                            alt={file.file.name}
                                            className="w-16 h-16 rounded object-cover"
                                            onLoad={() =>
                                              URL.revokeObjectURL(objectUrl)
                                            }
                                          />
                                          <p className="text-sm text-gray-600">
                                            {file.file.name}
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
                                                  handleCategorizeFile(
                                                    file.file
                                                  )
                                                }
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              >
                                                Categorize file
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleReplaceFile(
                                                    selectedGroupIndex,
                                                    idx
                                                  )
                                                }
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              >
                                                Replace file
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleDeleteFile(file.file)
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
                          onClick={handleFinalUpload}
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
                        {filteredFiles.map(({ file }, i) => {
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
                          {loading ? (
                            <span>
                              <Oval
                                className="oval text-white text-center"
                                width="20"
                              />{" "}
                              Confirm
                            </span>
                          ) : (
                            <span>Confirm</span>
                          )}
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
