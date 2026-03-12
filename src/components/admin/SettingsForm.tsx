"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "./Toast";

export function SettingsForm({
  keys,
  initial,
}: {
  keys: { key: string; label: string }[];
  initial: Record<string, string>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [values, setValues] = useState<Record<string, string>>(initial);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      for (const { key } of keys) {
        const value = values[key] ?? "";
        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
      }
      setToast({ message: "Settings saved", type: "success" });
      router.refresh();
    } catch {
      setToast({ message: "Failed to save", type: "error" });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {keys.map(({ key, label }) => (
        <div key={key}>
          <Label htmlFor={key}>{label}</Label>
          {key === "shipping_notice" || key === "contact_intro" ? (
            <Textarea
              id={key}
              value={values[key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              rows={3}
              className="mt-2"
            />
          ) : (
            <Input
              id={key}
              value={values[key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              className="mt-2"
            />
          )}
        </div>
      ))}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save settings"}
      </Button>
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </form>
  );
}
