"use client";
import { useState } from "react";
import AuthLayout from "./_layout";
import SignUpForm from "./component/signup-form";
import SignInForm from "./component/signin-form";
import ForgetPassword from "./component/forgetPassword-form";
import OTPform from "./component/reset-otp-form";
import ResetPassWordForm from "./component/reset-password.form";
import CreateCompanyForm from "./component/create-company";
import AddTeamMateForm from "./component/add-team-mate";

export default function Page() {
  const [showFormType, setShowFormType] = useState({
    signup: false,
    login: true,
    forgetPassword: false,
    resetopt: false,
    resetPassword: false,
    createCompany: false,
    addTeamMate: false,
    verifyOtp: false,
   
  });



  const handleFormChnage = (num: number) => {
    if (num === 1) {
      setShowFormType({
        signup: true,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: false,
       

      });
    } else if (num === 2) {
      setShowFormType({
        signup: false,
        login: true,
        forgetPassword: false,
        resetPassword: false,
        resetopt: false,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: false,
        


      });
    }
    else if (num === 3) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: true,
        resetPassword: false,
        resetopt: false,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: false,
       

      });
    } else if (num === 4) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: true,
        resetPassword: false,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: false,
       

      });
    } else if (num === 5) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: true,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: false,
     

      });
    } else if (num === 6) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: true,
        verifyOtp: false,
        addTeamMate: false,

      });
    } else if (num === 7) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: false,
        verifyOtp: true,
        addTeamMate: false,


      });
    } else if( num === 8) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: false,
        verifyOtp: false,
        addTeamMate: true,

      });
    }
  }

  return (
    <AuthLayout>
      {
        showFormType.signup ? (
         <SignUpForm handleFormChnage={handleFormChnage} />
        ) : showFormType.login ? (
          <SignInForm handleFormChnage={handleFormChnage} />
        ) : showFormType.forgetPassword ? (
          <ForgetPassword handleFormChnage={handleFormChnage} />
        ) : showFormType.resetPassword ? (
          <ResetPassWordForm handleFormChnage={handleFormChnage} />
        ) : showFormType.createCompany ? (
          <CreateCompanyForm handleFormChnage={handleFormChnage} />
        ) :  showFormType.resetopt ? (
          <OTPform isSignUp={false} handleFormChnage={handleFormChnage} />
        ) : showFormType.verifyOtp ? <OTPform isSignUp={true} handleFormChnage={handleFormChnage} /> : showFormType.addTeamMate ? <AddTeamMateForm  handleFormChnage={handleFormChnage} /> :  null
      }
    </AuthLayout>
  );
}
