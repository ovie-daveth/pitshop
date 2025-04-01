// import ProtectedRoute from "@/api/protected/ProtectedRoute";
"use client";
import { useEffect } from "react";
// import { useCompanyState } from "@/api/context/CompanyContext/CompanyContext";
// import SignInForm from "./aut/component/signin-form";
// import AuthLayout from "./aut/_layout";

export default function Home({handleFormChnage}: {handleFormChnage: (num: number) => void}) {
  // const { company } = useCompanyState();

  // useEffect(() => {
  //   if (company === undefined) return; // Prevent redirection before data is available

  //   if (!company || company.length === 0) {
  //     window.location.href = "/dashboard/company/create";
  //   }
  // }, []);

  useEffect(() => {
    // Redirect to /aut/signup on first render
    window.location.href = "/auth";
  }, []);
  return (
    <div>
      <main>
      
        {/* <ProtectedRoute>
          <h1>Hello Pitstop</h1>
        </ProtectedRoute> */}
      </main>
    </div>
  );
}
