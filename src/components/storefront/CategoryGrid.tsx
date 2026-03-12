"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@prisma/client";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.slice(0, 8).map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Link
            href={`/shop?occasion=${cat.slug}`}
            className="group block p-6 md:p-8 rounded-2xl border border-sand-200 bg-white hover:border-premium-accent hover:shadow-lift transition-all duration-300"
          >
            <span className="font-medium text-premium-brown group-hover:text-premium-black transition-colors">
              {cat.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
