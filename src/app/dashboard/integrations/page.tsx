"use client";
import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Integrations</h1>
            <p>This is an Integrations page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
