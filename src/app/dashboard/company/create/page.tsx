"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useState, useLayoutEffect } from "react";
import { useCompanyState } from "../../../../api/context/CompanyContext/CompanyContext";
import CreateCompanyForm from "@/app/auth/component/create-company";
import AddTeamMateForm from "@/app/auth/component/add-team-mate";
import { useAuthFormStore } from "@/states/useAuthFotmState";
import { useRolesState } from "@/api/context/RolesContext";
import { useCreateFormStore } from "@/states/useCreateCompanyState";

export default function Page() {
  const { createCompany, getCompanyIndustries, companyIndustry } =
    useCompanyState();
    const { showFormType, setFormType } = useCreateFormStore();
    const { getRoles } = useRolesState();
    
  useLayoutEffect(() => {
    getCompanyIndustries();
    getRoles()
  }, []);


  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div className='relative flex h-screen w-full overflow-hidden -mt-20 '>
            {/* <div className='w-[500px] '>
              <div className='max-h-full overflow-y-auto hide-sidebar'> */}
                {
                  showFormType.createCompany ? "" : ""
                } 
              </div>
            


            {/* <div className="block relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt=""
              />
            </div> */}
          {/* </div> */}
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
