import { CategoryForm } from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="font-serif text-2xl text-sand-800 mb-8">Add category</h1>
      <CategoryForm />
    </div>
  );
}
