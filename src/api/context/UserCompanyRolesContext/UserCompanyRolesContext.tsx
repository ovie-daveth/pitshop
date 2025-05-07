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
import { IUserCompanyRoles } from "../../types";

export type UserCompanyRolesContextType = {
  data: IUserCompanyRoles | null;
  loading: boolean;
  error: string | null;
  getAuthAll: () => Promise<void>;
  getAuthUsers: () => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const UserCompanyRolesContext = createContext<
  UserCompanyRolesContextType | undefined
>(undefined);

export const useUserCompanyRolesState = () => {
  const state = useContext(UserCompanyRolesContext);
  if (!state) {
    throw new Error("UserCompanyRolesContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const UserCompanyRolesContextProvider = ({ children }: IProps) => {
  const [data, setData] = useState<IUserCompanyRoles | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/userCompanyRoles", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
        },
      });

      setData(res.data.data.usercompanyroles);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Fetch User, Comapny, Roles failed"
      );
      toast.error(
        err.response?.data?.message || "Fetch User, Comapny, Roles failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAuthUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/userCompanyRoles/company-users", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "secret-key": `${sessionStorage.getItem("secret_key")}`,
          "public-key": `${sessionStorage.getItem("public_key")}`,
        },
      });

      setData(res.data.data.usercompanyroles);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Company Users failed");
      toast.error(err.response?.data?.message || "Fetch Company Users failed");
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
    <UserCompanyRolesContext.Provider
      value={{
        data,
        loading,
        error,
        getAuthAll,
        getAuthUsers,
      }}
    >
      {children}
    </UserCompanyRolesContext.Provider>
  );
};

export default UserCompanyRolesContextProvider;
