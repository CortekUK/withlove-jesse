"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, LogOut, Home } from "lucide-react";

export function AdminHeader({
  user,
  onMenuClick,
  title,
  breadcrumb,
}: {
  user: { email?: string | null };
  onMenuClick: () => void;
  title?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  const pathname = usePathname();

  const pageTitle =
    title ||
    (pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/").pop()?.replace(/-/g, " "));

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-6 border-b border-sand-200 bg-premium-bg/95 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-premium-taupe hover:bg-premium-soft hover:text-premium-brown"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div>
          {breadcrumb && breadcrumb.length > 0 ? (
            <nav className="flex items-center gap-1 text-sm text-premium-taupe">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-premium-brown">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-premium-brown font-medium">
                      {b.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
          <h1 className="font-serif text-xl font-medium text-premium-brown capitalize">
            {pageTitle}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-premium-taupe hover:bg-premium-soft hover:text-premium-brown"
        >
          <Home className="h-4 w-4" />
          View site
        </Link>
        <span className="hidden md:inline text-sm text-premium-taupe max-w-[180px] truncate">
          {user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-premium-taupe hover:bg-premium-soft hover:text-premium-brown"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
