import React, { useState } from 'react'
import { useAuthState } from '@/api/context/AuthContext';
import AuthButton from './auth-button';
import OTPInput from 'react-otp-input';
import { ArrowLeftIcon } from '@heroicons/react/solid';

const OTPform = ({handleFormChnage}: {handleFormChnage: (num: number) => void}) => {
      const [formData, setFormData] = useState({
        otp: "",
      });

      const [errorMessage, setErrorMessage] = useState({
        email: "",
      });

      const [error, setError] = useState({
        email: false,
      });
      const [isLoading, setIsLoading] = useState(false);

      const handleChange = (e: any) => {
        setError((prevState) => ({
          ...prevState,
          email: false,
        }));

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

      const validate = () => {
        if (formData.otp === "") {
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

        return true;
      }
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setIsLoading(true);
        sessionStorage.setItem("otp", formData.otp)
        setIsLoading(false)
        handleFormChnage(5)
      };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <button className="absolute top-4 left-4" onClick={() => handleFormChnage(3)}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-100 transition duration-200"> 
        <ArrowLeftIcon className="h-6 w-6 text-blue-500" onClick={() => handleFormChnage(3)} />
        </div>
      </button>
    <div className="px-4 max-w-md w-full">
    <div className='text-center flex items-center justify-center flex-col gap-2 mb-4'>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Authentication
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Kindly enter the 6-digit verification code sent to your email to
              verify your account.
            </p>
          </div>
      <form onSubmit={handleSubmit} className="mt-5">
        <label className="block text-sm font-medium my-5"> 6-Digit Verification Code</label>
        <div className="flex justify-start items-start">
                <OTPInput
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
        {
          error.email && (
            <p className="text-red-500 text-sm mt-1">{errorMessage.email}</p>
          )}
       
        
       <AuthButton title="Reset password" isLoading={isLoading} disabled={!formData.otp} />
      </form>

      <div className="mt-3 text-center text-sm">
        Remembered password? <button onClick={() => handleFormChnage(2)} className="text-blue-600">Login</button>
      </div>
    </div>
  </div>
  )
}

export default OTPform