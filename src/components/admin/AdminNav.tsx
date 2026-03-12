"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Settings,
  Megaphone,
  LogOut,
  Home,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/content", label: "Content", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav({ user }: { user: { email?: string | null } }) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-sand-200 bg-cream-50 z-50">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="font-serif text-lg text-sand-800">
            Withlove, Jesse
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-sand-200 text-sand-800 font-medium"
                      : "text-sand-600 hover:bg-sand-100 hover:text-sand-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              View site
            </Link>
          </Button>
          <span className="text-sm text-sand-500 hidden sm:inline">
            {user.email}
          </span>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
