"use client"
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';
import { Step } from '../type';
import Link from 'next/link';


const SignUpForm = ({ setStepIndex, setCurrentStep }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>> }) => {

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    firstName: "",
    lastName: ""
  });

  const [error, setError] = useState({
    email: false,
    firstName: false,
    lastName: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { requestOtp } = useAuthState();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rememberMe: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: false,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForms = () => {
    if (formData.firstName === "") {
      setError((prevState) => ({
        ...prevState,
        firstName: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        firstName: "First Name is required",
      }));
      return false;
    }
    if (formData.lastName === "") {
      setError((prevState) => ({
        ...prevState,
        lastName: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        lastName: "Last Name is required",
      }));
      return false;
    }
    if (formData.firstName.length < 3) {
      setError((prevState) => ({
        ...prevState,
        firstName: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        firstName: "First Name must be at least 3 characters long",
      }));
      return false;
    }
    if (formData.lastName.length < 3) {
      setError((prevState) => ({
        ...prevState,
        lastName: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        lastName: "Last Name must be at least 3 characters long",
      }));
      return false;
    }
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(formData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("entered");
    setCurrentStep("verify-email")
    setStepIndex(2)
    // try {
    //   console.log(formData);
    //   setIsLoading(true);
    //   const isValid = validateForms();
    //   if (!isValid) {
    //     console.log("invalid form data");
    //     setIsLoading(false);
    //     return;
    //   }
    //   await requestOtp({
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     email: formData.email
    //   })
    //     .then((res) => {
    //       console.log("res", res);
    //       if (res) {
    //         setCurrentStep("verify-email")
    //         setStepIndex(3)
    //       } else {
    //         setIsLoading(false)
    //       }
    //     })
    //     .catch(() => {
    //       setIsLoading(false)
    //     })
    // } catch (error) {
    //   console.error("Signup failed:", error);
    //   setIsLoading(false)
    // }
  };

  const handlePrevStep = () => {
    setCurrentStep("welcome")
    setStepIndex(1)
  }


  return (
    <div className="">
      <div className="">
        <div className="text-left">
          <h1 className="text-3xl font-bold">Get started</h1>
          <p className="mt-2 text-gray-600">
            Welcome to Plumetrix! Let's kick things off by setting up your account.
          </p>
        </div>


        <form onSubmit={handleSubmit} className="mt-7 space-y-6">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-green-500 font-light"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
            {
              error.firstName && <span className="text-red-500 text-sm">{errorMessage.firstName}</span>
            }
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-green-500 font-light"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
            {
              error.lastName && <span className="text-red-500 text-sm">{errorMessage.lastName}</span>
            }
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-green-500 font-light"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {
              error.email && <span className="text-red-500 text-sm">{errorMessage.email}</span>
            }
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="rememberMe" 
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#3A6B6B] focus:ring-[#3A6B6B] border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-500">
                By creating an account you have agreed to{" "}
                <Link href="#" className="text-[#3A6B6B] hover:underline">
                  Plumetrix Terms & Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-4 w-full items-end md:gap-10 gap-4">
            <button onClick={handlePrevStep} className="text-[#3A6B6B] border p-3 rounded-full md:w-[20%] w-full">
              Go back
            </button>

            <div className='md:w-[80%] w-full'>
              <AuthButton title="Get Started" isLoading={isLoading} disabled={isLoading || (!formData.email || !formData.rememberMe)} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm


// <div className="flex flex-col lg:flex-row items-center gap-3">
// <div className="w-full">
//   <label className="block mt-7 text-sm font-medium">Password</label>
//   <div className="relative">
//     <input
//       type={showPassword ? "text" : "password"}
//       className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-green-500 font-light"
//       name="password"
//       value={formData.password}
//       onChange={handleChange}
//       placeholder="********"
//     />
//     <button
//       type="button"
//       className="absolute inset-y-0 right-3 flex items-center"
//       onClick={() => setShowPassword(!showPassword)}
//     >
//       {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//     </button>
//   </div>
// </div>
// <div className="w-full">
//   <label className="block mt-7 text-sm font-medium">Confirm Password</label>
//   <div className="relative">
//     <input
//       type={showConfirmPassword ? "text" : "password"}
//       className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-green-500 font-light"
//       name="confirm_password"
//       value={formData.confirm_password}
//       onChange={handleChange}
//       placeholder="********"
//     />
//     <button
//       type="button"
//       className="absolute inset-y-0 right-3 flex items-center"
//       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//     >
//       {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//     </button>
//   </div>
// </div>
// </div>
// {
// error.password && <span className="text-red-500 text-sm">{errorMessage.password}</span>
// }
// {
// error.confirm_password && <span className="text-red-500 text-sm">{errorMessage.confirm_password}</span>
// }