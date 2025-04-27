"use client"

import { useEffect, useState } from "react"
import { ResetModalLayout } from "../resetlayout"
import AuthButton from "../../component/auth-button"
import { useAuthState } from "@/api/context/AuthContext"
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa"
import OTPInput from "react-otp-input"
import { IoCheckmark } from "react-icons/io5"
import { Button } from "@headlessui/react"

type ResetType = "email" | "otp" | "password" | "complete"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    handleSubmit: (e: any, step: ResetType) => void
    type: ResetType
}

const ResetEmailModal = ({ isOpen, onClose, handleSubmit, type }: ModalProps) => {
    const [email, setEmail] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        confirm_password: "",
        otp: ""
    });
    const [error, setError] = useState({
        email: false,
        password: false,
        confirm_password: false,
        otp: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("Send Reset instruction")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
        otp: ""
    });
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

    const { resetPassword , forgotPassword, verifyOtp} = useAuthState();

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
    }

    useEffect(() => {
        if (type === "email") {
            setIsDisabled(!email);
        } else if (type === "otp") {
            setIsDisabled(formData.otp.length !== 6);
        } else if (type === "password") {
            setIsDisabled(formData.confirm_password !== formData.password || !formData.confirm_password);
        } else {
            setIsDisabled(true); // Disable button in "complete" step
        }
    }, [type, email, formData]);

    const passwordStrength = {
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasLowercase: /[a-z]/.test(formData.password),
        hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
    }

    const isPasswordValid = () => {
        return Object.values(passwordStrength).every(Boolean) && formData.password === formData.confirm_password;
    }

    const validateForms = () => {
        if (type === "email") {
            if (!email) {
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
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email_regex.test(email)) {
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
        } else if (type === "otp") {
            if (formData.otp.length !== 6) {
                setError((prevState) => ({
                    ...prevState,
                    otp: true,
                }));
                setErrorMessage((prevState) => ({
                    ...prevState,
                    otp: "Please enter a 6-digit OTP",
                }));
                return false;
            }
        } else if (type === "password") {
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
            if (!isPasswordValid()) {
                setError((prevState) => ({
                    ...prevState,
                    password: true,
                }));
                setErrorMessage((prevState) => ({
                    ...prevState,
                    password: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one symbol",
                }));
                return false;
            }
        }
        return true;
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (type === "complete") return; // Prevent submission in "complete" step

        setIsLoading(true);
        try {
            const isValid = validateForms();
            if (!isValid) {
                setIsLoading(false);
                return;
            }

            if (type === "email") {
                await forgotPassword({ email })
                .then((res) => {
                    if(res){
                        sessionStorage.setItem("email", email)
                        handleSubmit(e, "otp");
                    }
                })
               
            } else if (type === "otp") {
                // Verify OTP (add your API call here if needed)
                    await verifyOtp({
                        email: sessionStorage.getItem("email") as string,
                        otp: formData.otp,  
                    })
                    .then((res) => {
                        if(res){
                            handleSubmit(e, "password");
                        }
                    })
            } else if (type === "password") {
                await resetPassword({ email, token: parseInt(sessionStorage.getItem("id") as string) , password: formData.password })// Update password
                .then((res) => {
                    if(res){
                        handleSubmit(e, "complete");
                    }
                })
            }
        } catch (error) {
            console.error("Reset failed:", error);
            setErrorMessage((prevState) => ({
                ...prevState,
                [type]: "An error occurred. Please try again.",
            }));
            setError((prevState) => ({
                ...prevState,
                [type]: true,
            }));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (type === "email") {
            setTitle("Send Reset Instruction");
        } else if (type === "otp") {
            setTitle("Verify Email");
        } else if (type === "password") {
            setTitle("Reset Password");
        } else {
            setTitle("Log In Now");
        }
    }, [type]);

    const handleResendOtp = () => {
        setTimer(60 * 3);
        // Add resend OTP API call here
    }

    return (
        <ResetModalLayout isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} className="space-y-2">
                {type === "email" && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className="lg:text-3xl text-xl font-bold">Reset Password</h1>
                            <p className="mt-2 text-gray-600 lg:text-base text-sm">
                                Please provide the email linked to your account, and we will send you a link to reset your password.
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-green-500 font-light lg:text-base text-sm"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                            {error.email && <span className="text-red-500 text-sm">{errorMessage.email}</span>}
                        </div>
                    </div>
                )}
                {type === "password" && (
                    <div className="w-full text-left">
                        <div className="text-center">
                            <h1 className="lg:text-3xl text-xl font-bold">Reset Password</h1>
                            <p className="mt-2 text-gray-600 lg:text-base text-sm">
                                Enter your new password and complete your password reset
                            </p>
                        </div>
                        <div className="mt-7">
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
                                        {error.password && <span className="text-red-500 text-sm">{errorMessage.password}</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs">
                                        <div
                                            className={`flex items-center gap-1 rounded-full py-1 px-2 ${passwordStrength.minLength ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
                                        >
                                            {passwordStrength.minLength ? <FaCheck className="text-[#4AE290]" /> : null}
                                            <span>Minimum of 8 characters</span>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 rounded-full py-1 px-2 ${passwordStrength.hasUppercase ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
                                        >
                                            {passwordStrength.hasUppercase ? <FaCheck className="text-[#4AE290]" /> : null}
                                            <span>An uppercase letter</span>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 rounded-full py-1 px-2 ${passwordStrength.hasLowercase ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
                                        >
                                            {passwordStrength.hasLowercase ? <FaCheck className="text-[#4AE290]" /> : null}
                                            <span>A lowercase letter</span>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 rounded-full py-1 px-2 ${passwordStrength.hasSymbol ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
                                        >
                                            {passwordStrength.hasSymbol ? <FaCheck className="text-[#4AE290]" /> : null}
                                            <span>A symbol</span>
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 rounded-full py-1 px-2 ${passwordStrength.hasNumber ? "text-green-500 bg-green-100" : "text-gray-500 bg-gray-200"}`}
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
                                    {error.confirm_password && <span className="text-red-500 text-sm">{errorMessage.confirm_password}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {type === "otp" && (
                    <div>
                        <div className="text-center">
                            <h1 className="lg:text-3xl text-xl font-bold">Verify Email</h1>
                            <p className="mt-2 text-gray-600 lg:text-base text-sm">
                                Please enter the 6-digit token sent to your email.
                            </p>
                        </div>
                        <div className="mt-5 w-full">
                            <label className="block lg:text-sm text-xs font-medium my-5">Enter the 6-digit code to continue</label>
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
                            {error.otp && (
                                <p className="text-red-500 text-sm mt-1">{errorMessage.otp}</p>
                            )}
                            <div className="text-center mt-5">
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    className="text-[#3A6B6B] text-sm border w-full py-3 rounded-full cursor-pointer"
                                    disabled={timer > 0}
                                >
                                    {timer > 0 ? `Resend Code (${formatTimer(timer)})` : 'Resend Code'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {type === "complete" && (
                    <div>
                        <div className="text-center space-y-6 flex flex-col justify-center items-center">
                            <div className="bg-teal-800 rounded-full p-4 mb-4 w-fit">
                                <IoCheckmark className="text-white font-extrabold" size={30} />
                            </div>
                            <h1 className="lg:text-3xl text-xl font-bold">Password Reset Successful</h1>
                            <p className="mt-2 text-gray-600 lg:text-base text-sm">
                                Your password has been reset successfully. You can now log in with your new credentials.
                            </p>
                        </div>
                    </div>
                )}
                <div className='w-full'>
                    {type === "complete" ? (
                        <Button className="w-full text-white py-3 rounded-full mt-4 primary-800 cursor-pointer" onClick={onClose} type="button">Log in now</Button>
                    ) : (
                        <AuthButton title={title} isLoading={isLoading} disabled={isDisabled} />
                    )}
                </div>
            </form>
        </ResetModalLayout>
    )
}

export default ResetEmailModal