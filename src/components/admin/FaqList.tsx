"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Toast } from "./Toast";
import type { Faq } from "@prisma/client";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleDelete(id: string) {
    setDeleting(id);
    const res = await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setToast({ message: "FAQ deleted", type: "success" });
      router.refresh();
    } else {
      setToast({ message: "Failed to delete", type: "error" });
    }
  }

  return (
    <>
      <div className="rounded-xl border border-sand-200 overflow-hidden bg-white shadow-soft">
        <ul className="divide-y divide-sand-100">
          {faqs.map((faq) => (
            <li
              key={faq.id}
              className="flex items-start justify-between gap-4 p-4 hover:bg-premium-bg/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-premium-brown">{faq.question}</h4>
                <p className="mt-1 text-sm text-premium-taupe line-clamp-2">
                  {faq.answer}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/faq/${faq.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteButton
                  faq={faq}
                  onDelete={() => handleDelete(faq.id)}
                  disabled={!!deleting}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}

function DeleteButton({
  faq,
  onDelete,
  disabled,
}: {
  faq: Faq;
  onDelete: () => void;
  disabled: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowConfirm(true)}
        disabled={disabled}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <ConfirmDialog
        open={showConfirm}
        title="Delete FAQ"
        description={`Delete "${faq.question}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          setShowConfirm(false);
          onDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
