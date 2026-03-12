import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { FaqForm } from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <AdminPageShell title="Add FAQ" description="Create a new frequently asked question.">
      <div className="max-w-xl">
        <FaqForm />
      </div>
    </AdminPageShell>
  );
}
