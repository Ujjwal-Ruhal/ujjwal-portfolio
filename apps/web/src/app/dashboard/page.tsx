import { Heart, MapPin, Package, User, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui";
import { products, formatPrice } from "@/lib/data";

export default function DashboardPage() {
  const cards: Array<[string, string, LucideIcon]> = [["Profile", "Anya Kapoor", User], ["Orders", "3 active", Package], ["Wishlist", "8 saved", Heart], ["Addresses", "2 saved", MapPin]];
  return (
    <Section eyebrow="Dashboard" title="Your Zyvara profile">
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <div key={label} className="glass rounded-lg p-5"><Icon className="mb-4 text-gold" /><p className="text-sm text-white/50">{label}</p><h3 className="font-display text-2xl text-champagne">{value}</h3></div>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5"><h2 className="font-display text-3xl text-champagne">Order history</h2>{["Packed", "Shipped", "Delivered"].map((status, i) => <p key={status} className="mt-4 flex justify-between border-b border-white/10 pb-3 text-white/70"><span>ZYV-2026-0{i + 1}</span><b className="text-gold">{status}</b></p>)}</div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5"><h2 className="font-display text-3xl text-champagne">Wishlist</h2>{products.slice(0, 3).map((p) => <p key={p._id} className="mt-4 flex justify-between border-b border-white/10 pb-3 text-white/70"><span>{p.name}</span><b className="text-gold">{formatPrice(p.price)}</b></p>)}</div>
      </div>
    </Section>
  );
}
