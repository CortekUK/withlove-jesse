"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Toast } from "./Toast";
import type { NavigationItem } from "@prisma/client";

export function NavigationList({ items }: { items: NavigationItem[] }) {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/navigation/${id}`, { method: "DELETE" });
    setConfirmId(null);
    if (res.ok) {
      setToast({ message: "Item deleted", type: "success" });
      router.refresh();
    } else {
      setToast({ message: "Failed to delete", type: "error" });
    }
  }

  if (items.length === 0) {
    return <p className="text-premium-taupe text-sm">No items in this section.</p>;
  }

  return (
    <>
      <div className="rounded-xl border border-sand-200 overflow-hidden bg-white">
        <ul className="divide-y divide-sand-100">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-4 hover:bg-premium-bg/30">
              <div>
                <span className="font-medium text-premium-brown">{item.label}</span>
                <span className="text-premium-taupe text-sm ml-2">→ {item.href}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/navigation/${item.id}`}><Pencil className="h-4 w-4" /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-red-600" onClick={() => setConfirmId(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {confirmId && (
        <ConfirmDialog
          open={!!confirmId}
          title="Delete menu item"
          variant="destructive"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </>
  );
}
