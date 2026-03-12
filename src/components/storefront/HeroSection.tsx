"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&q=80";

export function HeroSection({
  imageUrl,
  title,
  subtitle,
  cta,
}: {
  imageUrl?: string;
  title: string;
  subtitle: string;
  cta: string;
}) {
  const src = imageUrl || FALLBACK_IMAGE;
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-premium-brown/40 via-premium-brown/20 to-premium-brown/50"
          aria-hidden
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-premium-brown hover:bg-premium-soft hover:text-premium-brown shadow-lift"
          >
            <Link href="/shop">{cta}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
