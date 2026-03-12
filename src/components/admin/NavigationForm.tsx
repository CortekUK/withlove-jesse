"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { NavigationItem } from "@prisma/client";

export function NavigationForm({ item }: { item?: NavigationItem }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      label: fd.get("label"),
      href: fd.get("href"),
      sortOrder: parseInt(String(fd.get("sortOrder"))) || 0,
      location: fd.get("location"),
    };

    const url = item ? `/api/admin/navigation/${item.id}` : "/api/admin/navigation";
    const method = item ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/navigation");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input id="label" name="label" defaultValue={item?.label} required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="href">Link (href)</Label>
        <Input id="href" name="href" defaultValue={item?.href} placeholder="/shop" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <select id="location" name="location" defaultValue={item?.location || "header"} required className="mt-2 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm">
          <option value="header">Header</option>
          <option value="footer">Footer</option>
        </select>
      </div>
      <div>
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input id="sortOrder" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="mt-2" />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : item ? "Save" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
