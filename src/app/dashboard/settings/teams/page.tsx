"use client";
import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  TrashIcon,
  MenuIcon,
  UserCircleIcon,
  PaperClipIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function Page() {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

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
                        <div className="">
                          <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6 py-4">
                              <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Members
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-600">
                                    Type an email of the teammate you want to
                                    invite, manage user permissions, remove
                                    users.
                                  </p>
                                </div>
                              </div>
                              <div className="mt-5 md:mt-0 md:col-span-2">
                                <form
                                  action="#"
                                  method="POST"
                                  className="border border-gray-200 rounded-md "
                                >
                                  <dl className="divide-y divide-gray-200 px-3">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500 sm:col-span-2 text-center">
                                        <div className="mt-1">
                                          <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="focus:ring-indigo-500 px-2 py-3 focus:border-indigo-500 block w-full sm:text-sm border border-gray-600 rounded-md"
                                            placeholder="you@example.com"
                                            aria-describedby="email-optional"
                                          />
                                        </div>
                                      </dt>
                                      <dd className="mt-1 flex justify-center items-center text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                        <span className="ml-4 flex-shrink-0">
                                          <button
                                            type="submit"
                                            className="ml-5 bg-indigo-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                          >
                                            Invite Users
                                          </button>
                                        </span>
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
                                        <p className="text-base">
                                          James Stanford
                                        </p>
                                        <span className="text-xs">
                                          jamesstandford@gmail.com
                                        </span>
                                      </dt>
                                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                        <span className="flex-grow">
                                          <select
                                            id="location"
                                            name="location"
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            defaultValue="Staff"
                                          >
                                            <option>Admin</option>
                                            <option>Staff</option>
                                            <option>Collaborator</option>
                                          </select>
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                          <button
                                            type="button"
                                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          >
                                            <TrashIcon className="w-8 h-" />
                                          </button>
                                        </span>
                                      </dd>
                                    </div>
                                  </dl>
                                </form>
                              </div>
                            </div>
                          </div>

                          <div className="hidden sm:block" aria-hidden="true">
                            <div className="py-5">
                              <div className="border-t border-gray-200" />
                            </div>
                          </div>

                          <div className="mt-10 sm:mt-0">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                              <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Pending Invites
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-600">
                                    Users that have not yet responded to your
                                    invitation
                                  </p>
                                </div>
                              </div>
                              <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" method="POST">
                                  <ul
                                    role="list"
                                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                                  >
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon
                                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          jamesstandford@gmail.com
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0 flex space-x-4">
                                        {/* <button
                                          type="button"
                                          className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Update
                                        </button>
                                        <span
                                          className="text-gray-300"
                                          aria-hidden="true"
                                        >
                                          |
                                        </span> */}
                                        <button
                                          type="button"
                                          className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Cancel Invite
                                        </button>
                                      </div>
                                    </li>
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                      <div className="w-0 flex-1 flex items-center">
                                        <PaperClipIcon
                                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                        <span className="ml-2 flex-1 w-0 truncate">
                                          jamesstandford@gmail.com
                                        </span>
                                      </div>
                                      <div className="ml-4 flex-shrink-0 flex space-x-4">
                                        {/* <button
                                          type="button"
                                          className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Update
                                        </button>
                                        <span
                                          className="text-gray-300"
                                          aria-hidden="true"
                                        >
                                          |
                                        </span> */}
                                        <button
                                          type="button"
                                          className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                          Cancel Invite
                                        </button>
                                      </div>
                                    </li>
                                  </ul>
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
            </div>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
