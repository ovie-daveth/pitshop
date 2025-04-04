"use client";

import React, { useEffect, useState } from "react";
import AuthButton from "./auth-button";
import { useCompanyState } from "@/api/context/CompanyContext";
import toast from "react-hot-toast";

const CreateCompanyForm = ({
  handleFormChnage,
}: {
  handleFormChnage: (num: number) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState({
    industry: "",
    description: "",
    companyName: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState({
    companyName: false,
    description: false,
    industry: false,
    firstName: false,
    lastName: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Ensure this runs only on the client
  const { companyIndustry, createCompany } = typeof window !== "undefined" ? useCompanyState() : { companyIndustry: [] };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    industry: "",
    description: "",
    companyName: "",
  });

  const userDetails = localStorage.getItem("user_details");

  // const getIndustry = async() => {
  //  const data = getCompanyIndustries()
  //  console.log("data", data)
  // }



  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("industry", companyIndustry);
    if (!userDetails) return;

    const userData = JSON.parse(userDetails) as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    setFormData((prevData) => ({
      ...prevData,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // const validateForms = () => {
  //   let isValid = true;
  //   const newError = { ...error };
  //   const newErrorMessage = { ...errorMessage };

  //   const checkField = (field: keyof typeof formData, minLength = 3) => {
  //     if (!formData[field] || formData[field].length < minLength) {
  //       newError[field] = true;
  //       newErrorMessage[field] =
  //         formData[field].length < minLength
  //           ? `${field} must be at least ${minLength} characters long`
  //           : `${field} is required`;
  //       isValid = false;
  //     }
  //   };

  //   checkField("firstName");
  //   checkField("lastName");
  //   checkField("companyName");
  //   checkField("description");
  //   checkField("industry");

  //   setError(newError);
  //   setErrorMessage(newErrorMessage);

  //   return isValid;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("entered");

    try {
      console.log(formData);
      setIsLoading(true);
      // if (!validateForms()) {
      //   console.log("invalid form data");
      //   setIsLoading(false);
      //   return;
      // }
      if (createCompany) {
        await createCompany({
          name: formData.companyName,
          industryId: parseInt(formData.industry),
          description: formData.description
        })
        .then((res) => {
          if(res){
            handleFormChnage(8);
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message)
        })
      } else {
        console.error("createCompany is undefined");
        toast.error("Unable to create company. Please try again later.");
      }
     
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen py-10 w-full overflow-y-scroll hide-sidebar">
      <div className="px-4 w-full max-w-md">
        <div className="mt-3 lg:text-2xl text-lg lg:leading-7 w-[70%] text-left font-semibold mb-7">
          Create Company
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          {[
            { label: "First Name", name: "firstName", placeholder: "John", disabled: true },
            { label: "Last Name", name: "lastName", placeholder: "Doe", disabled: true },
            { label: "Company Name", name: "companyName", placeholder: "Naija Studio" },
            { label: "Description", name: "description", placeholder: "Description" },
          ].map(({ label, name, placeholder, disabled }) => (
            <div key={name} className="mt-5">
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                disabled={disabled}
                className="w-full px-4 py-2 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={placeholder}
              />
              {error[name as keyof typeof error] && (
                <span className="text-red-500 text-sm">{errorMessage[name as keyof typeof errorMessage]}</span>
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
          {error.industry && <span className="text-red-500 text-sm">{errorMessage.industry}</span>}

          <AuthButton
            title="Get Started"
            isLoading={isLoading}
            disabled={isLoading || Object.values(formData).some((val) => val === "")}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
