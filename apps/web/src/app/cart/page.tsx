"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, Section } from "@/components/ui";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const cart = useCart();
  return (
    <Section eyebrow="Cart" title="Your shine edit">
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cart.items.length === 0 && <div className="rounded-lg border border-white/10 p-8 text-white/60">Your cart is empty. <Link className="text-gold" href="/shop">Start shopping</Link>.</div>}
          {cart.items.map((item) => (
            <div key={item._id} className="grid grid-cols-[96px_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[120px_1fr_auto]">
              <div className="relative aspect-square overflow-hidden rounded-lg"><Image src={item.images[0]} alt={item.name} fill className="object-cover" /></div>
              <div>
                <h3 className="font-display text-2xl text-champagne">{item.name}</h3>
                <p className="text-gold">{formatPrice(item.price)}</p>
                <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-black/30 p-1">
                  <button aria-label="Decrease" onClick={() => cart.setQty(item._id, item.quantity - 1)} className="rounded-full p-2 hover:bg-white/10"><Minus size={16} /></button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button aria-label="Increase" onClick={() => cart.setQty(item._id, item.quantity + 1)} className="rounded-full p-2 hover:bg-white/10"><Plus size={16} /></button>
                </div>
              </div>
              <button aria-label="Remove" onClick={() => cart.remove(item._id)} className="self-start rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-gold"><Trash2 /></button>
            </div>
          ))}
        </div>
        <aside className="glass h-fit rounded-lg p-5">
          <h2 className="font-display text-3xl text-champagne">Order summary</h2>
          <input value={cart.coupon} onChange={(e) => cart.setCoupon(e.target.value)} placeholder="Coupon code: ZYVARA10" className="mt-5 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <p className="flex justify-between"><span>Subtotal</span><b>{formatPrice(cart.subtotal())}</b></p>
            <p className="flex justify-between"><span>Discount</span><b>{formatPrice(cart.discount())}</b></p>
            <p className="flex justify-between"><span>Shipping</span><b>{cart.shipping() ? formatPrice(cart.shipping()) : "Free"}</b></p>
            <p className="flex justify-between border-t border-white/10 pt-3 text-lg text-champagne"><span>Total</span><b>{formatPrice(cart.total())}</b></p>
          </div>
          <Link href="/checkout"><Button disabled={!cart.items.length} className="mt-6 w-full">Checkout</Button></Link>
        </aside>
      </div>
    </Section>
  );
}
