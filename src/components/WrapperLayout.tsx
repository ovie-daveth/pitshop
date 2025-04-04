"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useAuthState } from "@/api/context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Favicon from "../app/favicon.ico";
import BranchDropdown from "./drop-down-menu";

const userNavigation = [
  { name: "Your Profile", href: "/dashboard/settings" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Sign out", href: "/" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuthState();

  const path = usePathname();
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      current: path === "/dashboard" ? true : false,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: UsersIcon,
      current: path === "/dashboard/users" ? true : false,
    },
    {
      name: "Company",
      href: "/dashboard/company",
      icon: FolderIcon,
      current: path === "/dashboard/company" ? true : false,
    },
    {
      name: "Roles",
      href: "/dashboard/roles",
      icon: CalendarIcon,
      current: path === "/dashboard/roles" ? true : false,
    },
    {
      name: "Media Library",
      href: "/dashboard/media",
      icon: PhotographIcon,
      current: path === "/dashboard/media" ? true : false,
    },
    {
      name: "Integrations",
      href: "/dashboard/integrations",
      icon: InboxIcon,
      current: path === "/dashboard/integrations" ? true : false,
    },
    { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  ];

  return (
    <>
      <>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 md:hidden"
              onClose={setSidebarOpen}
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
                {/* <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" /> */}
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
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex items-start justify-start px-3">
                    <div>
                      <Image
                        src={Favicon}
                        alt="Pitstop Logo"
                        className="h-8 w-auto"
                      />
                    </div>
                    <div className="text-3xl font-bold text-gray-700 px-2 text-center">
                      Pitstop
                    </div>
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-indigo-600 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-8 w-8"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
              <div className="flex items-start justify-start px-3">
                <div>
                  <Image
                    src={Favicon}
                    alt="Pitstop Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="text-3xl font-bold text-gray-700 px-2 text-center">
                  Pitstop
                </div>
              </div>

              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-indigo-600"
                            : "text-indigo-600 group-hover:text-gray-500 ",
                          "mr-3 flex-shrink-0 h-8 w-8"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="md:pl-64 flex flex-col flex-1">
            <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search-field"
                        className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>

                <div className="w-full max-w-md">
                 <BranchDropdown />
                </div>
              </div>
            </div>

            <main className="flex-1">
              <div className="py-2">
                <div className="max-w-7xl mx-auto px-2">
                  <main className="">{children}</main>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    </>
  );
}
