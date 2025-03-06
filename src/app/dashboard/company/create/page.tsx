"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Create Company</h1>
            <p>Create Company Page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
