import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <AdminPageShell
      title="Customers"
      description="View customer data from orders."
    >
      <AdminEmptyState
        icon={Users}
        title="No customers yet"
        description="Customer information will appear here as orders are placed."
      />
    </AdminPageShell>
  );
}
