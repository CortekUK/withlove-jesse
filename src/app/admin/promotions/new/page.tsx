import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { PromotionForm } from "@/components/admin/PromotionForm";

export default function NewPromotionPage() {
  return (
    <AdminPageShell title="Add promotion" description="Create a promotional offer or banner.">
      <div className="max-w-xl">
        <PromotionForm />
      </div>
    </AdminPageShell>
  );
}
