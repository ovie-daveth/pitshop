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
import {
  IAdPlatform,
  IAdPlatformAccount,
  IAdPlatformAccountUsers,
  IAllAdPlatform,
  IDeleteAdPlatformAccountUsers,
  IIntegrateAdPlatformAccountResponse,
  IIntegrateAdPlatformAccount,
  IAddAdPlatformAccountUsers,
  IAllAdPlatformAccount,
  IAllAdPlatformAccountUsers,
  IToggleAdPlatformAccount,
} from "../../types";
import { useParams } from "next/navigation";

export type AdPlatformContextType = {
  adPlatforms: IAdPlatform | null;
  adPlatformAccounts: IAllAdPlatformAccount | null;
  adAllPlatformAccountUsers: IAllAdPlatformAccountUsers | null;
  integrateAdPlatforms: IIntegrateAdPlatformAccount | null;
  createUserAdAcc: IAdPlatformAccountUsers | null;
  loading: boolean;
  allUserAdAcc: IAllAdPlatformAccountUsers | null;
  error: string | null;
  createAdAccountUsers: (data: IAddAdPlatformAccountUsers) => Promise<void>;
  deleteAdAccountUsers: (data: IDeleteAdPlatformAccountUsers) => Promise<void>;
  getAllAdAccountUsers: () => Promise<void>;
  integrateAdAccount: (data: IIntegrateAdPlatformAccount) => Promise<void>;
  getAllAdPlatforms: () => Promise<void>;
  getAdplatformsById: () => Promise<void>;
  getAllAdPlatformAccounts: () => Promise<void>;
  getAdPlatformAccountById: () => Promise<void>;
  toggleAdPlatformAccount: (data: IToggleAdPlatformAccount) => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const AdPlatformContext = createContext<AdPlatformContextType | undefined>(
  undefined
);

export const useAdPlatformState = () => {
  const state = useContext(AdPlatformContext);
  if (!state) {
    throw new Error("AdPlatformContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const AdPlatformContextProvider = ({ children }: IProps) => {
  const [adPlatforms, setAdPlatforms] = useState<IAdPlatform | null>(null);
  const [adAllPlatformAccountUsers, setAdAllPlatformAccountUsers] =
    useState<IAllAdPlatformAccountUsers | null>(null);
  const [adPlatformAccounts, setAdPlatformAccounts] =
    useState<IAllAdPlatformAccount | null>(null);
  const [integrateAdPlatforms, setIntegrateAdPlatforms] =
    useState<IIntegrateAdPlatformAccount | null>(null);
  const [createUserAdAcc, setCreateUserAdAcc] =
    useState<IAdPlatformAccountUsers | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allUserAdAcc, setAllUserAdAcc] =
    useState<IAllAdPlatformAccountUsers | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createAdAccountUsers = async (data: IAddAdPlatformAccountUsers) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/adPlatformAccountUsers", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setCreateUserAdAcc(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Add User to Ad Account failed");
      toast.error(
        err.response?.data?.message || "Add User to Ad Account failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllAdAccountUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/adPlatformAccountUsers/12/users", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setAllUserAdAcc(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed fo Fetch All User Ad Accounts"
      );
      toast.error(
        err.response?.data?.message || "Failed to Fetch All User Ad Accounts"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteAdAccountUsers = async (data: IDeleteAdPlatformAccountUsers) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete("/api/v1/adPlatformAccountUsers", {
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
        },
      });
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to Delete");
      toast.error(err.response?.data?.message || "Failed to Delete");
    } finally {
      setLoading(false);
    }
  };

  const integrateAdAccount = async (data: IIntegrateAdPlatformAccount) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/adPlatformIntegrations", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setIntegrateAdPlatforms(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to Integrate");
      toast.error(err.response?.data?.message || "Failed to Integrate");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdPlatformAccount = async (data: IToggleAdPlatformAccount) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "/api/v1/adPlatformAccounts/toggle-active",
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
            Accept: "application/json",
            //   "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
            //   "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
          },
        }
      );

      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Toggle Ad Active failed");
      toast.error(err.response?.data?.message || "Toggle Ad Active failed");
    } finally {
      setLoading(false);
    }
  };

  const getAllAdPlatforms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/adPlatforms", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          // "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          // "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setAdPlatforms(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed fo Fetch All Ad Platforms"
      );
      toast.error(
        err.response?.data?.message || "Failed to Fetch All User Ad Platforms"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAdplatformsById = async () => {
    setLoading(true);
    setError(null);
    try {
      const { id } = useParams();
      const res = await axios.get(`/api/v1/adPlatforms/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          // "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          // "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setAdPlatforms(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed fo Fetch All Ad Platforms"
      );
      toast.error(
        err.response?.data?.message || "Failed to Fetch All User Ad Platforms"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllAdPlatformAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/adPlatformAccounts", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setAdPlatformAccounts(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed fo Fetch All Ad Platforms Accounts"
      );
      toast.error(
        err.response?.data?.message ||
          "Failed to Fetch All User Ad Platform Accounts"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAdPlatformAccountById = async () => {
    setLoading(true);
    setError(null);
    try {
      const { id } = useParams();
      const res = await axios.get(`/api/v1/adPlatformAccounts/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          // "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          // "public-key": `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`,
        },
      });

      setAdPlatforms(res.data.data.ads);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed fo Fetch All Ad Platforms"
      );
      toast.error(
        err.response?.data?.message || "Failed to Fetch All User Ad Platforms"
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
    <AdPlatformContext.Provider
      value={{
        adPlatforms,
        createUserAdAcc,
        adPlatformAccounts,
        adAllPlatformAccountUsers,
        allUserAdAcc,
        integrateAdPlatforms,
        loading,
        error,
        createAdAccountUsers,
        getAllAdAccountUsers,
        deleteAdAccountUsers,
        integrateAdAccount,
        getAllAdPlatforms,
        getAdplatformsById,
        getAllAdPlatformAccounts,
        getAdPlatformAccountById,
        toggleAdPlatformAccount,
      }}
    >
      {children}
    </AdPlatformContext.Provider>
  );
};

export default AdPlatformContextProvider;
