"use client";
import { PiAppleLogoFill } from "react-icons/pi";
import Image from "next/image";
import Favicon from "../favicon.ico";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useAuthState } from "../../api/context/AuthContext/index";

export default function Page() {
  const { requestOtp } = useAuthState();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData);
      await requestOtp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        otp: "",
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <div className="min-h-full flex h-screen bg-white">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                src={Favicon}
                alt="Pitstop Logo"
                className="h-12 w-auto inline-flex"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-700">
                Start Everything, Your All in One Pitstop Management
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Firstname
                    </label>
                    <div className="mt-1">
                      <input
                        name="firstName"
                        type="text"
                        autoComplete="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lastname
                    </label>
                    <div className="mt-1">
                      <input
                        name="lastName"
                        type="text"
                        autoComplete="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="font-medium text-gray-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-between my-6">
                <div className="flex items-center">
                  <p>Have an account already?</p>
                </div>

                <div className="text-sm">
                  <Link
                    href="/signin"
                    className="font-medium text-gray-600 hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center grid grid-cols-1 gap-4  md:grid-cols-2 xl:gap-5 xl:pb-8">
              <button className="flex justify-center items-center flex-col py-2 outline rounded-xl border border-gray-100">
                <PiAppleLogoFill className=" h-8 w-8 shrink-0" />
                <span className="truncate text-sm">Sign in With Apple</span>
              </button>
              <button className="flex justify-center items-center flex-col py-2 outline rounded-xl border border-gray-100">
                <FcGoogle className=" h-8 w-8 shrink-0" />
                <span className="truncate text-sm">Sign in With Google</span>
              </button>
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
    </>
  );
}
