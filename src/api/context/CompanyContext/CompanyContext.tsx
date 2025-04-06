"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ICompany, ICompanyIndustry, ICreateCompanyInput } from "../../types";
import { saveKeysToLocalStorage } from "@/api/utils/switch";

export type CompanyContextType = {
  company: ICompany[] | undefined;  
  currentCompany: ICompany | null;
  loading: boolean;
  companyIndustry: ICompanyIndustry[] | null;
  error: string | null;
  createCompany: (data: ICreateCompanyInput) => Promise<boolean>;
  setCurrentCompany: Dispatch<SetStateAction<ICompany | null>>;
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
  const [company, setCompany] = useState<ICompany[] | undefined>(undefined);
  const [currentCompany, setCurrentCompany] = useState<ICompany | null>(null);
  const [companyIndustry, setCompanyIndustry] = useState<
    ICompanyIndustry[] | null
  >(null);
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
      console.log("created company", res.data.data);
     sessionStorage.setItem("companyId", res.data.data.id);
      setLoading(false);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Company failed");
      toast.error(err.response?.data?.message || "Create Company failed");
      return false
    } finally {
      setLoading(false);
    }
  };

  const getCompanyIndustries = async () => {

    console.log("got here")
    try {
      const res = await axios.get("/api/v1/companyIndustries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
        },
      });
      console.log("res", res)

      setCompanyIndustry(res.data.data);
      console.log("companyIndustry here", res.data.data);
      setLoading(false);
      return res.data.data;
      // toast.success(res.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Fetch Company Industries failed"
      );
      // toast.error(
      //   err.response?.data?.message || "Fetch Company Industries failed"
      // );
      return null;
    } finally {
      setLoading(false);
    }
  };

  // const getUserCompanies = async () => {
  //   try {
  //     const res = await axios.get("/api/v1/userCompanyRoles", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
  //       },
  //     });
  //     setCompany(res.data.data);
  //     saveKeysToLocalStorage(res.data.data[0]);
  //     console.log("toast me", res.data.data);
  //     // toast.success(res.data.message);
  //     setLoading(false);
  //     return res.data.data;
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || "Fetch Companies failed");
  //     // toast.error(err.response?.data?.message || "Fetch Companies failed");
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const getUserCompanies = async () => {
    try {
      const res = await axios.get("/api/v1/userCompanyRoles", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      setCompany(res.data.data);
      const storedCompanyId = sessionStorage.getItem("companyId");
      const initialCompany = storedCompanyId
        ? res.data.data.find((c: ICompany) => c.id === parseInt(storedCompanyId))
        : res.data.data[0];
      if (initialCompany) {
        setCurrentCompany(initialCompany);
        saveKeysToLocalStorage(initialCompany);
      }
      setLoading(false);
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Companies failed");
      return null;
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

    getCompanyIndustries()
    getUserCompanies()
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        company,
        loading,
        companyIndustry,
        currentCompany,
        setCurrentCompany,
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
