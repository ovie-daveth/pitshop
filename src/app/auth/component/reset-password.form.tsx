import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';
import { Step } from '../type';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassWordForm = ({ setStepIndex, setCurrentStep, isSignUP }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>, isSignUP: boolean }) => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const { resetPassword, signup } = useAuthState();

  const [errorMessage, setErrorMessage] = useState({
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    password: false,
    confirm_password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

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
  }

  const passwordStrength = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
  }

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every(Boolean) && formData.password === formData.confirm_password
  }

  const validateForms = () => {
    if (formData.password !== formData.confirm_password) {
      setError((prevState) => ({
        ...prevState,
        confirm_password: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        confirm_password: "Password and Confirm Password do not match",
      }));

      return false;
    }
    if (formData.password.length < 6) {
      setError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        password: "Password must be at least 6 characters long",
      }));
      return false;
    }

    const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!password_regex.test(formData.password)) {
      setError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        password: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }));
      return false;
    }


    return true;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateForms();
    if (!isValid) return;
    setIsLoading(true);

    try {


      if(isSignUP){
        const request = {
          password: formData.password,
          otp: parseInt(sessionStorage.getItem("id") as string)
        }

        await signup(request)
        .then((res) => {
          if(res){
            localStorage.setItem("stepIndex", "4")
            localStorage.setItem("currentStep", "create-company")
            setCurrentStep("create-company")
            setStepIndex(4)
          }
        })
      }
      // await resetPassword({
      //   email: sessionStorage.getItem("email") as string,
      //   password: formData.password,
      //   token: parseInt(sessionStorage.getItem("id") as string),

      // })
      // })
      //   .then((res: any) => {
      //     if (res) {
          
      //     }
      //   }
      //   )
      //   .catch(() => {
      //     setIsLoading(false);

      //   });
      
    } catch (error) {
      setIsLoading(false);
      console.error("Signup failed:", error);
    }
  };

  const handlePrevStep = () => {
    if(isSignUP){
      setCurrentStep("personal-info")
      setStepIndex(1)
    }
  }
  return (
    <div className="w-full text-left">
    <div>
        <h1 className="lg:text-3xl text-xl font-bold">Set up your password</h1>
        <p className="mt-2 text-gray-600 lg:text-base text-sm">To secure your account, please create a strong password.</p>
      </div>
     
      <form onSubmit={handleSubmit} className="mt-7">
        <div className="space-y-8">
          <div className='space-y-3'>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none placeholder:text-gray-400 focus:border-green-500 font-light lg:text-base text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
              <div
                className={`flex items-center gap-1 rounded-full py-1 px-2  ${passwordStrength.minLength ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
              >
                {passwordStrength.minLength ? <FaCheck className="text-[#4AE290]" /> : null}
                <span>Minimum of 8 characters</span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full py-1 px-2  ${passwordStrength.hasUppercase ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
              >
                {passwordStrength.hasUppercase ? <FaCheck className="text-[#4AE290]" /> : null}
                <span>An uppercase letter</span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full py-1 px-2  ${passwordStrength.hasLowercase ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
              >
                {passwordStrength.hasLowercase ? <FaCheck className="text-[#4AE290]" /> : null}
                <span>A lowercase letter</span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full py-1 px-2  ${passwordStrength.hasSymbol ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
              >
                {passwordStrength.hasSymbol ? <FaCheck className="text-[#4AE290]" /> : null}
                <span>A symbol</span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full py-1 px-2  ${passwordStrength.hasNumber ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
              >
                {passwordStrength.hasNumber ? <FaCheck className="text-[#4AE290]" /> : null}
                <span>A number</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none placeholder:text-gray-400 focus:border-green-500 font-light lg:text-base text-sm focus:ring-[#3A6B6B] focus:border-green-300"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row pt-4 w-full items-end md:gap-10 gap-4 w-full">
            <button onClick={handlePrevStep} className="text-[#3A6B6B] border p-3 rounded-full md:w-[20%] w-full">
              Go back
            </button>
                <div className='md:w-[80%] w-full'>
                <AuthButton title="Reset password" isLoading={isLoading} disabled={!formData.password || !formData.confirm_password || formData.password !== formData.confirm_password} />
                </div>
        </div>
      </form>

    </div>
  )
}

export default ResetPassWordForm