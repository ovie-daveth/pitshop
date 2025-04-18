"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition, Disclosure, Combobox } from "@headlessui/react";
import {
  CloudDownloadIcon,
  ExclamationCircleIcon,
  PhotographIcon,
  ChatAlt2Icon,
  ShareIcon,
  XIcon,
  HeartIcon,
  PlusSmIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import CustomizeImage from "../../../../../public/images/customize.png";
import {
  MenuAlt4Icon,
  CheckIcon,
  SelectorIcon,
  ChatAltIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import {
  LuCircleX,
  LuBold,
  LuItalic,
  LuUnderline,
  LuLink,
  LuSmile,
} from "react-icons/lu";
import UploadCustomizeModal from "@/components/modal/UploadCustomizeModal";

const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project.</p>
      `,
      date: "July 16",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence.</p>
      `,
      date: "July 12",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

const sidebarNavigation = [
  { name: "Download", icon: CloudDownloadIcon },
  { name: "Summary", icon: ExclamationCircleIcon },
  { name: "Metadata", icon: MenuAlt4Icon },
  { name: "Comments", icon: ChatAlt2Icon },
  { name: "Analysis", icon: PhotographIcon },
];

const currentFile = {
  name: "IMG_4985.HEIC",
  size: "3.9 MB",
  source:
    "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  information: {
    "Uploaded by": "Marie Culver",
    Created: "June 8, 2020",
    "Last modified": "June 8, 2020",
    Dimensions: "1080 x 1080",
    Resolution: "72 x 72",
  },
  sharedWith: [
    {
      id: 1,
      name: "Aimee Douglas",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
    },
    {
      id: 2,
      name: "Andrea McMillan",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  x: number;
  y: number;
  onClose: () => void;
};

export default function Page() {
  const [commentBox, setCommentBox] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [query, setQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedUsage, setSelectedUsage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const asset = [{ name: "Main" }, { name: "Supply" }];

  const filteredAsset =
    query === ""
      ? asset
      : asset.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const usage = [{ name: "New" }, { name: "Recent" }, { name: "Months" }];

  const filteredUsage =
    query === ""
      ? usage
      : usage.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const status = [{ name: "True" }, { name: "False" }, { name: "Not Defined" }];

  const filteredStatus =
    query === ""
      ? status
      : status.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "Earthen Bottle.jpg",
      imageSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Download");

  const [openSections, setOpenSections] = useState(["Tags"]);

  const toggleSection = (section: any) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const tagsMock = ["Fish", "Lightskinned", "Hair", "Blue"];

  const embeddedFields = Array(10).fill("YResolution: 72");

  const metadataSections = [
    { name: "Tags", content: renderTags },
    { name: "Customize your Metadata", content: renderCustomizeMetadata },
    { name: "Structured Metadata", content: renderStructuredMetadata },
    { name: "Embedded Metadata", content: renderEmbeddedMetadata },
  ];

  function renderTags() {
    return (
      <div className="py-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {tagsMock.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag} <button className="ml-1">×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Press enter to add more"
          className="border p-2 rounded w-full"
        />
      </div>
    );
  }

  function renderCustomizeMetadata() {
    return (
      <div className="py-4 space-y-4">
        <div className="flex justify-center items-center flex-col">
          <div>
            <img src={CustomizeImage.src} alt="customize" className="flex" />
          </div>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            type="button"
            className="flex justify-center items-center px-2.5 py-1.5 my-2  ext-xs font-medium rounded shadow-sm text-white bg-indigo-500"
          >
            Customize
          </button>
        </div>
      </div>
    );
  }

  function renderStructuredMetadata() {
    return (
      <div className="py-4 space-y-4">
        <Combobox
          as="div"
          value={selectedAsset}
          onChange={(person: any) => setSelectedAsset(person)}
        >
          <Combobox.Label className="block text-sm font-medium text-gray-500">
            Asset Type
          </Combobox.Label>
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person?.name || "Select"}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredAsset.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-gray-500 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredAsset.map((person) => (
                  <Combobox.Option
                    key={person.name}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? " text-gray-900" : "text-gray-900"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              "truncate text-gray-500",
                              selected && "font-semibold"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
        <Combobox
          as="div"
          value={selectedUsage}
          onChange={(person: any) => setSelectedUsage(person)}
        >
          <Combobox.Label className="block text-sm font-medium text-gray-500">
            Usage Rights
          </Combobox.Label>
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person?.name || "Select"}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredUsage.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-gray-500 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredUsage.map((person) => (
                  <Combobox.Option
                    key={person.name}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "text-gray-900" : "text-gray-900"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              "truncate text-gray-500",
                              selected && "font-semibold"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
        <Combobox
          as="div"
          value={selectedStatus}
          onChange={(person: any) => setSelectedStatus(person)}
        >
          <Combobox.Label className="block text-sm font-medium text-gray-500">
            Status
          </Combobox.Label>
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person?.name || "Select"}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredStatus.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-gray-500 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredStatus.map((person) => (
                  <Combobox.Option
                    key={person.name}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "text-gray-900" : "text-gray-900"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              "truncate text-gray-500",
                              selected && "font-semibold"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Expiration Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              placeholder="Select"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            SKU
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter SKU"
              className="w-full rounded-md border border-gray-300 bg-white p-2  focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    );
  }

  function renderEmbeddedMetadata() {
    return (
      <div className="py-2">
        {embeddedFields.map((entry, i) => (
          <p key={i} className="text-sm text-gray-500  py-2">
            {entry}
          </p>
        ))}
      </div>
    );
  }

  const renderMetadataSidebar = () => (
    <div className="">
      {metadataSections.map(({ name, content }) => (
        <Disclosure key={name} defaultOpen={openSections.includes(name)}>
          {({ open }) => (
            <div>
              <Disclosure.Button
                onClick={() => toggleSection(name)}
                className="group relative w-full py-2 flex justify-between items-center text-gray-500 text-left"
              >
                <span>{name}</span>
                {open ? (
                  <div className="flex justify-end items-center">
                    <span className="rounded-full bg-indigo-100 mx-1 p-1">
                      <ChevronDownIcon
                        className="h-5 w-5 text-indigo-500 "
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                ) : (
                  <>
                    {/* {openSections.includes("Tags") && (
                      <>
                        <span className="inline-flex items-center  text-indigo-600 ">
                          <FaBolt
                            className="h-3 w-3 text-indigo-500 "
                            aria-hidden="true"
                          />
                          Autotags
                        </span>
                      </>
                    )} */}
                    <span className="rounded-full bg-indigo-100 mx-1 p-1">
                      <ChevronRightIcon
                        className="h-5 w-5 text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                  </>
                )}
              </Disclosure.Button>
              <Disclosure.Panel>{open && content()}</Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );

  const optionalContent = () => {
    switch (selectedTab) {
      case "Download":
        return (
          <div>
            <div className="p-2">
              <h1 className="py-4 text-2xl">Download Options</h1>
              <div className="grid gap-2 grid-cols-2">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500 m-2"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center w-full px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-400 bg-white outline-none ring-2 ring-offset-2 ring-gray-400"
                    >
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="px-2">{item.name}</span>
                    </button>
                  </Link>
                ))}
              </div>
              <h2 className="py-4 border-t ">Mapped Objects</h2>
              <div className="flex justify-between items-center p-3">
                <div className="mr-4 inline-flex items-center flex-shrink-0 self-center">
                  <img
                    src={products[0].imageSrc}
                    alt={products[0].imageAlt}
                    className="w-20 h-16 object-center object-cover rounded-lg"
                  />
                  <div className="px-2">
                    <span>1080 x 1080</span>
                    <br />
                    <span>3.0mb</span>
                  </div>
                </div>
                <div className="justify-end">
                  <CloudDownloadIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  jpg
                </div>
              </div>
            </div>
          </div>
        );
      case "Summary":
        return (
          <div>
            <div className="py-2 px-4">
              <h1 className="py-4 text-2xl">Summary</h1>
              <div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      <span className="sr-only">Details for </span>
                      {currentFile.name}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                      {currentFile.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Favorite</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {Object.keys(currentFile.information).map((key) => (
                    <div
                      key={key}
                      className="py-3 flex justify-between text-sm font-medium"
                    >
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900">
                        {
                          currentFile.information[
                            key as keyof typeof currentFile.information
                          ]
                        }
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500 italic">
                    Add a description to this image.
                  </p>
                  <button
                    type="button"
                    className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Add description</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shared with</h3>
                <ul
                  role="list"
                  className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {currentFile.sharedWith.map((person) => (
                    <li
                      key={person.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={person.imageUrl}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          {person.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Remove<span className="sr-only"> {person.name}</span>
                      </button>
                    </li>
                  ))}
                  <li className="py-2 flex justify-between items-center">
                    <button
                      type="button"
                      className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                        Share
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download
                </button>
                <button
                  type="button"
                  className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      case "Metadata":
        return (
          <div>
            <div className="py-2 px-4">
              <h1 className="py-4 text-2xl">Metadata</h1>
              <div className="">{renderMetadataSidebar()}</div>
            </div>
          </div>
        );
      case "Comments":
        return (
          <div>
            <div className="">
              <h1 className="py-4 text-2xl">Comments</h1>
              <section aria-labelledby="activity-title" className="">
                <div>
                  <div className="divide-y divide-gray-200">
                    <div className="pt-2">
                      <h6 className="inline-flex items-center text-sm font-medium text-blue-400 bg-blue-50 rounded-md py-1 px-2">
                        <ChatAltIcon className="h-5 w-5 text-blue-400 " />
                        <span className="px-2">Add Comment</span>
                      </h6>

                      {reviews.featured.map((review, reviewIdx) => (
                        <div
                          key={review.id}
                          className="flex text-sm text-gray-500 space-x-4 px-2"
                        >
                          <div className="flex-none py-3">
                            <img
                              src={review.avatarSrc}
                              alt=""
                              className="w-10 h-10 bg-gray-100 rounded-full"
                            />
                          </div>
                          <div
                            className={classNames(
                              reviewIdx === 0 ? "" : "border-t border-gray-200",
                              "py-3"
                            )}
                          >
                            <div className="flex flex-row justify-between items-center">
                              <h3 className="font-medium text-gray-900">
                                {review.author}
                              </h3>
                              <p>
                                <time dateTime={review.datetime}>
                                  {review.date}
                                </time>
                              </p>
                            </div>
                            <p className="sr-only">
                              {review.rating} out of 5 stars
                            </p>

                            <div
                              className="mt-4 prose prose-sm max-w-none text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case "Analysis":
        return (
          <div>
            <div className="p-2">
              <h1 className="py-4 text-2xl">Analysis</h1>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to see content.</div>;
    }
  };

  const renderContent = (selectedTab: any) => {
    const handleImageClick = (e: any) => {
      if (selectedTab === "Comments") {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCommentBox({ visible: true, x, y });
      }
    };

    const closeCommentBox = () => {
      setCommentBox({ visible: false, x: 0, y: 0 });
    };
    return (
      <div className="relative">
        <div
          className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative"
          onClick={handleImageClick}
        >
          <img
            src={products[0].imageSrc}
            alt={products[0].imageAlt}
            className="w-full object-center object-contain cursor-pointer"
          />
          {commentBox.visible && (
            <FloatingCommentBox
              x={commentBox.x}
              y={commentBox.y}
              onClose={closeCommentBox}
            />
          )}
        </div>

        <div className="my-4">
          <div className="flex flex-row justify-end items-end">
            <select
              id="asset"
              name="asset"
              className="inline-flex mx-3 items-center px-6 py-2 border text-gray-500 shadow-sm text-sm font-medium rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <option>More Options</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ShareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-screen flex">
        {/* Narrow sidebar */}
        <div className="hidden w-28 bg-gray-100 overflow-y-auto md:block">
          <div className="w-full py-6 flex flex-col items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/dashboard/media"
                className="text-white text-2xl font-bold"
              >
                <LuCircleX
                  className="h-8 w-8 text-indigo-500"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="flex-1 mt-6 w-full px-2 space-y-1">
              {sidebarNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedTab(item.name)}
                  className={classNames(
                    selectedTab === item.name
                      ? "bg-white text-indigo-600"
                      : "text-gray-500",
                    "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                  )}
                >
                  <item.icon
                    className={classNames(
                      selectedTab === item.name
                        ? "text-indigo-600"
                        : "text-gray-500",
                      "h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                      alt="Workflow"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="h-full flex flex-col">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              setSelectedTab(item.name);
                              setMobileMenuOpen(false);
                            }}
                            className={classNames(
                              selectedTab === item.name
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium w-full"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                selectedTab === item.name
                                  ? "text-white"
                                  : "text-indigo-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true" />
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-flow-col lg:gap-4 h-full">
            <div className="lg:col-span-1 lg:row-span-2 bg-white border-r border-gray-200 overflow-y-auto">
              {optionalContent()}
            </div>
            <div className="col-span-8 h-screen w-full p-6">
              {renderContent(selectedTab)}
            </div>
          </div>
        </div>
      </div>
      <UploadCustomizeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

function FloatingCommentBox({ x, y, onClose }: Props) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("Submitted comment:", comment);
    setComment("");
    onClose();
  };

  return (
    <div
      className="absolute bg-white shadow-lg rounded-lg p-3 w-80 z-50"
      style={{ top: y, left: x }}
    >
      {/* Close Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => {
            setComment("");
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <XIcon className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add Comment..."
        rows={3}
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-2 text-gray-500">
          <button>
            <LuBold className="h-4 w-4" />
          </button>
          <button>
            <LuItalic className="h-4 w-4" />
          </button>
          <button>
            <LuUnderline className="h-4 w-4" />
          </button>
          <button>
            <LuLink className="h-4 w-4" />
          </button>
          <button>
            <LuSmile className="h-4 w-4" />
          </button>
        </div>
        <div className="">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
