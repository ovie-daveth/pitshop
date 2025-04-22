import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuthState } from '@/api/context/AuthContext';
import AuthButton from './auth-button';
import OTPInput from 'react-otp-input';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Step } from '../type';

const OTPform = ({ setStepIndex, setCurrentStep, isSignUp }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>, isSignUp: boolean }) => {

  const { signup, verifyOtp} = useAuthState()
      const [formData, setFormData] = useState({
        otp: "",
        email: ""
      });

      const [errorMessage, setErrorMessage] = useState({
        email: "",
      });

      const [error, setError] = useState({
        email: false,
      });
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        const rawMail = localStorage.getItem("user_details");
        if(!rawMail) return
        if(rawMail){
          const parsedMail = JSON.parse(rawMail)
          setFormData((prev) => ({
            ...prev,
            email: parsedMail.email
          }))
        }
      }, [])
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
        setCurrentStep("set-password")
        setStepIndex(3)
        // await verifyOtp({
        //   email: sessionStorage.getItem("email") as string,
        //   otp: formData.otp,  
        // })
        // .then(async (res) => {
        //   setIsLoading(false);
        //   if (res) {
        //     if(isSignUp){
        //       const id = parseInt(sessionStorage.getItem("id") as string);
        //       await signup(id)
        //       .then((res) => {
        //         console.log(res)
        //        if(res){
        //         setCurrentStep("set-password")
        //         setStepIndex(3)
        //        }
        //       })
        //       .catch((err) => {
        //         console.log(err)
        //       })
        //     } else {
        //       // setIsLoading(false)
        //       // setCurrentStep("welcome")
        //       // setStepIndex(3)
        //     }
        //   }
        // })
        // .catch((err) => {
        //   setIsLoading(false)
        //   console.log(err)
        // })
       
       
      };

      const handleResnedOtp = async () => {
        // isSignUp ? await requestOtp(formData.email) : await requestOtp(formData.email)
      }

     
  const handlePrevStep = () => {
    setCurrentStep("welcome")
    setStepIndex(1)
  }
  return (
    <div className="w-full pr-10">
    <div className="text-left">
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="mt-2 text-gray-600">
           We just sent a verification code to {formData.email}
          </p>
        </div>
      <form onSubmit={handleSubmit} className="mt-5 w-full">
        <label className="block text-sm font-medium my-5">Enter the 6-digit to continue</label>
        <div className="flex justify-start items-start w-full">
                <OTPInput
                  value={formData.otp}
                  inputType="text"
                  onChange={(otp) => handleChange(otp)}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props: any) => <input {...props} />}
                  inputStyle={{
                    width: "5rem",
                    height: "5rem",
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
       
        
       <div className='mt-8'>
       <AuthButton title="Verify Account" isLoading={isLoading} disabled={!formData.otp} />
       <div className="text-center mt-5">
                  <button className="text-[#3A6B6B] text-sm border w-full py-3 rounded-full">Resend Code (03:00)</button>
                </div>
       </div>
      </form>

    </div>
  )
}

export default OTPform