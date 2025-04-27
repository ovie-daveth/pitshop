import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuthState } from '@/api/context/AuthContext';
import AuthButton from './auth-button';
import OTPInput from 'react-otp-input';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { Step } from '../type';

const OTPform = ({ setStepIndex, setCurrentStep, isSignUp }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>, isSignUp: boolean }) => {

  const { resendOtp, verifyOtp} = useAuthState()
      const [formData, setFormData] = useState({
        otp: "",
        email: ""
      });

      const [errorMessage, setErrorMessage] = useState({
        otp: "",
      });

      const [error, setError] = useState({
        otp: false,
      });
      const [isLoading, setIsLoading] = useState(false);
      const [timer, setTimer] = useState(60 * 3)

      const formatTimer = (timer: number) => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
      
      useEffect(() => {
        if (timer <= 0) return;
      
        const countdown = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      
        return () => clearInterval(countdown);
      }, [timer]);

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
              otp: true,
            }));
            setErrorMessage((prevState) => ({
              ...prevState,
              otp: "Email is required",
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
        // setCurrentStep("set-password")
        // setStepIndex(3)
        await verifyOtp({
          email: sessionStorage.getItem("email") as string,
          otp: formData.otp,  
        })
        .then(async (res) => {
          setIsLoading(false);
          if (res) {
            setCurrentStep("set-password")
            setStepIndex(3)
            localStorage.setItem("currentStep", "set-password")
            localStorage.setItem("stepIndex", "3")
          }
        })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
        })
       
       
      };

      const handleResnedOtp = async () => {
        try {
          setTimer(180);
           await resendOtp();
        } catch (error) {
          console.error(error);
        }
      }
      

  return (
    <div className="w-full pr-10">
    <div className="text-left">
          <h1 className="lg:text-3xl text-xl font-bold">Verify your email</h1>
          <p className="mt-2 text-gray-600 lg:text-base sm:text-xs text-[10px]">
           We just sent a verification code to {formData.email}
          </p>
        </div>
      <form onSubmit={handleSubmit} className="mt-5 w-full">
        <label className="block lg:text-sm text-xs font-medium my-5">Enter the 6-digit to continue</label>
        <div className="justify-start items-start w-full hidden md:flex">
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
              <div className="justify-start items-start w-full flex md:hidden">
                <OTPInput
                  value={formData.otp}
                  inputType="text"
                  onChange={(otp) => handleChange(otp)}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props: any) => <input {...props} />}
                  inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0 0.5rem",
                    fontSize: "1.5rem",
                    borderRadius: "6px",
                    textAlign: "center",
                    border: "1px solid #ced4da",
                  }}
                />
              </div>
        {
          error.otp && (
            <p className="text-red-500 text-sm mt-1">{errorMessage.otp}</p>
          )}
       
        
       <div className='md:mt-8 mt-2 w-full md:w-[90%]'>
       <AuthButton title="Verify Account" isLoading={isLoading} disabled={formData.otp.length < 6} />
       <div className="text-center mt-5">
  <button 
    type="button" 
    onClick={handleResnedOtp} 
    className="text-[#3A6B6B] text-sm border w-full py-3 rounded-full cursor-pointer"
    disabled={timer > 0}
  >
    {timer > 0 ? `Resend Code (${formatTimer(timer)})` : 'Resend Code'}
  </button>
</div>

       </div>
      </form>

    </div>
  )
}

export default OTPform