"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useState, useLayoutEffect } from "react";
import Link from "next/link";

import { useUserState } from "@/api/context/UserContext";

export default function Page() {
  const { users, getAllUsers } = useUserState();

  useLayoutEffect(() => {
    getAllUsers();
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = users
    ? users.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            {users ? (
              <>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Users
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their
                        name, description, type, and external.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                      <Link
                        href="/dashboard/users/create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                      >
                        Add User
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
                                  Firstname
                                </th>
                                <th className="hidden px-3 py-3 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                  Lastname
                                </th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                  Email
                                </th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {currentData.map((person) => (
                                <tr key={person.id}>
                                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                    {person.id}
                                  </td>
                                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {person.user.firstName}
                                  </td>
                                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {person.user.lastName}
                                  </td>
                                  <td className="px-3 py-4 text-sm text-gray-500">
                                    {person.user.email}
                                  </td>
                                  <td className="px-3 py-4 text-sm font-medium text-left">
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
                    No Users found, please invite a user
                  </h2>
                  <Link
                    href="/dashboard/users/create"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Add User
                  </Link>
                </div>
              </>
            )}
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
