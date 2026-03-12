import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Image } from "lucide-react";

export default function AdminMediaPage() {
  return (
    <AdminPageShell
      title="Media Library"
      description="Manage images for products, hero, and banners."
    >
      <AdminEmptyState
        icon={Image}
        title="Media library coming soon"
        description="Upload and manage images in one place. For now, use image URLs in product and content editors."
      />
    </AdminPageShell>
  );
}
