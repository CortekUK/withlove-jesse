import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";

export default function AdminHomepagePage() {
  return (
    <AdminPageShell
      title="Homepage Sections"
      description="Edit hero, featured products, and homepage content."
      action={
        <Button asChild variant="outline">
          <Link href="/admin/content">Edit content blocks</Link>
        </Button>
      }
    >
      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <p className="text-premium-taupe text-sm">
          Homepage hero and sections are managed via Content Blocks. Go to
          Content Blocks to edit the hero title, subtitle, and CTA.
        </p>
      </div>
    </AdminPageShell>
  );
}
