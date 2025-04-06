import Image from 'next/image'
import React, { useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';

const ForgetPassword = ({handleFormChnage}: {handleFormChnage: (num: number) => void}) => {
      const [formData, setFormData] = useState({
        email: "",
      });

      const { forgotPassword } = useAuthState();

      const [errorMessage, setErrorMessage] = useState({
        email: "",
      });

      const [error, setError] = useState({
        email: false,
      });
      const [isLoading, setIsLoading] = useState(false);
      const [goForward, setGoForward] = useState(false)

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

      const validate = () => {
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
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError((prevState) => ({
              ...prevState,
              email: true,
            }));
            setErrorMessage((prevState) => ({
              ...prevState,
              email: "Email is invalid",
            }));
            return false;
        }
        return true;
      }
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setIsLoading(true);

        try {
        
          await forgotPassword({
            email: formData.email,
           
          })
          .then((res: any) => {
            if (res) {
              sessionStorage.setItem("email", formData.email)
              setGoForward(true)
              handleFormChnage(4)
            }
          }
          )
          .catch(() => {
            setIsLoading(false);    
            
        });
        } catch (error) {
          setIsLoading(false);
          console.error("Signup failed:", error);
        }
      };
  return (
    <div className="flex justify-center items-center h-screen bg-white relative">
      {
        (
          <button className='absolute top-4 right-4 z-50 hover:bg-gray-100 flex items-center justify-center w-10 h-10 rounded-full transition duration-200' onClick={() => handleFormChnage(4)}>
            <ArrowRightIcon className="h-6 w-6 text-blue-500" />
          </button>
        )
      }
    <div className="px-4 max-w-md w-full">
        <div className="text-center items-center justify-center flex flex-col gap-2 mb-4">
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <p className='text-sm font-light'>No worries, we’ll send you reset instructions</p>
        </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
          placeholder="you@example.com"
            name="email"
            onChange={handleChange}
        />
        {
          error.email && (
            <p className="text-red-500 text-sm mt-1">{errorMessage.email}</p>
          )}
       
        
       <AuthButton title="Reset password" isLoading={isLoading} disabled={!formData.email} />
      </form>

      <div className="mt-3 text-center text-sm">
        Remembered password? <button onClick={() => handleFormChnage(2)} className="text-blue-600">Login</button>
      </div>
    </div>
  </div>
  )
}

export default ForgetPassword