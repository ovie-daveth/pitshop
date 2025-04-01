import Image from 'next/image'
import React, { useState } from 'react'
import google from "../../../../public/images/google-icon logo.png"
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useAuthState } from '@/api/context/AuthContext';
import { BiLoader } from 'react-icons/bi';
import AuthButton from './auth-button';

const ResetPassWordForm = ({handleFormChnage}: {handleFormChnage: (num: number) => void}) => {
    
      const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
      });

      const { resetPassword } = useAuthState();

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

        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
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
        
          await resetPassword({
            email: sessionStorage.getItem("email") as string,
            password: formData.password,
            token: sessionStorage.getItem("otp") as string,
           
          })
          .then((res: any) => {
            if (res) {
              handleFormChnage(2)
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
    <div className="flex justify-center items-center h-screen bg-white">
    <div className="px-4 max-w-md w-full">
        <div className="text-center items-center justify-center flex flex-col gap-2 mb-4">
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <p className='text-sm font-light'>Please input a new password below</p>
        </div>
      <form onSubmit={handleSubmit} className="mt-5">
        
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
        
       <AuthButton title="Reset password" isLoading={isLoading} disabled={!formData.password || !formData.confirm_password} />
      </form>

      <div className="mt-3 text-center text-sm">
        Remembered password? <button onClick={() => handleFormChnage(2)} className="text-blue-600">Login</button>
      </div>
    </div>
  </div>
  )
}

export default ResetPassWordForm