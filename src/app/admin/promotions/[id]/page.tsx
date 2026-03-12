import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { PromotionForm } from "@/components/admin/PromotionForm";

export default async function EditPromotionPage({ params }: { params: { id: string } }) {
  const promotion = await prisma.promotion.findUnique({ where: { id: params.id } });
  if (!promotion) notFound();
  return (
    <AdminPageShell title="Edit promotion" description={promotion.title}>
      <div className="max-w-xl">
        <PromotionForm promotion={promotion} />
      </div>
    </AdminPageShell>
  );
}
