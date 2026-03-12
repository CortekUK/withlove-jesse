"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { Toast } from "./Toast";
import { StatusBadge } from "./StatusBadge";
import type { SeasonalCampaign } from "@prisma/client";

export function CampaignList({ campaigns }: { campaigns: SeasonalCampaign[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  async function handleDelete(id: string) {
    setDeleting(id);
    const res = await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setToast({ message: "Campaign deleted", type: "success" });
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
              <th className="text-left p-4 font-medium text-premium-brown">Campaign</th>
              <th className="text-left p-4 font-medium text-premium-brown">Status</th>
              <th className="text-left p-4 font-medium text-premium-brown">Featured</th>
              <th className="w-24 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b border-sand-100 hover:bg-premium-bg/30">
                <td className="p-4">
                  <div>
                    <span className="font-medium text-premium-brown">{c.name}</span>
                    <span className="text-premium-taupe text-sm ml-2">/{c.slug}</span>
                  </div>
                </td>
                <td className="p-4"><StatusBadge status={c.isActive} /></td>
                <td className="p-4">{c.isFeatured ? "Yes" : "No"}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/campaigns/${c.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      disabled={!!deleting}
                      onClick={() => setConfirmId(c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmId && (
        <ConfirmDialog
          open={!!confirmId}
          title="Delete campaign"
          description="This cannot be undone."
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={() => {
            if (confirmId) handleDelete(confirmId);
            setConfirmId(null);
          }}
          onCancel={() => setConfirmId(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </>
  );
}

