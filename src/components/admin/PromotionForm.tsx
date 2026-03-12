"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaUpload } from "./MediaUpload";
import type { Promotion } from "@prisma/client";

export function PromotionForm({ promotion }: { promotion?: Promotion }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState(promotion?.bannerImage || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      title: fd.get("title"),
      description: fd.get("description") || null,
      code: fd.get("code") || null,
      discountType: fd.get("discountType") || "percentage",
      discountValue: parseFloat(String(fd.get("discountValue"))) || 0,
      startsAt: fd.get("startsAt") || null,
      endsAt: fd.get("endsAt") || null,
      isActive: fd.get("isActive") === "on",
      bannerTitle: fd.get("bannerTitle") || null,
      bannerSubtitle: fd.get("bannerSubtitle") || null,
      bannerCta: fd.get("bannerCta") || null,
      bannerLink: fd.get("bannerLink") || null,
      bannerImage: bannerImage || null,
      location: fd.get("location") || null,
    };

    const url = promotion ? `/api/admin/promotions/${promotion.id}` : "/api/admin/promotions";
    const method = promotion ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/promotions");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={promotion?.title} required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={promotion?.description || ""} rows={2} className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Discount code</Label>
          <Input id="code" name="code" defaultValue={promotion?.code || ""} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="discountType">Discount type</Label>
          <select id="discountType" name="discountType" defaultValue={promotion?.discountType || "percentage"} className="mt-2 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed amount</option>
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="discountValue">Discount value</Label>
        <Input id="discountValue" name="discountValue" type="number" step="0.01" defaultValue={promotion?.discountValue ?? 0} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="bannerTitle">Banner title</Label>
        <Input id="bannerTitle" name="bannerTitle" defaultValue={promotion?.bannerTitle || ""} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="bannerCta">Banner CTA</Label>
        <Input id="bannerCta" name="bannerCta" defaultValue={promotion?.bannerCta || ""} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="bannerLink">Banner link</Label>
        <Input id="bannerLink" name="bannerLink" defaultValue={promotion?.bannerLink || ""} placeholder="/shop" className="mt-2" />
      </div>
      <MediaUpload label="Banner image" value={bannerImage} onChange={setBannerImage} accept="image/png,image/jpeg,image/jpg" />
      <div>
        <Label htmlFor="location">Location</Label>
        <select id="location" name="location" defaultValue={promotion?.location || ""} className="mt-2 w-full rounded-lg border border-sand-200 px-3 py-2 text-sm">
          <option value="">—</option>
          <option value="announcement">Announcement bar</option>
          <option value="homepage">Homepage</option>
          <option value="campaign">Campaign</option>
        </select>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="isActive" defaultChecked={promotion?.isActive ?? true} className="rounded" />
        Active
      </label>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : promotion ? "Save" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
