"use client";
import { useEffect } from "react";
import { useAuthState } from "../context/AuthContext/AuthContext";
import { useCompanyState } from "../context/CompanyContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isCheckingAuth } = useAuthState();
  const { company } = useCompanyState();
  const router = useRouter();

  useEffect(() => {
    if (company?.length === 0) {
      window.location.href = "/dashboard/company/create";
    }
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div>Loading...</div>
          </main>
        </div>
      </>
    ); // Show a loader while checking auth
  }

  return <>{children}</>;
};

export default ProtectedRoute;
