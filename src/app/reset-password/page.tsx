"use client";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuthState } from "../../api/context/AuthContext/index";
import { useState } from "react";
import OtpInput from "react-otp-input";

export default function Page() {
  const { resendOtp, resetPassword } = useAuthState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });

  const handleChange = (e: any) => {
    if (typeof e === "string") {
      // Handling OTP input separately
      setFormData((prevData) => ({
        ...prevData,
        token: e, // Directly updating OTP value
      }));
    } else {
      // Handling other form fields
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(formData);
      await resetPassword({
        email: formData.email,
        token: formData.token,
        password: formData.password,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <div className="min-h-full h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              No worries, we’ll send you reset instructions
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* 6-Digit Verification Code Field */}
            <div className="text-start my-2">
              <label className="block text-sm font-medium my-2 text-gray-700">
                6-Digit Verification Code
              </label>
              <div className="flex justify-start items-start">
                <OtpInput
                  value={formData.token}
                  inputType="number"
                  onChange={(otp) => handleChange(otp)}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props: any) => <input {...props} />}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.5rem",
                    fontSize: "1.2rem",
                    borderRadius: "6px",
                    textAlign: "center",
                    border: "1px solid #ced4da",
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Reset Password
              </button>
            </div>
          </form>

          {/* <div
            className="w-full  text-base font-medium my-4 cursor-pointer text-right text-indigo-600 hover:text-indigo-500"
            onClick={() => resendOtp()}
            typeof="button"
          >
            Resend
          </div> */}
        </div>
      </div>
    </>
  );
}
