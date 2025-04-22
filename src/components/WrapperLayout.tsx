"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  ShieldCheckIcon,
  PhotographIcon,
  PuzzleIcon,
  ChartBarIcon,
  MenuAlt2Icon,
  XIcon,
} from "@heroicons/react/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Favicon from "../app/favicon.ico";
import BranchDropdown from "./drop-down-menu";
import BreadCrumb from "./breadcrumb";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Overview of your workspace",
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
    description: "Manage team members",
  },
  {
    name: "Company",
    href: "/dashboard/company",
    icon: FolderIcon,
    description: "Company settings and details",
  },
  {
    name: "Roles",
    href: "/dashboard/roles",
    icon: ShieldCheckIcon,
    description: "User roles and permissions",
  },
  {
    name: "Media Library",
    href: "/dashboard/media",
    icon: PhotographIcon,
    description: "Manage your media files",
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
    icon: PuzzleIcon,
    description: "Connect with other services",
  },
  {
    name: "Reports",
    href: "#",
    icon: ChartBarIcon,
    description: "Analytics and reporting",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = path === item.href;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          "group relative flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
          isActive
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-700 hover:bg-gray-50"
        )}
      >
        <item.icon
          className={classNames(
            "h-5 w-5 flex-shrink-0 transition-colors duration-200",
            isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
          )}
          aria-hidden="true"
        />
        <span className="flex-1">{item.name}</span>
        {item.description && (
          <div className="absolute left-full ml-4 hidden w-48 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 lg:group-hover:block">
            {item.description}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      <div>
      {mounted && (
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />
            </Transition.Child>

            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
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
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex items-center gap-x-3 px-4">
                  <Image src={Favicon} alt="Pitstop Logo" className="h-8 w-auto" />
                  <span className="text-2xl font-bold text-gray-900">Pitstop</span>
                </div>

                <div className="mt-8 flex-1 px-3">
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <NavLink key={item.name} item={item} />
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      )}

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-64 xl:flex-col">
          <div className="flex flex-col flex-grow overflow-y-auto border-r border-gray-200 bg-white pb-4">
            <div className="flex items-center gap-x-3 px-4 py-5">
              <Image
                src={Favicon}
                alt="Pitstop Logo"
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900">Pitstop</span>
            </div>

            <div className="mt-6 flex flex-1 flex-col px-3">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col xl:pl-64 z-50 ">
          <div className="sticky top-0 z-50 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 justify-between px-4">
              <BreadCrumb />
              <div className="ml-4 flex items-center">
                <BranchDropdown />
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}