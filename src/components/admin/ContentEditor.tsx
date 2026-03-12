"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { EditableContentBlock } from "@prisma/client";

export function ContentEditor({
  block,
  label,
  rows = 3,
}: {
  block: EditableContentBlock;
  label: string;
  rows?: number;
}) {
  const router = useRouter();
  const [content, setContent] = useState(block.content);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    const res = await fetch(`/api/admin/content/${block.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="p-4 rounded-xl border border-sand-200 bg-white shadow-soft">
      <label className="block font-medium text-sand-800 mb-2">{label}</label>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={rows}
        className="mb-3"
      />
      <Button size="sm" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
