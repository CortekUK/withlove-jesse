import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminSeoPage() {
  return (
    <AdminPageShell
      title="SEO Settings"
      description="Default meta title, description, and Open Graph."
    >
      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <p className="text-premium-taupe text-sm">
          SEO is configured per-page. Add a Site Settings section for default
          meta tags.
        </p>
      </div>
    </AdminPageShell>
  );
}
