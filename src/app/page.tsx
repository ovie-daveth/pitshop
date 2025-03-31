// import ProtectedRoute from "@/api/protected/ProtectedRoute";
"use client";
import Signin from "@/app/aut/signin/page";
import { useEffect } from "react";
import { useCompanyState } from "@/api/context/CompanyContext/CompanyContext";

export default function Home() {
  const { company } = useCompanyState();

  useEffect(() => {
    if (company === undefined) return; // Prevent redirection before data is available

    if (!company || company.length === 0) {
      window.location.href = "/dashboard/company/create";
    }
  }, []);
  return (
    <div>
      <main>
        <Signin />
        {/* <ProtectedRoute>
          <h1>Hello Pitstop</h1>
        </ProtectedRoute> */}
      </main>
    </div>
  );
}
