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
import { IMediaComment, IMediaCommentResponse } from "../../types";

export type CommentContextType = {
  comment: IMediaComment[] | null;
  commentRespomse: IMediaCommentResponse | null;
  loading: boolean;
  error: string | null;
  getAllComments: (id: string) => Promise<void>;
  getCommentsById: (id: string, messageId: string) => Promise<any>;
  createComment: (data: {
    cmsId: string;
    xPosition: string;
    yPosition: string;
    message: string;
    vidTime?: string;
  }) => Promise<void>;
};

interface IProps {
  children: ReactNode;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useCommentState = () => {
  const state = useContext(CommentContext);
  if (!state) {
    throw new Error("CommentContext not found");
  }
  return state;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CommentContextProvider = ({ children }: IProps) => {
  const [comment, setComment] = useState<IMediaComment[] | null>(null);
  const [commentRespomse, setCommentResponse] =
    useState<IMediaCommentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllComments = async (id: string) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      setError("Please select a company to view comments.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`/api/v1/mediaComments/${id}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      return res.data?.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch comments.");
      toast.error(err.response?.data?.message || "Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  const getCommentsById = async (id: string, messageId: string) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      setError("Please select a company to view comments.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `/api/v1/mediaComments/${id}/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "secret-key": secret_key,
            "public-key": public_key,
          },
        }
      );

      return res.data?.data;
      console.log(res.data?.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch comment.");
      toast.error(err.response?.data?.message || "Failed to fetch comment.");
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (data: {
    cmsId: string;
    xPosition: string;
    yPosition: string;
    message: string;
    vidTime?: string;
  }) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      setError("Please select a company to submit comment.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/v1/mediaComments", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit comment.");
      toast.error(err.response?.data?.message || "Failed to submit comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comment,
        commentRespomse,
        loading,
        error,
        getAllComments,
        getCommentsById,
        createComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
