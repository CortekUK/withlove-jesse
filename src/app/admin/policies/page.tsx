import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";

export default function AdminPoliciesPage() {
  return (
    <AdminPageShell
      title="Policies Pages"
      description="Edit delivery, returns, privacy, and terms content."
      action={
        <Button asChild variant="outline">
          <Link href="/admin/content">Edit content</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-sand-200 bg-white p-4">
          <h3 className="font-medium text-premium-brown">Delivery</h3>
          <p className="text-sm text-premium-taupe mt-1">
            Managed via content blocks and page files.
          </p>
          <Button asChild variant="ghost" size="sm" className="mt-2">
            <Link href="/delivery" target="_blank">View page</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-sand-200 bg-white p-4">
          <h3 className="font-medium text-premium-brown">Returns</h3>
          <p className="text-sm text-premium-taupe mt-1">
            Managed via content blocks and page files.
          </p>
          <Button asChild variant="ghost" size="sm" className="mt-2">
            <Link href="/returns" target="_blank">View page</Link>
          </Button>
        </div>
      </div>
    </AdminPageShell>
  );
}
