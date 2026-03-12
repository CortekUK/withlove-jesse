"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Toast } from "./Toast";
import { StatusBadge } from "./StatusBadge";
import type { Promotion } from "@prisma/client";

export function PromotionList({ promotions }: { promotions: Promotion[] }) {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/promotions/${id}`, { method: "DELETE" });
    setConfirmId(null);
    if (res.ok) {
      setToast({ message: "Promotion deleted", type: "success" });
      router.refresh();
    } else {
      setToast({ message: "Failed to delete", type: "error" });
    }
  }

  return (
    <>
      <div className="rounded-xl border border-sand-200 overflow-hidden bg-white shadow-soft">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sand-200 bg-premium-soft/50">
              <th className="text-left p-4 font-medium text-premium-brown">Promotion</th>
              <th className="text-left p-4 font-medium text-premium-brown">Code</th>
              <th className="text-left p-4 font-medium text-premium-brown">Status</th>
              <th className="w-24 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr key={p.id} className="border-b border-sand-100 hover:bg-premium-bg/30">
                <td className="p-4 font-medium text-premium-brown">{p.title}</td>
                <td className="p-4 text-premium-taupe font-mono">{p.code || "—"}</td>
                <td className="p-4"><StatusBadge status={p.isActive} /></td>
                <td className="p-4 flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/promotions/${p.id}`}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600" onClick={() => setConfirmId(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmId && (
        <ConfirmDialog
          open={!!confirmId}
          title="Delete promotion"
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </>
  );
}
