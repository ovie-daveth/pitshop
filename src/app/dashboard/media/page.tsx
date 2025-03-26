"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import {
  CursorClickIcon,
  CloudUploadIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const menuNavigation = [
  { name: "View Summary", href: "#" },
  { name: "Open full view", href: "#" },
  { name: "Edit  Metadata", href: "#" },
  { name: "Delete", href: "#" },
];

const filters = [
  {
    id: "Approval Status",
    name: "Approval Status",
    options: [
      { value: "accepted", label: "Accepted" },
      { value: "rejected", label: "Rejected" },
    ],
  },
  {
    id: "Display Name",
    name: "Display Name",
    options: [
      { value: "start with", label: "Start With" },
      { value: "Equal to", label: "Equal to" },
    ],
  },
  {
    id: "Tag",
    name: "Tag",
    options: [
      { value: "today", label: "Today" },
      { value: "7days", label: "Last 7 days" },
    ],
  },
  {
    id: "SKU",
    name: "SKU",
    options: [
      { value: "today", label: "Today" },
      { value: "7days", label: "Last 7 days" },
    ],
  },
  {
    id: "Dimensions",
    name: "Dimensions",
    options: [
      { value: "9:16", label: "9:16" },
      { value: "post/story", label: "Post / Story" },
      { value: "feed/story", label: "Post / Story" },
      { value: "1x1 / 9x16", label: "1x1/9x16" },
      { value: "1:1 / 9:16", label: "1:1/9:16" },
      { value: "1.1 / 9.16", label: "1.1/9.16" },
      { value: "4x5 / 9x16", label: "4x5/9x16" },
      { value: "4:5 / 9:16", label: "4:5/9:16" },
    ],
  },
  {
    id: "Upload Date",
    name: "Upload Date",
    options: [
      { value: "today", label: "Today" },
      { value: "7days", label: "Last 7 days" },
      { value: "30days", label: "Last 30 days" },
      { value: "90days", label: "Last 90 days" },
      { value: "year", label: "This Year" },
      { value: "customer", label: "Custom" },
    ],
  },
];

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
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "Nomad Tumbler.mp4",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "Focus Paper Refill.jpg",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "Machined Mechanical Pencil.jpg",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Venus X",
    href: "#",
    price: "VenusXBottle.jpg",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Tiin Toma",
    href: "#",
    price: "TinTomass.mp4",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 7,
    name: "Drey Thomps",
    href: "#",
    price: "Drey Thompson.mp4",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 8,
    name: "Shoupe Dilla",
    href: "#",
    price: "Shoupe Drainee.jpg",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];
export default function Page() {
  const product = {
    name: "Zip Tote Basket",
    price: "$220",
    rating: 3.9,
    href: "#",
    description:
      "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg",
    imageAlt: "Back angled view with bag open and handles to the side.",
    colors: [
      {
        name: "Washed Black",
        bgColor: "bg-gray-700",
        selectedColor: "ring-gray-700",
      },
      { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
      {
        name: "Washed Gray",
        bgColor: "bg-gray-500",
        selectedColor: "ring-gray-500",
      },
    ],
  };
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const tabs = [
    { name: "All", href: "#", current: true },
    { name: "Images", href: "#", current: false },
    { name: "Videos", href: "#", current: false },
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
      Dimensions: "4032 x 3024",
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900 pt-5">
                Media Library
              </h1>
            </div>
          </div>

          <>
            <div>
              <div className="flex justify-between items-center mt-4">
                {/* <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  defaultValue={
                    tabs.find((tab) => tab.current)?.name || tabs[0].name
                  }
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div> */}
                <div className="block">
                  <nav
                    className="flex space-x-4 bg-gray-200 p-2 rounded-md"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "bg-white text-indigo-500"
                            : "text-gray-500",
                          "py-2 px-14 text-gray-500 font-medium text-sm rounded-md"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="flex justify-evenly items-center">
                  <select
                    id="asset"
                    name="asset"
                    className="inline-flex  mx-3 items-center px-6 py-2 border text-gray-500 shadow-sm text-sm font-medium rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <option>Import Assets</option>
                    <option>Can view</option>
                  </select>
                  <button
                    onClick={() => {
                      setOpenModal2(true);
                    }}
                    type="button"
                    className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <CloudUploadIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Upload Assets
                  </button>
                </div>
              </div>
              <div className="">
                {/* filter dialog */}
                <Transition.Root show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 sm:hidden"
                    onClose={setOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                        <div className="px-4 flex items-center justify-between">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <button
                            type="button"
                            className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4">
                          {filters.map((section) => (
                            <Disclosure
                              as="div"
                              key={section.name}
                              className="border-t border-gray-200 px-4 py-6"
                            >
                              {({ open }) => (
                                <>
                                  <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 border-2 border-gray-900 outline-none rounded-md">
                                      <span className="font-medium text-gray-900">
                                        {section.name}
                                      </span>
                                      <span className="ml-6 flex items-center">
                                        <ChevronDownIcon
                                          className={classNames(
                                            open ? "-rotate-180" : "rotate-0",
                                            "h-5 w-5 transform"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                      {section.options.map(
                                        (option, optionIdx) => (
                                          <div
                                            key={option.value}
                                            className="flex items-center"
                                          >
                                            <input
                                              id={`filter-mobile-${section.id}-${optionIdx}`}
                                              name={`${section.id}[]`}
                                              defaultValue={option.value}
                                              type="checkbox"
                                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                              className="ml-3 text-sm text-gray-500"
                                            >
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </form>
                      </div>
                    </Transition.Child>
                  </Dialog>
                </Transition.Root>

                <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
                  <section aria-labelledby="filter-heading" className="py-6">
                    <h2 id="filter-heading" className="sr-only">
                      Product filters
                    </h2>

                    <div className="flex items-center justify-between">
                      <Menu
                        as="div"
                        className="relative z-10 inline-block text-left"
                      >
                        {/* <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <a
                                      href={option.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm font-medium text-gray-900"
                                      )}
                                    >
                                      {option.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition> */}
                      </Menu>

                      <button
                        type="button"
                        className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                        onClick={() => setOpen(true)}
                      >
                        Filters
                      </button>

                      <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                        {filters.map((section, sectionIdx) => (
                          <Popover
                            as="div"
                            key={section.name}
                            id="desktop-menu"
                            className="relative z-10 inline-block text-left"
                          >
                            <div>
                              <Popover.Button className="group inline-flex items-center justify-center py-2 px-3 text-sm font-medium rounded-md text-gray-700  outline-none ring-2 ring-gray-200">
                                <span>{section.name}</span>
                                {sectionIdx === 0 ? (
                                  <span className=""></span>
                                ) : null}
                                <ChevronDownIcon
                                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <form className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </form>
                              </Popover.Panel>
                            </Transition>
                          </Popover>
                        ))}
                      </Popover.Group>
                    </div>
                  </section>
                </div>
              </div>
              <div>
                <section
                  aria-labelledby="products-heading"
                  className="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        <div key={product.id} className="group">
                          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="w-full h-full object-center object-cover group-hover:opacity-75"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="mt-4 text-sm text-gray-700">
                                {product.name}
                              </h3>
                              <p className="mt-1 text-xs font-medium text-gray-900">
                                {product.price}
                              </p>
                            </div>
                            <div>
                              <Menu as="div" className="ml-3 relative">
                                <div className="inline-flex justify-center items-center">
                                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <CursorClickIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {menuNavigation.map((item) => (
                                      <Menu.Item key={item.name}>
                                        {({ active }) => (
                                          <Link
                                            onClick={() => {
                                              // if (item.name === "Sign out") {
                                              //   logout();
                                              // }
                                            }}
                                            href={item.href}
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                          >
                                            {item.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    ))}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </>
          {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <div>
                <div className="text-center">
                  <svg
                    className="mx-auto h-20 w-20 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No media uploaded yet!
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by adding your assets to organize and prepare them for
                    your campaign
                  </p>
                  <div className="mt-6 flex justify-evenly items-center">
                    <select
                      id="asset"
                      name="asset"
                      className="inline-flex items-center px-6 py-2 border text-gray-500 shadow-sm text-sm font-medium rounded-md bg-transparent  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <option>Import Assets</option>
                      <option>Can view</option>
                    </select>
                    <button
                      type="button"
                      className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <CloudUploadIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Upload Assets
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div> */}

          <Transition.Root show={openModal} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={() => setOpenModal(false)}
            >
              <div
                className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
                style={{ fontSize: 0 }}
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
                  <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden md:inline-block md:align-middle md:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <div className="flex text-base text-left transform transition md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                    <div className="relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                      <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                        onClick={() => setOpenModal(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <div className="flex flex-col justify-center items-center mt-10">
                        <img
                          src={currentFile.source}
                          alt=""
                          className="w-96 h-96 object-cover rounded-xl"
                        />
                        <div className="mt-4 flex flex-row items-center justify-between w-full">
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              {currentFile.name}
                            </h2>
                            <p className="text-sm font-medium text-gray-500">
                              {currentFile.size}
                            </p>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <HeartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Favorite</span>
                            </button>
                          </div>
                        </div>

                        <div className="w-full py-4">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              Summary
                            </h3>
                            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                              {Object.keys(currentFile.information).map(
                                (key) => (
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
                                )
                              )}
                            </dl>
                          </div>

                          <section
                            aria-labelledby="options-heading"
                            className="mt-6"
                          >
                            <h3 id="options-heading" className="sr-only">
                              Product options
                            </h3>

                            <form>
                              <p className="absolute top-4 left-4 text-center sm:static sm:mt-6">
                                <Link
                                  href={`/dashboard/media/${products[0].id}`}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  View full details
                                </Link>
                              </p>
                            </form>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <Transition.Root show={openModal2} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={() => setOpenModal2(false)}
            >
              <div
                className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
                style={{ fontSize: 0 }}
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
                  <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden md:inline-block md:align-middle md:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <div className="flex bg-white rounded-xl text-base max-w-5xl w-full mx-auto text-left shadow-2xl transform transition md:inline-block  md:px-4 md:my-8 md:align-middle">
                    <div className="flex justify-between items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Upload Your Creative Assets
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          You can upload images, videos, and text-based assets
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className=" text-gray-400 hover:text-gray-500"
                          onClick={() => setOpenModal2(false)}
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className=" px-4 py-5  border-t sm:p-6">
                        <div className="md:grid md:grid-cols-12 md:gap-6">
                          <div className="mt-5 md:mt-0 md:col-span-12">
                            <form
                              className="space-y-6"
                              action="#"
                              method="POST"
                            >
                              <fieldset>
                                <div>
                                  <legend className="text-base font-medium text-gray-900">
                                    Distribute media into assets
                                  </legend>
                                </div>
                                <div className="my-2 inline-flex flex-row items-center ">
                                  <div className="flex items-center mr-2">
                                    <input
                                      id="push-everything"
                                      name="push-notifications"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label
                                      htmlFor="push-everything"
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      One asset per item
                                    </label>
                                  </div>
                                  <div className="flex items-center mr-2">
                                    <input
                                      id="push-email"
                                      name="push-notifications"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label
                                      htmlFor="push-email"
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Group assets by name
                                    </label>
                                  </div>
                                </div>
                              </fieldset>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Upload
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                  <div className="space-y-1 text-center">
                                    <svg
                                      className="mx-auto h-52 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                      <span className="">
                                        Drag & drop your files here or
                                      </span>
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium outline-none"
                                      >
                                        <span className="text-indigo-600 px-1">
                                          click Browse Files{" "}
                                        </span>
                                        <input
                                          id="file-upload"
                                          name="file-upload"
                                          type="file"
                                          className="sr-only"
                                        />
                                      </label>
                                      <span className="pl-1">
                                        to select from your device
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      Supports PNG, JPG, MP4, and more (Max
                                      size: 500MB per file)
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end border-t">
                                <button
                                  type="button"
                                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
