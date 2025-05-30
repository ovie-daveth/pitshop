"use client";
import { useEffect, useState } from "react";
import AuthLayout from "./_layout";
import SignUpForm from "./component/signup-form";
import SignInForm from "./component/signin-form";
import ForgetPassword from "./component/forgetPassword-form";
import OTPform from "./component/reset-otp-form";
import ResetPassWordForm from "./component/reset-password.form";
import CreateCompanyForm from "./component/create-company";
import AddTeamMateForm from "./component/add-team-mate";
import { useCreateFormStore } from "@/states/useCreateCompanyState";
import { useRolesState } from "@/api/context/RolesContext";
import { useAuthFormStore } from "@/states/useAuthFotmState";
import { useCompanyState } from "@/api/context/CompanyContext";

export default function Page() {

  const {showFormType, setFormType} = useAuthFormStore()
  const { getRoles } = useRolesState();
  const { getCompanyIndustries, getUserCompanies } =
  useCompanyState()

  useEffect(() => {
    getRoles()
    getCompanyIndustries()
    getUserCompanies()
  }, [showFormType])


  return (
    <AuthLayout>
      {
        showFormType.signup ? (
         <SignUpForm handleFormChnage={setFormType} />
        ) : showFormType.login ? (
          <SignInForm handleFormChnage={setFormType} />
        ) : showFormType.forgetPassword ? (
          <ForgetPassword handleFormChnage={setFormType} />
        ) : showFormType.resetPassword ? (
          <ResetPassWordForm handleFormChnage={setFormType} />
        ) : showFormType.createCompany ? (
          <CreateCompanyForm isAuth handleFormChnage={setFormType} />
        ) :  showFormType.resetopt ? (
          <OTPform isSignUp={false} handleFormChnage={setFormType} />
        ) : showFormType.verifyOtp ? <OTPform isSignUp={true} handleFormChnage={setFormType} /> : showFormType.addTeamMate ? <AddTeamMateForm isAuth  handleFormChnage={setFormType} /> :  null
      }
    </AuthLayout>
  );
}
