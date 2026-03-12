import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="font-serif text-2xl text-sand-800 mb-8">Add product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
