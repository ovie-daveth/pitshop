"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IRoles, ICreateRolesInput, IPermissions } from "../../types";

export type RolesContextType = {
  roles: IRoles[] | null;
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
  if (!state) {
    throw new Error("RolesContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const RolesContextProvider = ({ children }: IProps) => {
  const [roles, setRoles] = useState<IRoles[] | null>(null);
  const [permissions, setPermissions] = useState<IPermissions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRoles = async (data: ICreateRolesInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/roles", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setRoles(res.data.data);
      toast.success(res.data.message);
      setLoading(false);
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
    try {
      const res = await axios.get("/api/v1/roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setRoles(res.data.data);
      // toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Roles failed");
      // toast.error(err.response?.data?.message || "Fetch Roles failed");
    } finally {
      setLoading(false);
    }
  };

  const getRolesPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/roles/permissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setPermissions(res.data.data);
      // toast.success(res.data.message)
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Roles Permissions failed");
      toast.error(
        err.response?.data?.message || "Fetch Roles Permissions failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // setToken(storedToken);
      // checkAuth(storedToken);
      // getLoggedInUser(storedToken);
    } else {
      // setIsCheckingAuth(false);
    }
  }, []);

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
