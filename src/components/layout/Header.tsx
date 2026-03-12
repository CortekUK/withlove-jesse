"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";

type HeaderProps = {
  links: { href: string; label: string }[];
  siteTitle: string;
};

export function Header({ links, siteTitle }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-premium-bg/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-medium text-premium-brown hover:text-premium-black transition-colors"
        >
          {siteTitle}
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-premium-taupe hover:text-premium-brown transition-colors py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-premium-brown group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="/cart"
              aria-label="Cart"
              className="text-premium-taupe hover:text-premium-brown hover:bg-premium-soft"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-premium-taupe hover:text-premium-brown"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-sand-200 overflow-hidden"
          >
            <nav className="py-4 px-4 bg-premium-bg flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-premium-brown hover:text-premium-black font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
