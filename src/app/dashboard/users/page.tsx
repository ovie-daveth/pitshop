"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Users</h1>
            <p>This is the users page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
