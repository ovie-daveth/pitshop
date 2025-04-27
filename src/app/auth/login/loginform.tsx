"use client"
import Image from "next/image";
import google from "../../../../public/images/google.png"
import { useState } from "react";
import { useAuthState } from "@/api/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthButton from "../component/auth-button";
import ResetEmailModal from "./components/reset-email";

type ResetType = "email" | "otp" | "password" | "complete"

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        email: false,
        password: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState<{isOpen: boolean, type: ResetType}>({
        isOpen: false,
        type: "email"
    })
    const { signin } = useAuthState();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        try {
            setIsLoading(true);
            const isValid = validateForms();
            if (!isValid) {
                setIsLoading(false);
                return;
            }
            await signin({
                email: formData.email,
                password: formData.password
            })
            .finally(() => {
                setIsLoading(false);
            });
        } catch (error) {
            console.error("Signin failed:", error);
            setIsLoading(false);
        }
    };

    const handleOpenResetModal = (e: any, step: ResetType) => {
        e.preventDefault();
        setModalOpen({
            isOpen: true,
            type: step
        });
    }

    const handleCloseModal = () => {
        setModalOpen({
            isOpen: false,
            type: "email"
        });
    }

    return (
        <div className="w-full">
            <div className="space-y-8">
                <div className="text-left">
                    <h1 className="lg:text-3xl text-xl font-bold">Login</h1>
                    <p className="mt-2 text-gray-600 lg:text-base text-sm">
                        Welcome back! Enter your details to login into your Plumetrix account
                    </p>
                </div>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-4 px-4 text-gray-700 hover:bg-gray-50 transition-colors text-lg">
                    <Image src={google.src} height={17} width={17} alt="icon" className="" />
                    <span>Google</span>
                </button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-green-500 font-light lg:text-base text-sm"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                            {error.email && <span className="text-red-500 text-sm">{errorMessage.email}</span>}
                        </div>
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
                        <p className="text-xs text-center text-gray-500 flex justify-end">
                            <button onClick={(e) => handleOpenResetModal(e, "email")} className="text-[#3A6B6B] hover:underline">
                                Forgot password
                            </button>
                        </p>
                        <div>
                            <AuthButton title="Log in" isLoading={isLoading} disabled={!formData.password || !formData.email} />
                        </div>
                    </div>
                </form>
            </div>
            {modalOpen.isOpen && (
                <ResetEmailModal
                    isOpen={modalOpen.isOpen}
                    type={modalOpen.type}
                    onClose={handleCloseModal}
                    handleSubmit={handleOpenResetModal}
                />
            )}
        </div>
    )
}

export default LoginForm;