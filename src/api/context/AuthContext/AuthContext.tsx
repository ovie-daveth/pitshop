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
import { ILoginInput, ISignUpInput, IUser } from "../../types";
export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  signup: (data: ISignUpInput) => Promise<void>;
  signin: (data: ILoginInput) => Promise<void>;
  requestOtp: (data: ISignUpInput) => Promise<void>;
  resendOtp: () => Promise<void>;
  forgotPassword: (data: { email: string }) => Promise<void>;
  resetPassword: (data: {
    email: string;
    otp: string;
    password: string;
  }) => Promise<void>;
  checkAuth: (authToken: string | null) => Promise<void>;
  getLoggedInUser: (authToken: string | null) => Promise<void>;
  logout: () => void;
  googleAuth: () => void;
};

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthState = () => {
  const state = useContext(AuthContext);
  if (!state) {
    throw new Error("AuthContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
const AuthContextProvider = ({ children }: IProps) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: ISignUpInput) => {
    setLoading(true);
    setError(null);
    try {
      const userDetails = localStorage.getItem("user_details");
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const userData = JSON.parse(userDetails) as {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      };
      const res = await axios.post(
        "/api/v1/auth/signup",
        {
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          otp: data.otp,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
            Accept: "application/json",
          },
        }
      );
      setToken(res.data.data.tokenInfo.accessToken);
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.data.tokenInfo.accessToken);
      toast.success(res.data.message);
      // localStorage.removeItem("user_details");
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data: ILoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/v1/auth/login", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
        },
      });

      setToken(res.data.data.tokenInfo.accessToken);
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.data.tokenInfo.accessToken);
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const getLoggedInUser = async (authToken: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setToken(res.data.data.tokenInfo.accessToken);
      setUser(res.data.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", res.data.data.tokenInfo.accessToken);
      setLoading(false);
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Fetch User Failed");
      toast.error(err.response?.data?.message || "Fetch User Failed");
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async (authToken: string | null) => {
    setError(null);
    setIsCheckingAuth(true);
    try {
      const res = await axios.get("/api/v1/auth/token/refresh", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken || ""}`, // If token exists
          Accept: "application/json",
        },
      });
      setToken(res.data.data.accessToken);
      setIsAuthenticated(true);
      toast.success("Authenticated successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err: any) {
      setIsAuthenticated(false);
      setError("Failed to authenticate. Please log in again.");
    } finally {
      setLoading(false);
      setIsCheckingAuth(false);
    }
  };

  const requestOtp = async (data: ISignUpInput) => {
    try {
      localStorage.setItem(
        "user_details",
        JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        })
      );
      const res = await axios.post(
        "/api/v1/auth/signup/otp",
        { email: data.email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
            Accept: "application/json",
          },
        }
      );

      toast.success(res.data.message);
      // navigate("/dashboard");
      window.location.href = "/otp";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to request OTP");
      toast.error(err.response?.data?.message || "Failed to request OTP");
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const userDetails = localStorage.getItem("user_details");
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const userData = JSON.parse(userDetails) as {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      };
      const res = await axios.post(
        "/api/v1/auth/signup/otp",
        { email: userData.email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // If token exists
            Accept: "application/json",
          },
        }
      );

      toast.success(res.data.message);
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (data: { email: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "/api/v1/auth/accounts/password/forgot",
        data
      );
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/reset-password";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP");
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetPassword = async (data: {
    email: string;
    otp: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "/api/v1/auth/accounts/password/reset",
        data
      );
      toast.success(res.data.message);
      setLoading(false);
      window.location.href = "/signin";
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  const googleAuth = async () => {
    await axios.get("auth/google");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/signin";
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      checkAuth(storedToken);
      getLoggedInUser(storedToken);
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        signup,
        signin,
        checkAuth,
        requestOtp,
        resendOtp,
        getLoggedInUser,
        forgotPassword,
        resetPassword,
        logout,
        isCheckingAuth,
        googleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
