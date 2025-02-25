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
import { ICompany, ICreateCompanyInput } from "../../types";

export type CompanyContextType = {
  company: ICompany | null;
  loading: boolean;
  error: string | null;
  createCompany: (data: ICreateCompanyInput) => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanyState = () => {
  const state = useContext(CompanyContext);
  if (!state) {
    throw new Error("CompanyContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const CompanyContextProvider = ({ children }: IProps) => {
  const [company, setCompany] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCompany = async (data: ICreateCompanyInput) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Company failed");
      toast.error(err.response?.data?.message || "Create Company failed");
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
    <CompanyContext.Provider
      value={{
        company,
        loading,
        error,
        createCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContextProvider;
