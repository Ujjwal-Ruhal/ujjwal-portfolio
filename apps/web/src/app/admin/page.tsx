"use client";

import { BarChart as ChartIcon, Edit, Package, Plus, ShoppingCart, Trash2, Users, type LucideIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button, Section } from "@/components/ui";
import { formatPrice, products } from "@/lib/data";

const chartData = [
  { name: "Mon", sales: 24000 },
  { name: "Tue", sales: 32000 },
  { name: "Wed", sales: 28000 },
  { name: "Thu", sales: 41000 },
  { name: "Fri", sales: 52000 },
  { name: "Sat", sales: 68000 }
];

const metrics: Array<[string, string, LucideIcon]> = [["Revenue", "Rs. 2.45L", ChartIcon], ["Orders", "428", ShoppingCart], ["Products", "96", Package], ["Users", "7.8K", Users]];

export default function AdminPage() {
  return (
    <Section eyebrow="Admin" title="Zyvara command center">
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {metrics.map(([label, value, Icon]) => <div key={label} className="glass rounded-lg p-5"><Icon className="mb-4 text-gold" /><p className="text-sm text-white/50">{label}</p><h3 className="font-display text-3xl text-champagne">{value}</h3></div>)}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-3xl text-champagne">Sales overview</h2><Button><Plus size={16} /> Add product</Button></div>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" /><XAxis dataKey="name" stroke="#fff8df88" /><YAxis stroke="#fff8df88" /><Tooltip contentStyle={{ background: "#15120f", border: "1px solid rgba(215,168,76,.35)" }} /><Bar dataKey="sales" fill="#d7a84c" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-display text-3xl text-champagne">Inventory</h2>
          {products.map((p) => <div key={p._id} className="mt-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3 text-sm"><div><p className="text-champagne">{p.name}</p><p className="text-white/45">{formatPrice(p.price)} - {p.inventory} left</p></div><div className="flex gap-2"><button aria-label="Edit" className="rounded-full p-2 hover:bg-white/10"><Edit size={16} /></button><button aria-label="Delete" className="rounded-full p-2 hover:bg-white/10"><Trash2 size={16} /></button></div></div>)}
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5"><h2 className="font-display text-3xl text-champagne">Order management</h2><div className="mt-4 grid gap-3">{["Placed", "Packed", "Shipped", "Delivered"].map((status, i) => <p key={status} className="flex justify-between rounded-lg bg-black/25 p-3 text-white/70"><span>Order ZYV-{1000 + i}</span><b className="text-gold">{status}</b></p>)}</div></div>
    </Section>
  );
}
