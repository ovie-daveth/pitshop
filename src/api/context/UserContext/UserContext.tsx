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
import { IUsers, ICreateUsersInput } from "../../types";

export type UserContextType = {
  users: IUsers | null;
  loading: boolean;
  error: string | null;
  createUsers: (data: ICreateUsersInput) => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserState = () => {
  const state = useContext(UserContext);
  if (!state) {
    throw new Error("UsersContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const UserContextProvider = ({ children }: IProps) => {
  const [users, setUsers] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUsers = async (data: ICreateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Create User failed");
      toast.error(err.response?.data?.message || "Create User failed");
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
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        createUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
