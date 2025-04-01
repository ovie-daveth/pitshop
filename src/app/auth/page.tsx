"use client";
import { useState } from "react";
import AuthLayout from "./_layout";
import SignUpForm from "./component/signup-form";
import SignInForm from "./component/signin-form";
import ForgetPassword from "./component/forgetPassword-form";
import OTPform from "./component/reset-otp-form";
import ResetPassWordForm from "./component/reset-password.form";

export default function Page() {
  const [showFormType, setShowFormType] = useState({
    signup: false,
    login: true,
    forgetPassword: false,
    resetopt: false,
    resetPassword: false,
    createCompany: false
  });



  const handleFormChnage = (num: number) => {
    if (num === 1) {
      setShowFormType({
        signup: true,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: false

      });
    } else if (num === 2) {
      setShowFormType({
        signup: false,
        login: true,
        forgetPassword: false,
        resetPassword: false,
        resetopt: false,
        createCompany: false

      });
    }
    else if (num === 3) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: true,
        resetPassword: false,
        resetopt: false,
        createCompany: false

      });
    } else if (num === 4) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: true,
        resetPassword: false,
        createCompany: false

      });
    } else if (num === 5) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: true,
        createCompany: false

      });
    } else if (num === 6) {
      setShowFormType({
        signup: false,
        login: false,
        forgetPassword: false,
        resetopt: false,
        resetPassword: false,
        createCompany: true

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
          <div>Create Company</div>
        ) :  showFormType.resetopt ? (
          <OTPform handleFormChnage={handleFormChnage} />
        ) : null
      }
    </AuthLayout>
  );
}
