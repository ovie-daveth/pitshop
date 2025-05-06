"use client";

import { useEffect, useState } from "react";
import LoginLayout from "./_loginLyout";
import LoginForm from "./loginform";


export default function Page() {

    const [loginStep, setLoginStep] = useState<number>(1)



  useEffect(() => {

  }, [])


  return (
    <LoginLayout loginIndex={loginStep} setLoginIndex={setLoginStep}>
        <LoginForm />
    </LoginLayout>
  );
}

