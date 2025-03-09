"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Create Roles</h1>
            <p>Create Roles Page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
