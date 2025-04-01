"use client";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useAuthState } from "../../api/context/AuthContext/index";
import { useState } from "react";
import OtpInput from "react-otp-input";

export default function Page() {
  const { signup, resendOtp } = useAuthState();

  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleChange = (e: any) => {
    if (typeof e === "string") {
      setFormData((prevData) => ({
        ...prevData,
        otp: e,
      }));
    } else {
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
      await signup({
        otp: formData.otp,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Authentication
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Kindly enter the 6-digit verification code sent to your email to
              verify your account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* 6-Digit Verification Code Field */}
            <div className="text-start my-2">
              <label className="block text-sm font-medium my-2 text-gray-700">
                6-Digit Verification Code
              </label>
              <div className="flex justify-start items-start">
                <OtpInput
                  value={formData.otp}
                  inputType="number"
                  onChange={(otp) => handleChange(otp)}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props: any) => <input {...props} />}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.5rem",
                    fontSize: "1.5rem",
                    borderRadius: "6px",
                    textAlign: "center",
                    border: "1px solid #ced4da",
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <ArrowCircleRightIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Verify
              </button>
            </div>
          </form>
          <div
            className="w-full  text-base font-medium my-4 cursor-pointer text-right text-indigo-600 hover:text-indigo-500"
            onClick={() => resendOtp()}
            typeof="button"
          >
            Resend
          </div>
        </div>
      </div>
    </>
  );
}
