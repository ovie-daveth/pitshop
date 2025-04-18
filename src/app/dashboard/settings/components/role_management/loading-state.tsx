"use client";

import { FiRefreshCw } from "react-icons/fi";

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <FiRefreshCw className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}