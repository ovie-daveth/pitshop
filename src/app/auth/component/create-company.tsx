"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthButton from "./auth-button";
import { useCompanyState } from "@/api/context/CompanyContext";
import toast from "react-hot-toast";
import { Step } from "../type";

const CreateCompanyForm = ({ setStepIndex, setCurrentStep }: { setStepIndex: Dispatch<SetStateAction<number>>, setCurrentStep: Dispatch<SetStateAction<Step>>}) => {
  const [errorMessage, setErrorMessage] = useState({
    industry: "",
    description: "",
    companyName: "",
  });

  const [error, setError] = useState({
    companyName: false,
    description: false,
    industry: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { companyIndustry, createCompany } =
   useCompanyState()

  const [formData, setFormData] = useState({
    industry: "",
    description: "",
    companyName: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userDetails = localStorage.getItem("user_details");
    if (!userDetails) return;

    const userData = JSON.parse(userDetails) as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    setFormData((prevData) => ({
      ...prevData,
      firstName: userData.firstName || "John",
      lastName: userData.lastName || "Mickel",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setError((prevState) => ({
      ...prevState,
      [name]: false,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentStep("invite-user")
    setStepIndex(5)
    // try {
    //   if (createCompany) {
    //     await createCompany({
    //       name: formData.companyName,
    //       industryId: parseInt(formData.industry),
    //       description: formData.description,
    //     })
    //       .then((res) => {
    //         if (res) {
             
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         toast.error(err.message);
    //       });
    //   } else {
    //     console.error("createCompany is undefined");
    //     toast.error("Unable to create company. Please try again later.");
    //   }
    // } catch (error) {
    //   console.error("Signup failed:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Define form fields based on isAuth
  const formFields =[
        {
          label: "Company Name",
          name: "companyName",
          placeholder: "Naija Studio",
        },
        {
          label: "Description",
          name: "description",
          placeholder: "Description",
        },
      ];

  return (
    <div className="px-4 w-full">
      <div className="text-left">
          <h1 className="text-3xl font-bold">Create a company</h1>
          <p className="mt-2 text-gray-600">
            Provide the necessary details to create your company's profile
          </p>
        </div>
    <form onSubmit={handleSubmit} className="mt-8">
      {formFields.map(({ label, name, placeholder }) => (
        <div key={name} className="mt-5">
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="text"
            className="w-full px-4 py-4 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={placeholder}
          />
          {error[name as keyof typeof error] && (
            <span className="text-red-500 text-sm">
              {errorMessage[name as keyof typeof errorMessage]}
            </span>
          )}
        </div>
      ))}

      <label className="block mt-7 text-sm font-medium">Industry</label>
      <select
        className="w-full px-4 py-4 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
        name="industry"
        value={formData.industry}
        onChange={handleChange}
      >
        <option value="">Select an industry</option>
        {companyIndustry &&
          companyIndustry.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      {error.industry && (
        <span className="text-red-500 text-sm">
          {errorMessage.industry}
        </span>
      )}
      <div className="flex flex-col w-full gap-4 mt-8">
      <AuthButton
        title="Create company"
        isLoading={isLoading}
        disabled={
          isLoading ||
          !formData.companyName ||
          !formData.description 
        }
      />

      <button className="text-green-800 hover:text-green-700">Skip for now</button>
      </div>
    </form>
  </div>
  );
};

export default CreateCompanyForm;
