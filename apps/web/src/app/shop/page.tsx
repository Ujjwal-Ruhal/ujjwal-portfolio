"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard, Section } from "@/components/ui";
import { categories, products } from "@/lib/data";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState(3000);
  const filtered = useMemo(() => {
    return products
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.join(" ").toLowerCase().includes(query.toLowerCase()))
      .filter((p) => p.price <= max)
      .sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : Number(b.isFeatured) - Number(a.isFeatured));
  }, [category, max, query, sort]);
  return (
    <Section eyebrow="Shop" title="Find your next signature piece">
      <div className="mt-8 grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <label className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-3 text-white/60"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search earrings, rings..." className="w-full bg-transparent text-sm text-white outline-none" /></label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full bg-black/30 px-4 py-3 text-sm text-white outline-none">{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full bg-black/30 px-4 py-3 text-sm text-white outline-none"><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select>
        <label className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-3 text-sm text-white/70"><SlidersHorizontal size={18} /> Rs. {max}<input aria-label="Maximum price" type="range" min="500" max="3000" step="100" value={max} onChange={(e) => setMax(Number(e.target.value))} className="min-w-0 flex-1" /></label>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <ProductCard key={product._id} product={product} />)}</div>
    </Section>
  );
}
