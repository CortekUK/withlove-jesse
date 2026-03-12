"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    await fetch("/api/contact", {
      method: "POST",
      body: fd,
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="p-6 rounded-xl bg-sand-100/50 border border-sand-200">
        <p className="text-sand-700">
          Thank you for your message. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2"
        />
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
}
