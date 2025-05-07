"use client";
import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";

import {
  KeyIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function Page() {
  const path = usePathname();
  const tabs = [
    {
      name: "General",
      href: "/dashboard/settings",
      current: path === "/dashboard/settings" ? true : false,
    },
    {
      name: "Integrations",
      href: "/dashboard/settings/integrations",
      current: path === "/dashboard/settings/integrations" ? true : false,
    },
    {
      name: "Teams Managements",
      href: "/dashboard/settings/teams",
      current: path === "/dashboard/settings/teams" ? true : false,
    },
    {
      name: "Roles Management",
      href: "/dashboard/settings/roles",
      current: path === "/dashboard/settings/roles" ? true : false,
    },
  ];

  const subNavigation = [
    {
      name: "Edit Profile",
      href: "/dashboard/settings",
      icon: UserCircleIcon,
      current: path === "/dashboard/settings" ? true : false,
    },
    //   { name: "Account", href: "#", icon: CogIcon, current: false },
    {
      name: "Password",
      href: "/dashboard/settings/password",
      icon: KeyIcon,
      current: path === "/dashboard/settings/password" ? true : false,
    },
    //   { name: "Notifications", href: "#", icon: BellIcon, current: false },
    //   { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
    {
      name: "Company",
      href: "/dashboard/settings/company",
      icon: ViewGridAddIcon,
      current: path === "/dashboard/settings/company" ? true : false,
    },
  ];

  const user = {
    name: "Debbie Lewis",
    handle: "deblewis",
    email: "debbielewis@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
  };

  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div className="w-full h-screen">
            <div className="bg-white">
              <div className="">
                <div className="relative mx-auto md:px-8 xl:px-0">
                  <div className="pt-10 pb-16">
                    <div className="px-4 sm:px-6 md:px-0">
                      <h1 className="text-3xl font-extrabold text-gray-900">
                        Account Settings
                      </h1>
                    </div>
                    <div className="px-4 sm:px-6 md:px-0">
                      <div className="py-6">
                        {/* Tabs */}
                        <div className="lg:hidden">
                          <label htmlFor="selected-tab" className="sr-only">
                            Select a tab
                          </label>
                          <select
                            id="selected-tab"
                            name="selected-tab"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue={
                              tabs.find((tab) => tab.current)?.name || ""
                            }
                          >
                            {tabs.map((tab) => (
                              <option key={tab.name}>{tab.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="hidden lg:block">
                          <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                              {tabs.map((tab) => (
                                <Link
                                  key={tab.name}
                                  href={tab.href}
                                  className={classNames(
                                    tab.current
                                      ? "border-indigo-500 text-indigo-600"
                                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                  )}
                                >
                                  {tab.name}
                                </Link>
                              ))}
                            </nav>
                          </div>
                        </div>
                        <div className=" grid grid-cols-12 divide-y-0 divide-x">
                          <aside className="py-6 col-span-2">
                            <nav className="space-y-1">
                              {subNavigation.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-50 border-indigo-500 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                                      : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                                    "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-500 group-hover:text-indigo-500"
                                        : "text-gray-400 group-hover:text-gray-500",
                                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="truncate">{item.name}</span>
                                </Link>
                              ))}
                            </nav>
                          </aside>
                          <div className="col-span-9 px-6">
                            <form
                              className="divide-y divide-gray-200 lg:col-span-9"
                              action="#"
                              method="POST"
                            >
                              <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                <div>
                                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                                    Passwords
                                  </h2>
                                  <p className="mt-1 text-sm text-gray-500">
                                    This information will be encrypted using our
                                    system preventing your data from being
                                    accessible by the public
                                  </p>
                                </div>

                                <div className="mt-6 grid grid-cols-12 gap-6">
                                  <div className="col-span-12">
                                    <label
                                      htmlFor="current-password"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Current Password
                                    </label>
                                    <input
                                      type="text"
                                      name="current-password"
                                      id="current-password"
                                      autoComplete="current-password"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                    />
                                  </div>

                                  <div className="col-span-12">
                                    <label
                                      htmlFor="new-password"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      New Password
                                    </label>
                                    <input
                                      type="text"
                                      name="new-password"
                                      id="new-password"
                                      autoComplete="new-password"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                    />
                                  </div>

                                  <div className="col-span-12">
                                    <label
                                      htmlFor="confirm-password"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Confirm New Password
                                    </label>
                                    <input
                                      type="text"
                                      name="confirm-password"
                                      id="confirm-password"
                                      autoComplete="confirm-password"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                                  <button
                                    type="button"
                                    className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="ml-5 bg-indigo-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
