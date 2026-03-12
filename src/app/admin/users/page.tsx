import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminUsersPage() {
  return (
    <AdminPageShell
      title="Admin Access"
      description="Manage admin users and permissions."
    >
      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <p className="text-premium-taupe text-sm">
          Admin users are managed via the database. Add a user management UI
          here for production.
        </p>
      </div>
    </AdminPageShell>
  );
}
