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
  ICancelInviteInterface,
} from "../../types";
import { useCompanyState } from "@/api/context/CompanyContext"; // Import CompanyContext

export type UserContextType = {
  users: IUsers[] | null;
  invites: IInvites[] | null;
  loading: boolean;
  error: string | null;
  createInviteUsers: (data: ICreateUsersInput) => Promise<boolean>;
  createMultipleInviteUsers: (data: {invitedUserDtos: ICreateUsersInput[]}) =>  Promise<boolean>;
  acceptInviteUsers: (data: IAcceptUsersInviteInput) => Promise<boolean>;
  onboardInvitedUsers: (data: IOnboardInvitedUsers) => Promise<boolean>;
  getAllInvitedUsers: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  cancelInvites: (data: ICancelInviteInterface) => Promise<boolean>;
  resendInvitationMail: (reference: string) => Promise<boolean>
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
  const { currentCompany } = useCompanyState(); // Access currentCompany from CompanyContext

  const createInviteUsers = async (data: ICreateUsersInput) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to create invites");
      setLoading(false);
      return false;
    }
    try {
      const res = await axios.post("/api/v1/invitedUsers", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      console.log("invitedUser", res.data.data.users)
      setUsers(res.data.data.users);
      toast.success(res.data.message);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Invite failed");
      toast.error(err.response?.data?.message || "Create Invite failed");
      return false
    } finally {
      setLoading(false);
    }
  };

  const createMultipleInviteUsers = async (data: {invitedUserDtos: ICreateUsersInput[]}) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to create invites");
      setLoading(false);
      return false;
    }
    try {
      const res = await axios.post("/api/v1/invitedUsers/multiple", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      toast.success(res.data.message);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Invite failed");
      toast.error(err.response?.data?.message || "Create Invite failed");
      return false
    } finally {
      setLoading(false);
    }
  };

  const resendInvitationMail = async (reference: string) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to create invites");
      setLoading(false);
      return false;
    }
    try {
      const res = await axios.get(`api/v1/invitedUsers/${reference}/notify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      toast.success(res.data.message);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Create Invite failed");
      toast.error(err.response?.data?.message || "Create Invite failed");
      return false
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          Accept: "application/json",
        },
      });
      //setUsers(res.data.data.users);
      toast.success(res.data.message);
      console.log("scceptr user data", res.data.data)
      return res.data.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Accept Invite failed");
      toast.error(err.response?.data?.message || "Accept Invite failed");
      return false
    } finally {
      setLoading(false);
    }
  };

  const cancelInvites = async (data: ICancelInviteInterface) => {
    setLoading(true);
    setError(null);

    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to create invites");
      setLoading(false);
      return false;
    }
    try {
      const res = await axios.put("/api/v1/invitedUsers", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      console.log("cancel", res.data.data.users);
      toast.success(res.data.message);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Accept Invite failed");
      toast.error(err.response?.data?.message || "Accept Invite failed");
      return false
    } finally {
      setLoading(false);
    }
  }

  const getAllInvitedUsers = async () => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to view invited users");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("/api/v1/invitedUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setInvites(res.data.data);
      // toast.success(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Invited Users failed");
      // toast.error(err.response?.data?.message || "Fetch Invited Users failed");
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      setUsers(res.data.data.users);
      toast.success(res.data.message);
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || "Onboard Invite failed");
      toast.error(err.response?.data?.message || "Onboard Invite failed");
      return false
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");
    if (!secret_key || !public_key) {
      setError("Please select a company to view users");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("/api/v1/userCompanyRoles/company-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setUsers(res.data.data.data);
      // toast.success(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch Users failed");
      // toast.error(err.response?.data?.message || "Fetch Users failed");
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when currentCompany changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (currentCompany) {
      getAllUsers();
      getAllInvitedUsers();
    }
  }, [currentCompany]); // Dependency on currentCompany

  return (
    <UserContext.Provider
      value={{
        users,
        invites,
        loading,
        error,
        cancelInvites,
        createInviteUsers,
        createMultipleInviteUsers,
        acceptInviteUsers,
        onboardInvitedUsers,
        getAllInvitedUsers,
        getAllUsers,
        resendInvitationMail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;