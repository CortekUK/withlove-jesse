"use client";

import { useEffect } from "react";

export function Toast({
  message,
  type = "success",
  onDismiss,
}: {
  message: string;
  type?: "success" | "error";
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lift ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
}
