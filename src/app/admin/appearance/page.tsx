import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminAppearancePage() {
  return (
    <AdminPageShell
      title="Appearance"
      description="Brand colours, fonts, and logo."
    >
      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <p className="text-premium-taupe text-sm">
          Appearance is defined in the codebase (Tailwind, globals.css). A visual
          customiser can be added here.
        </p>
      </div>
    </AdminPageShell>
  );
}
