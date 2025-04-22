import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';
import { Step } from '../type';

const SignInForm = ({setStepIndex, setCurrentStep}: {setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>}) => {
      const [showPassword, setShowPassword] = useState(false);
       const [errorMessage, setErrorMessage] = useState({
              email: "",
              password: "",
              
            });
      
            const [error, setError] = useState({
              email: false,
              password: false,
             
            });

            const [isLoading, setIsLoading] = useState(false);

      const { signin } = useAuthState();

      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        }));
      };

      const validateForms = () => {
        if (formData.password === "") {
            setError((prevState) => ({
              ...prevState,
              password: true,
            }));
            setErrorMessage((prevState) => ({
              ...prevState,
              password: "Password is required",
            }));
            return false;
        }
        if (formData.email === "") {
            setError((prevState) => ({
              ...prevState,
              email: true,
            }));
            setErrorMessage((prevState) => ({
              ...prevState,
              email: "Email is required",
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
        console.log("form data");
        setIsLoading(true);
        const isValid = validateForms();
        if (!isValid) {
          console.log("invalid form data");	
        setIsLoading(false);
        return;
      }
        try {
          console.log(formData);
          await signin({
            email: formData.email,
            password: formData.password,
          });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error("Signup failed:", error);
        }
      };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
    <div className="px-4 max-w-md w-full">
      <button className="flex items-center justify-center w-full py-3.5 px-4 border rounded-full shadow-sm text-sm font-medium bg-white hover:bg-gray-100 gap-3">
       <Image src={google} alt="Google" width={20} height={20} />
        Sign in with Google
      </button>
      <div className="flex items-center justify-center my-8">
        <div className="border-t border-gray-300 w-full W-[45%]"></div>
        <h2 className="w-[70%] flex items-center justify-center text-gray-700 font-light text-sm">Sign in via</h2>
        <div className="border-t border-gray-300 w-full W-[45%]"></div>
      </div>
      <div className="mt-6 lg:text-2xl text-lg lg:leading-10 text-left font-semibold mb-5">
        Welcome back - LOG IN!
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg mt-1 font-light outline-none focus:border-blue-500"
          placeholder="you@example.com"
            name="email"
        />
        {
          error.email && <span className='text-red-500 font-medium text-sm'>{errorMessage.email}</span>
        }

       <div className="flex items-center justify-between mt-3">
       <label className="block mt-3 text-sm font-medium">Password</label>
       <button type="button" className="block mt-3 text-sm font-medium text-blue-600">Forgot Password</button>
       </div>
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
            error.password && <span className='text-red-500 font-medium text-sm'>{errorMessage.password}</span>
          }
        </div>
        <AuthButton title="Login" isLoading={isLoading} disabled={isLoading || (!formData.email || !formData.password)} />
      </form>

      <div className="mt-3 text-center text-sm">
        Don't have an account? <button  className="text-blue-600">Sign up</button>
      </div>
    </div>
  </div>
  )
}

export default SignInForm