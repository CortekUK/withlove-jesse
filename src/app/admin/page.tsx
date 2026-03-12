import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Package, FolderOpen, ShoppingBag, Plus, FileText, FolderPlus } from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
  ]);

  return (
    <AdminPageShell
      title="Dashboard"
      description="Overview of your store"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link
          href="/admin/products"
          className="rounded-xl border border-sand-200 bg-white p-6 hover:shadow-premium hover:border-sand-300 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-premium-soft flex items-center justify-center text-premium-taupe">
              <Package className="h-5 w-5" />
            </div>
            <span className="font-medium text-premium-brown">Products</span>
          </div>
          <p className="text-2xl font-semibold text-premium-brown">{productCount}</p>
          <p className="text-sm text-premium-taupe mt-1">Manage products</p>
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-xl border border-sand-200 bg-white p-6 hover:shadow-premium hover:border-sand-300 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-premium-soft flex items-center justify-center text-premium-taupe">
              <FolderOpen className="h-5 w-5" />
            </div>
            <span className="font-medium text-premium-brown">Categories</span>
          </div>
          <p className="text-2xl font-semibold text-premium-brown">{categoryCount}</p>
          <p className="text-sm text-premium-taupe mt-1">Manage occasions</p>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-xl border border-sand-200 bg-white p-6 hover:shadow-premium hover:border-sand-300 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-premium-soft flex items-center justify-center text-premium-taupe">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="font-medium text-premium-brown">Orders</span>
          </div>
          <p className="text-2xl font-semibold text-premium-brown">{orderCount}</p>
          <p className="text-sm text-premium-taupe mt-1">View orders</p>
        </Link>
      </div>

      <div className="rounded-xl border border-sand-200 bg-white p-6">
        <h3 className="font-medium text-premium-brown mb-4">Quick actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/admin/products/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add product
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/categories/new" className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Add category
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Edit content
            </Link>
          </Button>
        </div>
      </div>
    </AdminPageShell>
  );
}
