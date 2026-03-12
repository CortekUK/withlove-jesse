"use client";

import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "destructive",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-sand-200 bg-white p-6 shadow-lift mx-4">
        <h3 className="font-medium text-premium-brown">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-premium-taupe">{description}</p>
        )}
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "default" : "secondary"}
            className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
