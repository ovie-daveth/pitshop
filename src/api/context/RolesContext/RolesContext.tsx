// RolesContext.tsx
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IRole, ICreateRolesInput, IPermissions } from "../../types";
import { useCompanyState } from "@/api/context/CompanyContext"; // Import CompanyContext

export type RolesContextType = {
  roles: IRole[] | null;
  permissions: IPermissions[] | null;
  loading: boolean;
  error: string | null;
  createRoles: (data: ICreateRolesInput) => Promise<void>;
  getRoles: () => Promise<void>;
  getRolesPermissions: () => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const useRolesState = () => {
  const state = useContext(RolesContext);
  if (!state) throw new Error("RolesContext not found");
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const RolesContextProvider = ({ children }: IProps) => {
  const [roles, setRoles] = useState<IRole[] | null>(null);
  const [permissions, setPermissions] = useState<IPermissions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { currentCompany } = useCompanyState(); // Use CompanyContext

  const createRoles = async (data: ICreateRolesInput) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to create roles");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/api/v1/roles", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setRoles(res.data.data);
      toast.success(res.data.message);
      window.location.href = "/dashboard/roles/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Roles failed");
      toast.error(err.response?.data?.message || "Create Roles failed");
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key") as string;
    const public_key = sessionStorage.getItem("public_key") as string;
    if (!secret_key || !public_key) {
      setError("Please select a company to view roles");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("/api/v1/roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setRoles(res.data.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Roles failed");
    } finally {
      setLoading(false);
    }
  };

  const getRolesPermissions = async () => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to view permissions");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("/api/v1/roles/permissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setPermissions(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Roles Permissions failed");
      toast.error(err.response?.data?.message || "Fetch Roles Permissions failed");
    } finally {
      setLoading(false);
    }
  };

  // React to currentCompany changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && currentCompany) {
      getRoles();
      getRolesPermissions(); // Fetch both when company changes
    }
  }, [currentCompany]); // Dependency on currentCompany

  return (
    <RolesContext.Provider
      value={{
        roles,
        permissions,
        loading,
        error,
        createRoles,
        getRoles,
        getRolesPermissions,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContextProvider;