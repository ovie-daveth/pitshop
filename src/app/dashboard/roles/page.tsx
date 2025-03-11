"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useState, useLayoutEffect } from "react";
import Link from "next/link";

import { useRolesState } from "@/api/context/RolesContext";

export default function Page() {
  const { roles, getRoles } = useRolesState();

  useLayoutEffect(() => {
    getRoles();
    console.log(roles);
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((roles?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = roles
    ? roles.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            {roles ? (
              <>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Company
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the roles in your account including their
                        name, description, type, and external.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <Link
                        href="/dashboard/roles/create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      >
                        Add Roles
                      </Link>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle">
                        <div className="shadow-sm ring-1 ring-black ring-opacity-5">
                          <table
                            className="min-w-full border-separate"
                            style={{ borderSpacing: 0 }}
                          >
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                  ID
                                </th>
                                <th className="hidden px-3 py-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                  Company Name
                                </th>
                                <th className="hidden px-3 py-3 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                  Company Description
                                </th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                  Company Type
                                </th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                  External
                                </th>
                                <th className="px-3 py-3">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentData.map((person) => (
                                <tr key={person.id}>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                    {person.id}
                                  </td>
                                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {person.name}
                                  </td>
                                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {person.description}
                                  </td>
                                  <td className="px-3 py-4 text-sm text-gray-500">
                                    {person.type}
                                  </td>
                                  <td className="px-3 py-4 text-sm text-gray-500">
                                    {person.external}
                                  </td>
                                  <td className="px-3 py-4 text-sm font-medium text-right">
                                    <a
                                      href="#"
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      Edit
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg text-center font-bold text-gray-900">
                    No Roles found, please create a Role
                  </h2>
                </div>
              </>
            )}
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
