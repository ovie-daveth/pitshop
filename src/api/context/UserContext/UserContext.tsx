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
  IUsers,
  ICreateUsersInput,
  IOnboardInvitedUsers,
  IAcceptUsersInviteInput,
  IInvites,
} from "../../types";

export type UserContextType = {
  users: IUsers[] | null;
  invites: IInvites[] | null;
  loading: boolean;
  error: string | null;
  createInviteUsers: (data: ICreateUsersInput) => Promise<void>;
  acceptInviteUsers: (data: IAcceptUsersInviteInput) => Promise<void>;
  onboardInvitedUsers: (data: IOnboardInvitedUsers) => Promise<void>;
  getAllInvitedUsers: () => Promise<void>;
  getAllUsers: () => Promise<void>;
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
  const [users, setUsers] = useState<IUsers[] | null>(null);
  const [invites, setInvites] = useState<IInvites[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createInviteUsers = async (data: ICreateUsersInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/invitedUsers", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setUsers(res.data.data.users);
      toast.success(res.data.message);
      window.location.href = "/dashboard/users";
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Invite failed");
      toast.error(err.response?.data?.message || "Create Invite failed");
    } finally {
      setLoading(false);
    }
  };

  const acceptInviteUsers = async (data: IAcceptUsersInviteInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/invitedUsers/accept", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
        },
      });

      setUsers(res.data.data.users);
      toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Accept Invite failed");
      toast.error(err.response?.data?.message || "Accept Invite failed");
    } finally {
      setLoading(false);
    }
  };

  const getAllInvitedUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/invitedUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setInvites(res.data.data);
      toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Invited Users failed");
      // toast.error(err.response?.data?.message || "etch Invited Users failed");
    } finally {
      setLoading(false);
    }
  };

  const onboardInvitedUsers = async (data: IOnboardInvitedUsers) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/invitedUsers/onboard", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
        },
      });

      setUsers(res.data.data.users);
      toast.success(res.data.message);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Onboard Invite failed");
      toast.error(err.response?.data?.message || "Onboard Invite failed");
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/userCompanyRoles/company-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          "secret-key": `${localStorage.getItem("secret_key")}`,
          "public-key": `${localStorage.getItem("public_key")}`,
        },
      });

      setUsers(res.data.data.data);
      // toast.success(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Invited Users failed");
      // toast.error(err.response?.data?.message || "etch Invited Users failed");
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
        invites,
        loading,
        error,
        createInviteUsers,
        acceptInviteUsers,
        onboardInvitedUsers,
        getAllInvitedUsers,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
