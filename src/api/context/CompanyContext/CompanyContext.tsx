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
import { saveKeysToLocalStorage } from "@/api/utils/switch";

export type CompanyContextType = {
  company: ICompany[] | null;
  loading: boolean;
  companyIndustry: ICompany[] | null;
  error: string | null;
  createCompany: (data: ICreateCompanyInput) => Promise<void>;
  getCompanyIndustries: () => Promise<void>;
  getUserCompanies: () => Promise<void>;
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
  const [company, setCompany] = useState<ICompany[] | null>(null);
  const [companyIndustry, setCompanyIndustry] = useState<ICompany[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCompany = async (data: ICreateCompanyInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/companies", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
        },
      });

      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/dashboard/company";
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Company failed");
      toast.error(err.response?.data?.message || "Create Company failed");
    } finally {
      setLoading(false);
    }
  };

  const getCompanyIndustries = async () => {
    try {
      const res = await axios.get("/api/v1/companyIndustries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
        },
      });

      setCompanyIndustry(res.data.data);
      // toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Fetch Company Industries failed"
      );
      toast.error(
        err.response?.data?.message || "Fetch Company Industries failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserCompanies = async () => {
    try {
      const res = await axios.get("/api/v1/userCompanyRoles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
        },
      });

      // localStorage.setItem("userCompanies", JSON.stringify(res.data.data));

      setCompany(res.data.data);
      saveKeysToLocalStorage(res.data.data[0]);
      // toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Companies failed");
      toast.error(err.response?.data?.message || "Fetch Companies failed");
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
        companyIndustry,
        error,
        createCompany,
        getCompanyIndustries,
        getUserCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyContextProvider;
