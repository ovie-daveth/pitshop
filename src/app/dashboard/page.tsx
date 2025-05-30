"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
import { useAuthFormStore } from "@/states/useAuthFotmState";
import { useEffect } from "react";
export default function Page() {

  const {setFormType} = useAuthFormStore()

  useEffect(() => {
    setFormType(2)
  }, [])
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Dashboard</h1>
            <p>This is an about dashboard page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
