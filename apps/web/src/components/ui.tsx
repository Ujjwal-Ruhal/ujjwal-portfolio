"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-obsidian shadow-glow transition hover:-translate-y-0.5 hover:bg-champagne ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Section({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-semibold text-champagne sm:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((state) => state.add);
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-black/40">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute left-3 top-3 rounded-full bg-obsidian/80 px-3 py-1 text-xs text-champagne">{product.category}</div>
        <button aria-label="Add to wishlist" className="absolute right-3 top-3 rounded-full bg-white/15 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-obsidian">
          <Heart size={18} />
        </button>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}`} className="font-display text-xl text-champagne hover:text-gold">{product.name}</Link>
            <div className="mt-1 flex items-center gap-1 text-sm text-white/70"><Star size={15} className="fill-gold text-gold" /> {product.rating} ({product.reviewCount})</div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gold">{formatPrice(product.price)}</p>
            {product.compareAtPrice && <p className="text-xs text-white/40 line-through">{formatPrice(product.compareAtPrice)}</p>}
          </div>
        </div>
        <Button onClick={() => add(product)} className="w-full"><ShoppingBag size={17} /> Add to cart</Button>
      </div>
    </motion.article>
  );
}

export function SkeletonCard() {
  return <div className="h-[420px] animate-pulse rounded-lg bg-white/[0.06]" />;
}
