"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';


const SignUpForm = ({handleFormChnage}: {handleFormChnage: (num: number) => void}) => {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        confirm_password: "",
      });

      const [error, setError] = useState({
        email: false,
        password: false,
        confirm_password: false,
      });
      const [isLoading, setIsLoading] = useState(false);

      const { requestOtp } = useAuthState();

      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
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
          try {
            console.log(formData);
            setIsLoading(true);
            const isValid = validateForms();
            if (!isValid) {
                console.log("invalid form data");	
              setIsLoading(false);
              return;
            }

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            // await requestOtp({
            //   firstName: formData.firstName,
            //   lastName: formData.lastName,
            //   email: formData.email,
            //   password: formData.password,
            //   otp: "",
            // });
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {
                error.email && <span className="text-red-500 text-sm">{errorMessage.email}</span>
              }
    
              <label className="block mt-7 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
                {
                    error.password && <span className="text-red-500 text-sm">{errorMessage.password}</span>
                }
              </div>
    
              <label className="block mt-7 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                  name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
                {
                    error.confirm_password && <span className="text-red-500 text-sm">{errorMessage.confirm_password}</span>
                }
              </div>
    
              <div className="flex items-center mt-4">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="mr-2" />
                <span className="text-sm">By signing up, you agree to our <a href="#" className="text-blue-600">Terms & Privacy Policy</a></span>
              </div>
    
              <AuthButton title="Get Started" isLoading={isLoading} disabled={isLoading || (!formData.email || !formData.password || !formData.confirm_password || !formData.rememberMe)} />
            </form>
    
            <div className="mt-3 text-center text-sm">
              Already have an account?<button className="text-blue-600 ml-1" onClick={() => handleFormChnage(2)}>Login</button>
            </div>
          </div>
        </div>
  )
}

export default SignUpForm