"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import AuthButton from './auth-button';


const RegisterForm = ({handleFormChnage}: {handleFormChnage: (num: number) => void}) => {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const [errorMessage, setErrorMessage] = useState({
        firstname: "",
        lastname: "",
      });

      const [error, setError] = useState({
        firstName: false,
        lastName: false,
      });
      const [isLoading, setIsLoading] = useState(false);

      const { signup } = useAuthState();

      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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
                  firstname: true,
                }));
                setErrorMessage((prevState) => ({
                  ...prevState,
                  firstname: "First Name is required",
                }));
                return false;
            }
            if (formData.lastName === "") {
                setError((prevState) => ({
                  ...prevState,
                  lastname: true,
                }));
                setErrorMessage((prevState) => ({
                  ...prevState,
                  lastname: "Last Name is required",
                }));
                return false;
            }
            if (formData.firstName.length < 3) {
                setError((prevState) => ({
                  ...prevState,
                  firstname: true,
                }));
                setErrorMessage((prevState) => ({
                  ...prevState,
                  firstname: "First Name should be at least 3 characters",
                }));
                return false;
            }
            if (formData.lastName.length < 3) {
                setError((prevState) => ({
                  ...prevState,
                  lastname: true,
                }));
                setErrorMessage((prevState) => ({
                  ...prevState,
                  lastname: "Last Name should be at least 3 characters",
                }));
                return false;
            }

            return true;
        }
      
        const handleSubmit = async (e: any) => {
          e.preventDefault();
            console.log("entered");	
          try {
            console.log(formData);
            setIsLoading(true);
            const isValid = validateForms();
            if (!isValid) {
                console.log("invalid form data");	
              setIsLoading(false);
              return;
            }
            await signup({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: sessionStorage.getItem("signup_email") || "",
              password: sessionStorage.getItem("password") || "",
              otp: sessionStorage.getItem("signup_otp") || "",
            })
            .then((res) => {
                console.log("res", res);
                if (res) {
                    handleFormChnage(5)
                }
            }
            ).catch((err) => {
                console.log("error", err);
            })

          } catch (error) {
            console.error("Signup failed:", error);
          }
        };


  return (
    <div className="flex justify-center items-center h-screen bg-white w-full">
          <div className="px-4 max-w-md">
            <button className="flex items-center justify-center w-full py-3.5 px-4 border rounded-full shadow-sm text-sm font-medium bg-white hover:bg-gray-100 gap-3">
              <Image src={google} alt="Google Logo" className="w-5 h-5" />
              Sign up with Google
            </button>
            <div className="flex items-center justify-center my-8">
              <div className="border-t border-gray-300 w-full W-[45%]"></div>
              <h2 className="w-[70%] flex items-center justify-center text-gray-700 font-light text-sm">Sign up via</h2>
              <div className="border-t border-gray-300 w-full W-[45%]"></div>
            </div>
            <div className="mt-6 lg:text-2xl text-lg lg:leading-7 w-[70%] text-left font-semibold mb-3">
              Join us and never <br />miss a thing - SIGN UP!
            </div>
    
            <form onSubmit={handleSubmit} className="mt-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
              />
              {
                error.firstName && <span className="text-red-500 text-sm">{errorMessage.firstname}</span>
              }
    
              <label className="block mt-7 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={"text" }
                  className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
                {
                    error.lastName && <span className="text-red-500 text-sm">{errorMessage.lastname}</span>
                }
              </div>
    
              <AuthButton title="Finish registration" isLoading={isLoading} disabled={isLoading || (!formData.firstName || !formData.lastName)} />
            </form>
    
            <div className="mt-3 text-center text-sm">
              Already have an account?<button className="text-blue-600 ml-1" onClick={() => handleFormChnage(2)}>Login</button>
            </div>
          </div>
        </div>
  )
}

export default RegisterForm