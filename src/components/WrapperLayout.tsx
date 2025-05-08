"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import logo from "../../public/logo.svg";
import icon from "../../public/logoicon.svg";
import {
  PuzzleIcon,
  ChartBarIcon,
  MenuAlt2Icon,
  XIcon,
} from "@heroicons/react/outline";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCalendarMonth, MdOutlineCampaign } from "react-icons/md";
import { PiRocketLaunchLight } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiDroplet } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Favicon from "../app/favicon.ico";
import BranchDropdown from "./drop-down-menu";
import BreadCrumb from "./breadcrumb";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
    description: "Overview of your workspace",
  },
  {
    name: "Media Libary",
    href: "/dashboard/media",
    icon: CiDroplet,
    description: "Manage Media Libary",
  },
  {
    name: "Ad Creatives",
    href: "/dashboard/ads-creatives",
    icon: PiRocketLaunchLight,
    description: " Manage Ads",
  },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: MdOutlineCampaign,
    description: "User roles and permissions",
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
    icon: PuzzleIcon,
    description: "Connect with other services",
  },
  {
    name: "Users & Access",
    href: "/dashboard/access",
    icon: HiOutlineUsers,
    description: "Analytics and reporting",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
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
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkIsTabletOrMobile = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches; // sm and below
    const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches; // md
    return isMobile || isTablet;
  };

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = path === item.href;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          "group relative flex items-center gap-x-3 rounded-lg px-3 py-3.5 text-sm font-medium transition-all duration-200 ease-in-out",
          isActive
            ? "bg-green-50 text-green-800"
            : "text-green-800 hover:bg-green-50",
            isOpen ? "" : "group relative"
        )}
      >
        <item.icon
          className={classNames(
            "h-5 w-5 flex-shrink-0 transition-colors duration-200",
            isActive ? "text-green-800" : "text-green-800 group-hover:text-green-900"
          )}
          aria-hidden="true"
        />
       <span
  className={classNames(
    "flex-1 text-sm transition-all duration-500 ease-in-out origin-left",
    isOpen
      ? "opacity-100 scale-100 ml-2 delay-200"
      : "opacity-0 scale-95 ml-0 w-0 overflow-hidden"
  )}
>
  {item.name}
</span>

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
                  <nav className="space-y-4">
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
        <motion.div
          initial={false}
          animate={{ width: isOpen ? 288 : 64 }} // 72px and 16px * 4 = 288px and 64px
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="hidden xl:fixed xl:inset-y-0 xl:flex xl:flex-col z-50 bg-white border-r border-gray-200"
        >

          <div className="flex flex-col flex-grow overflow-y-auto border-r border-gray-200 bg-white pb-4 z-50">
            <div className="flex items-center justify-center gap-x-3 px-4 py-4 primary-900 m-1 rounded-lg">
            <div className="text-[#4AE290] flex items-left gap-2">
                  <Image src={icon} alt="icon" width={30} height={30} className="w-7 h-9" />
                  <Image src={logo} alt="logo" width={150} height={150} className="w-32 mt-1" />
              </div>
            </div>
            <div onClick={() => setIsOpen(!isOpen)} className="bg-white absolute -right-3 top-5 rounded-full h-7 w-7 flex items-center justify-center z-50 shadow-md cursor-pointer">
             {
              isOpen ?  <ChevronDoubleLeftIcon className="w-4 h-4 font-light text-gray-500" /> :  <ChevronDoubleRightIcon className="w-4 h-4 font-light text-gray-500" />
             }
             
            </div>

            <div className="mt-6 flex flex-1 flex-col px-3">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </motion.div>

        <motion.div
          //  animate={{ paddingLeft: checkIsTabletOrMobile() ? 64 : (isOpen ? 288 : 64) }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className={`flex flex-1 flex-col z-50 ${isOpen ? "xl:pl-[288px] " : "xl:pl-[64px]"}`}
        >

          <div className="sticky top-0 z-20 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 justify-between items-center px-4">
              <div className="md:hidden flex"></div>
              <BreadCrumb />
              <div className="border border-gray-300 rounded-lg md:flex hidden items-center w-[30%]">
              <FiSearch className="ml-3 text-gray-800 text-sm" />
              <input 
                type="text" 
                placeholder="search" 
                className="w-full py-2.5 px-2 text-sm font-light border-none outline-none focus:ring-0 bg-transparent" 
              />
              </div>
              <div className="ml-4 flex items-center gap-5">
                <div className="lg:flex items-center gap-1 font-light text-sm hidden">
                  <span><MdOutlineCalendarMonth  /></span>
                  <span>25 April, 2025</span>
                </div>
                <BranchDropdown />
              </div>
            </div>
          </div>

          <main className="flex-1 bg-gray-100">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </>
  );
}