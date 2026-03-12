"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductImage, Category } from "@prisma/client";

type ProductWithMeta = Product & { images: ProductImage[]; category: Category };

export function PremiumProductCard({ product }: { product: ProductWithMeta }) {
  const mainImage = product.images.find((i) => i.isMain) || product.images[0];
  const price = product.salePrice ? Number(product.salePrice) : Number(product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-premium-soft shadow-soft group-hover:shadow-lift transition-all duration-500">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-premium-taupe/50">
              No image
            </div>
          )}
          {product.salePrice && (
            <span className="absolute top-4 left-4 bg-premium-brown text-white text-xs font-medium px-2.5 py-1 rounded-md">
              Sale
            </span>
          )}
          {(product.isNewArrival || product.isBestSeller) && (
            <span className="absolute top-4 right-4 bg-white/95 text-premium-brown text-xs font-medium px-2.5 py-1 rounded-md">
              {product.isNewArrival ? "New" : "Bestseller"}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-xs text-premium-taupe uppercase tracking-wider">
            {product.category.name}
          </p>
          <h3 className="font-serif text-lg text-premium-brown mt-1 group-hover:text-premium-black transition-colors">
            {product.title}
          </h3>
          <p className="mt-2 font-medium text-premium-brown">
            {formatPrice(price)}
            {product.salePrice && (
              <span className="text-premium-taupe line-through text-sm ml-2">
                {formatPrice(Number(product.price))}
              </span>
            )}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
