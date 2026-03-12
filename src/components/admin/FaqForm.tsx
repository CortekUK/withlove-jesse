"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Faq } from "@prisma/client";

export function FaqForm({ faq }: { faq?: Faq }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      question: fd.get("question"),
      answer: fd.get("answer"),
      sortOrder: parseInt(String(fd.get("sortOrder"))) || 0,
    };
    const url = faq ? `/api/admin/faq/${faq.id}` : "/api/admin/faq";
    const method = faq ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.push("/admin/faq");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          name="question"
          defaultValue={faq?.question}
          required
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          name="answer"
          defaultValue={faq?.answer}
          rows={4}
          required
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="sortOrder">Sort order</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={faq?.sortOrder ?? 0}
          className="mt-2"
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : faq ? "Save changes" : "Create FAQ"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
