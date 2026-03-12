import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminContactPage() {
  return (
    <AdminPageShell
      title="Contact Details"
      description="Business address, email, and phone."
    >
      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <p className="text-premium-taupe text-sm">
          Contact details can be managed via Site Settings. Add fields there for
          address, email, and phone.
        </p>
      </div>
    </AdminPageShell>
  );
}
