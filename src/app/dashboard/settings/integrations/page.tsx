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
  MenuIcon,
  UserCircleIcon,
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

  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
  ];

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
                          <div className="bg-white">
                            <div className="max-w-3xl mx-auto  sm:px-6 lg:max-w-7xl lg:px-8">
                              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {/* {products.map((product) => (
                                  <div
                                    key={product.id}
                                    className="group relative"
                                  >
                                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                      <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                      />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                      <div>
                                        <h3 className="text-sm text-gray-700">
                                          <a href={product.href}>
                                            <span
                                              aria-hidden="true"
                                              className="absolute inset-0"
                                            />
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.color}
                                        </p>
                                      </div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {product.price}
                                      </p>
                                    </div>
                                  </div>
                                ))} */}
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
