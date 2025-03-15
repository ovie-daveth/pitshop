"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useState, useLayoutEffect } from "react";
import { useUserState } from "@/api/context/UserContext";
import { useRolesState } from "@/api/context/RolesContext";

export default function Page() {
  const { users, onboardInvitedUsers, createInviteUsers, acceptInviteUsers } =
    useUserState();
  const { roles, getRoles } = useRolesState();

  useLayoutEffect(() => {
    getRoles();
  }, []);

  const [formDataA, setFormDataA] = useState({
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
  });

  const [formDataB, setFormDataB] = useState({
    status: "",
    reference: "",
  });

  const [formDataC, setFormDataC] = useState({
    email: "",
    reference: "",
    password: "",
  });

  const handleChangeA = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormDataA((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevData.roles, value]
            : prevData.roles.filter((role) => role !== value)
          : value,
    }));
  };

  const handleSubmitA = async (e: any) => {
    e.preventDefault();

    try {
      await createInviteUsers({
        email: formDataA.email,
        firstName: formDataA.firstName,
        lastName: formDataA.lastName,
        roles: formDataA.roles,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleChangeB = (e: any) => {
    const { name, value } = e.target;
    setFormDataB((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitB = async (e: any) => {
    e.preventDefault();

    try {
      await acceptInviteUsers({
        status: formDataB.status,
        reference: formDataB.reference,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleChangeC = (e: any) => {
    const { name, value } = e.target;
    setFormDataC((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitC = async (e: any) => {
    e.preventDefault();

    try {
      await onboardInvitedUsers({
        email: formDataC.email,
        reference: formDataC.reference,
        password: formDataC.password,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <div className=" bg-white">
              <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full ">
                  <div className="mt-12">
                    <div className=" grid grid-cols-2 gap-y-6 gap-x-10">
                      <form onSubmit={handleSubmitA} className="space-y-6">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                          Create Users
                        </h2>
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Firstname
                          </label>
                          <div className="mt-1">
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              autoComplete="firstName"
                              value={formDataA.firstName}
                              onChange={handleChangeA}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Lastname
                          </label>
                          <div className="mt-1">
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              autoComplete="lastName"
                              value={formDataA.lastName}
                              onChange={handleChangeA}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="text"
                              autoComplete="email"
                              value={formDataA.email}
                              onChange={handleChangeA}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Roles
                          </label>
                          <div className="mt-2 space-y-2">
                            {roles &&
                              roles.map((role) => (
                                <div
                                  key={role.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`role-${role.id}`}
                                    name="roles"
                                    type="checkbox"
                                    value={role.id}
                                    onChange={handleChangeA}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`role-${role.id}`}
                                    className="ml-2 text-sm text-gray-700"
                                  >
                                    {role.name}
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
                            Create User
                          </button>
                        </div>
                      </form>
                      <form onSubmit={handleSubmitB} className="space-y-6">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                          Accept Users
                        </h2>
                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Status
                          </label>
                          <div className="mt-1">
                            <input
                              id="status"
                              name="status"
                              type="text"
                              autoComplete="status"
                              value={formDataB.status}
                              onChange={handleChangeB}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="reference"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Reference
                          </label>
                          <div className="mt-1">
                            <input
                              id="reference"
                              name="reference"
                              type="text"
                              autoComplete="reference"
                              value={formDataB.reference}
                              onChange={handleChangeB}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            "
                          >
                            Accept Invite
                          </button>
                        </div>
                      </form>
                      <form onSubmit={handleSubmitC} className="space-y-6">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                          Onboard Users
                        </h2>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="text"
                              autoComplete="email"
                              value={formDataC.email}
                              onChange={handleChangeC}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="reference"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Reference
                          </label>
                          <div className="mt-1">
                            <input
                              id="reference"
                              name="reference"
                              type="text"
                              autoComplete="reference"
                              value={formDataC.reference}
                              onChange={handleChangeC}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="password"
                              value={formDataC.password}
                              onChange={handleChangeC}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                            "
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            "
                          >
                            Onboard User
                          </button>
                        </div>
                      </form>
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
