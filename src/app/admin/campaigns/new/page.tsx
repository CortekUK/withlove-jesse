import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { CampaignForm } from "@/components/admin/CampaignForm";

export default function NewCampaignPage() {
  return (
    <AdminPageShell title="Add campaign" description="Create a seasonal campaign.">
      <div className="max-w-xl">
        <CampaignForm />
      </div>
    </AdminPageShell>
  );
}
