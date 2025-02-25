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
import { IRoles, ICreateRolesInput } from "../../types";

export type RolesContextType = {
  roles: IRoles | null;
  loading: boolean;
  error: string | null;
  createRoles: (data: ICreateRolesInput) => Promise<void>;
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
  const [roles, setRoles] = useState<IRoles | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRoles = async (data: ICreateRolesInput) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Roles failed");
      toast.error(err.response?.data?.message || "Create Roles failed");
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
        loading,
        error,
        createRoles,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContextProvider;
