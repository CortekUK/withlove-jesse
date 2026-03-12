import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { NavigationForm } from "@/components/admin/NavigationForm";

export default function NewNavItemPage() {
  return (
    <AdminPageShell title="Add menu item" description="Add a link to header or footer.">
      <div className="max-w-xl">
        <NavigationForm />
      </div>
    </AdminPageShell>
  );
}
