"use client";

import React, { useEffect, useState } from "react";
import AuthButton from "./auth-button";
import { useCompanyState } from "@/api/context/CompanyContext";
import toast from "react-hot-toast";

const CreateCompanyForm = ({
  handleFormChnage,
  isAuth,
}: {
  handleFormChnage: (num: number) => void;
  isAuth?: boolean;
}) => {
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

    try {
      if (createCompany) {
        await createCompany({
          name: formData.companyName,
          industryId: parseInt(formData.industry),
          description: formData.description,
        })
          .then((res) => {
            if (res) {
              handleFormChnage(isAuth ? 8 : 2);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error(err.message);
          });
      } else {
        console.error("createCompany is undefined");
        toast.error("Unable to create company. Please try again later.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex justify-center items-center h-screen py-10 w-full overflow-y-scroll hide-sidebar">
      <div className="px-4 w-full max-w-md">
        <div className="mt-3 lg:text-2xl text-lg lg:leading-7 w-[70%] text-left font-semibold mb-7">
          Create Company
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          {formFields.map(({ label, name, placeholder }) => (
            <div key={name} className="mt-5">
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
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
            className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
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

          <AuthButton
            title="Create company"
            isLoading={isLoading}
            disabled={
              isLoading ||
              !formData.companyName ||
              !formData.description ||
              !formData.industry
            }
          />
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
