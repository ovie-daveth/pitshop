import { Fragment, useState, useLayoutEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import { useMediaLibraryState } from "@/api/context/MediaLibraryContext";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadCustomizeModal({
  isOpen,
  onClose,
}: UploadModalProps) {
  const { placements, getPlacements } = useMediaLibraryState();
  const reset = () => {
    onClose();
  };

  useLayoutEffect(() => {
    getPlacements();
  }, []);

  const [fields, setFields] = useState([
    { id: "Field 1", name: "Field 1", property: "", options: [] },
  ]);

  const [selectedField, setSelectedField] = useState<{
    id: string;
    name: string;
    property: string;
    options: never[];
  } | null>(fields[0]);

  const [newField, setNewField] = useState({
    name: "",
    property: "",
    options: [],
  });

  const [dropdownOption, setDropdownOption] = useState("");

  const handleSelectField = (field: any) => {
    setSelectedField(field);
    setNewField({ ...field });
  };

  const handleAddField = () => {
    const newId = `Field ${fields.length + 1}`;
    const newField = { id: newId, name: newId, property: "", options: [] };
    setFields((prevFields) => [...prevFields, newField]);
    setSelectedField(newField); // Automatically select new field
  };

  const handleDeleteField = (id: any) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);

    // If the field being deleted is the selected one, select the first field
    if (selectedField && selectedField.id === id) {
      setSelectedField(updatedFields[0] || null);
    }
  };

  const handleSaveField = () => {
    const updatedFields = fields.map((field: any) =>
      selectedField && field.id === selectedField.id
        ? { ...selectedField, ...newField }
        : field
    );
    setFields(updatedFields);
    setSelectedField(null);
  };

  const handleAddOption = () => {
    setNewField((prev: any) => ({
      ...prev,
      options: [...prev.options, dropdownOption],
    }));
    setDropdownOption("");
  };

  const handleRemoveOption = (option: any) => {
    setNewField((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt !== option),
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={reset}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-6xl w-full">
              <div>
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Customize your Metadata
                      </h3>
                    </div>
                    <button
                      onClick={reset}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      &#x2715;
                    </button>
                  </div>

                  <div className="flex py-4 ">
                    {/* Left Panel: Field List */}
                    <div className="w-1/3 border-r border-gray-200 pr-4">
                      <button
                        onClick={handleAddField}
                        className="text-gray-500 py-2 px-4 w-full flex justify-center items-center rounded-full ring-2 ring-blue-500 outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      >
                        Add new field
                      </button>
                      <ul>
                        {fields.map((field) => (
                          <li
                            key={field.id}
                            className="flex justify-between items-center py-2 px-3 border-b hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectField(field)}
                          >
                            <span>{field.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteField(field.id);
                              }}
                              className="text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Panel: Edit Field */}
                    <div className="w-2/3 pl-4">
                      {selectedField ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field name
                            </label>
                            <input
                              type="text"
                              value={newField.name}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  name: e.target.value,
                                })
                              }
                              className="w-full border rounded-md p-2"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field property
                            </label>
                            <select
                              value={newField.property}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  property: e.target.value,
                                })
                              }
                              className="w-full border rounded-md p-2"
                            >
                              <option value="">Select property</option>
                              <option value="Text input">Text input</option>
                              <option value="Dropdown input">
                                Dropdown input
                              </option>
                            </select>
                          </div>
                          {newField.property === "Dropdown input" && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Field input dropdown
                              </label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {newField.options.map((option, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-200 px-3 py-1 rounded-full flex justify-between items-center"
                                  >
                                    {option}
                                    <button
                                      onClick={() => handleRemoveOption(option)}
                                      className="ml-2 text-red-500"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={dropdownOption}
                                  onChange={(e) =>
                                    setDropdownOption(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && handleAddOption()
                                  }
                                  className="w-full border rounded-md p-2"
                                  placeholder="Press enter to add more"
                                />
                              </div>
                            </div>
                          )}
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={handleSaveField}
                              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500">Select a field to edit</p>
                      )}
                    </div>
                  </div>
                </>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
