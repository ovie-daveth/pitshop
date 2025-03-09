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

  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Courtney Henry",
      title: "Designer",
      email: " courtney.henry@example.com",
      role: "Admin",
    },
    {
      name: "Tom Cook",
      title: "Director of Engineering",
      email: "tom.cook@example.com",
      role: "Admin",
    },
    {
      name: "John Smith",
      title: "Product Manager",
      email: "john.smith",
      role: "Member",
    },
    {
      name: "Leslie Alexander",
      title: "Co-Founder / CEO",
      email: " leslie.alexander@example.com",
      role: "Admin",
    },
    {
      name: "Henry Black",
      title: "Designer",
      email: "black.henry@example.com",
      role: "Admin",
    },
    // More people...
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
                          <div className="col-span-9 p-6">
                            <div className="px-4 sm:px-6 lg:px-8">
                              <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto"></div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                  >
                                    Create Company
                                  </button>
                                </div>
                              </div>
                              <div className="mt-8 flex flex-col">
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                  <div className="inline-block min-w-full py-2 align-middle">
                                    <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                                      <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th
                                              scope="col"
                                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                            >
                                              Name
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                              Title
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                              Email
                                            </th>
                                            <th
                                              scope="col"
                                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                              Role
                                            </th>
                                            <th
                                              scope="col"
                                              className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                                            >
                                              <span className="sr-only">
                                                Edit
                                              </span>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                          {people.map((person) => (
                                            <tr key={person.email}>
                                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {person.name}
                                              </td>
                                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {person.title}
                                              </td>
                                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {person.email}
                                              </td>
                                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {person.role}
                                              </td>
                                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                <a
                                                  href="#"
                                                  className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                  Edit
                                                  <span className="sr-only">
                                                    , {person.name}
                                                  </span>
                                                </a>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
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
              </div>
            </div>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
