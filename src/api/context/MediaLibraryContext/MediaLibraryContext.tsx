"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  IPlacements,
  IImageApprovalPermissions,
  IMediaLibraryUpload,
} from "../../types";

export type MediaLibraryContextType = {
  mediaLibraryUpload: IMediaLibraryUpload[] | null;
  placements: IPlacements[] | null;
  imageApprovalPermissions: IImageApprovalPermissions[] | null;
  loading: boolean;
  error: string | null;
  postApprovedPresigned: (data: {
    groupId: string;
    permissionIds?: number[];
  }) => Promise<void>;
  uploadPresigned: (data: { url: string; file: File }) => Promise<void>;
  getPresigned: (file: File) => Promise<{
    uploadUrl: string;
    assetUrl: string;
    mimetype: string;
    key: string;
  }>;
  validateMedia: (payload: {
    url: string;
    mimetype: string;
    key: string;
    fileName: string;
    placements: number[];
  }) => Promise<void>;
  postPresigned: (payload: {
    parent: {
      url: string;
      mimetype: string;
      key: string;
      fileName: string;
      placements: number[];
    };
    children?: {
      url: string;
      mimetype: string;
      key: string;
      fileName: string;
    }[];
  }) => Promise<void>;
  getPlacements: () => Promise<void>;
  getApprovalPermissions: () => Promise<void>;
  getMedia: (filters: Record<string, string | number>) => Promise<any[]>;
  getMediaById: (id: string) => Promise<any>;
};

interface IProps {
  children: ReactNode;
}

const MediaLibraryContext = createContext<MediaLibraryContextType | undefined>(
  undefined
);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const MediaLibraryContextProvider = ({ children }: IProps) => {
  const [imageApprovalPermissions, setImageApprovalPermissions] = useState<
    IImageApprovalPermissions[] | null
  >(null);
  const [placements, setPlacements] = useState<IPlacements[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaLibraryUpload, setMediaLibraryUpload] = useState<
    IMediaLibraryUpload[] | null
  >(null);

  const getPresigned = async (file: File) => {
    setLoading(true);
    setError(null);
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      throw new Error("Please select a company to view users");
    }

    const { data } = await axios.get(`/api/v1/medias/presigned`, {
      params: { fileName: file.name, mimetype: file.type },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "secret-key": secret_key,
        "public-key": public_key,
      },
    });

    setLoading(false);
    return data.data;
  };

  const uploadPresigned = async ({
    url,
    file,
  }: {
    url: string;
    file: File;
  }) => {
    await axios.put(url, file, {
      headers: {
        Accept: "*/*",
        "Content-Type": file.type,
      },
    });
  };

  const validateMedia = async (payload: {
    url: string;
    mimetype: string;
    key: string;
    fileName: string;
    placements: number[];
  }) => {
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      throw new Error("Please select a company to view users");
    }

    await axios.post(`/api/v1/medias/validate`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "secret-key": secret_key,
        "public-key": public_key,
      },
    });
  };

  const postPresigned = async (payload: {
    parent: {
      url: string;
      mimetype: string;
      key: string;
      fileName: string;
      placements: number[];
    };
    children?: {
      url: string;
      mimetype: string;
      key: string;
      fileName: string;
    }[];
  }) => {
    const secret_key = sessionStorage.getItem("secret_key");
    const public_key = sessionStorage.getItem("public_key");

    if (!secret_key || !public_key) {
      throw new Error("Please select a company to view users");
    }

    await axios.post(`/api/v1/mediaGCs`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "secret-key": secret_key,
        "public-key": public_key,
      },
    });
  };

  const postApprovedPresigned = async ({
    groupId,
    permissionIds,
  }: {
    groupId: string;
    permissionIds?: number[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const secret_key = sessionStorage.getItem("secret_key");
      const public_key = sessionStorage.getItem("public_key");
      if (!secret_key || !public_key) {
        setError("Please select a company to view users");
        setLoading(false);
        return;
      }

      const body = {
        groupId,
        status: "approved",
        ...(permissionIds && permissionIds.length > 0 ? { permissionIds } : {}),
      };

      const res = await axios.post("/api/v1/mediaGCs/approval", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });

      if (res.status === 200) {
        toast.success("Approval successful!");
      } else {
        setError("Approval failed.");
      }

      setMediaLibraryUpload(res.data.data.data);
      toast.success(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const getPlacements = async () => {
    setLoading(true);
    setError(null);
    try {
      const secret_key = sessionStorage.getItem("secret_key");
      const public_key = sessionStorage.getItem("public_key");
      if (!secret_key || !public_key) {
        setError("Please select a company to view users");
        setLoading(false);
        return;
      }

      const res = await axios.get("/api/v1/mediaPlacements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setPlacements(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const getApprovalPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const secret_key = sessionStorage.getItem("secret_key");
      const public_key = sessionStorage.getItem("public_key");
      if (!secret_key || !public_key) {
        setError("Please select a company to view users");
        setLoading(false);
        return;
      }
      const res = await axios.get("/api/v1/mediaPermissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });
      setImageApprovalPermissions(res.data.data.data);
      toast.success(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const getMedia = async (filters: Record<string, string | number>) => {
    setLoading(true);
    setError(null);
    try {
      const secret_key = sessionStorage.getItem("secret_key");
      const public_key = sessionStorage.getItem("public_key");
      if (!secret_key || !public_key) {
        setError("Please select a company to view media");
        setLoading(false);
        return;
      }

      const query = new URLSearchParams(filters as any).toString();

      const { data } = await axios.get(`/api/v1/medias?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          "secret-key": secret_key,
          "public-key": public_key,
        },
      });

      toast.success(data.message || "Medias fetched successfully!");

      return data.data.docs || [];
    } catch (err: any) {
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const getMediaById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const secret_key = sessionStorage.getItem("secret_key");
      const public_key = sessionStorage.getItem("public_key");
      if (!secret_key || !public_key) {
        setError("Please select a company to view media");
        setLoading(false);
        return;
      }
      const { data } = await axios.get(`/api/v1/medias/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,

          "secret-key": secret_key,
          "public-key": public_key,
        },
      });

      return data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MediaLibraryContext.Provider
      value={{
        mediaLibraryUpload,
        imageApprovalPermissions,
        placements,
        loading,
        error,
        postApprovedPresigned,
        uploadPresigned,
        getPresigned,
        validateMedia,
        postPresigned,
        getPlacements,
        getApprovalPermissions,
        getMedia,
        getMediaById,
      }}
    >
      {children}
    </MediaLibraryContext.Provider>
  );
};

export const useMediaLibraryState = () => {
  const state = useContext(MediaLibraryContext);
  if (!state) {
    throw new Error("MediaLibraryContext not found");
  }
  return state;
};

export default MediaLibraryContextProvider;
