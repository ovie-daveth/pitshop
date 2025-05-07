"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useState, useLayoutEffect } from "react";
import { useRolesState } from "@/api/context/RolesContext";

export default function Page() {
  const { createRoles, getRolesPermissions, permissions } = useRolesState();

  useLayoutEffect(() => {
    getRolesPermissions();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData: any) => ({
        ...prevData,
        permissions: checked
          ? [...prevData.permissions, value]
          : prevData.permissions.filter((perm: any) => perm !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createRoles({
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <div className="min-h-full flex h-screen bg-white">
              <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div className="mt-8 mb-10">
                    <div className="mt-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create Roles
                          </h2>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="permissions"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Permissions
                          </label>
                          <div className="mt-2 space-y-2">
                            {permissions &&
                              permissions.map((p: any) => (
                                <div key={p.id} className="flex items-center">
                                  <input
                                    id={`permission-${p.id}`}
                                    name="permissions"
                                    type="checkbox"
                                    value={p.id}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`permission-${p.id}`}
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    {p.name}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create Role
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative w-0 flex-1">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
