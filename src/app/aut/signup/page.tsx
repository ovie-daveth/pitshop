"use client";
import { useState } from "react";
import AuthLayout from "../_layout";
import SignUpForm from "../component/signup-form";
import SignInForm from "../component/signin-form";

export default function Page() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);



  const handleFormChnage = (num: number) => {
    if (num === 1) {
      setShowLogin(true);
      setShowSignup(false);
    } else if (num === 2) {
      setShowLogin(false);
      setShowSignup(true);
    }
    else {
      setShowLogin(false);
      setShowSignup(false);
    }
  }

  return (
    <AuthLayout>
      {
        (!showLogin && showSignup) ? (
         <SignUpForm handleFormChnage={handleFormChnage} />
        ) : (
          <SignInForm handleFormChnage={handleFormChnage} />
        )
      }
    </AuthLayout>
  );
}
