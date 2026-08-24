"use client";

import { CreditCard, IndianRupee, Truck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Section } from "@/components/ui";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/store/cart";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const cart = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("cod");
  const [loading, setLoading] = useState(false);
  async function placeOrder() {
    setLoading(true);
    try {
      let razorpayOrderId: string | undefined;
      if (paymentMethod === "razorpay") {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });
        const rzOrder = await api<{ id: string }>("/payments/razorpay-order", { method: "POST", body: JSON.stringify({ amount: cart.total(), currency: "INR" }) });
        razorpayOrderId = rzOrder.id;
        window.Razorpay?.({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: cart.total() * 100,
          currency: "INR",
          name: "Zyvara",
          description: "Jewellery order",
          order_id: razorpayOrderId,
          theme: { color: "#d7a84c" }
        }).open();
      }
      await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: cart.items.map((item) => ({ product: item._id, name: item.name, image: item.images[0], price: item.price, quantity: item.quantity })),
          address: { name: "Demo Customer", phone: "9999999999", line1: "Zyvara House", city: "Mumbai", state: "Maharashtra", pincode: "400001" },
          coupon: cart.coupon,
          paymentMethod,
          razorpayOrderId
        })
      });
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login required for live checkout");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Section eyebrow="Checkout" title="Almost yours">
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          {["Full name", "Phone", "Address line", "City", "State", "Pincode"].map((field) => <input key={field} placeholder={field} className="rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />)}
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setPaymentMethod("razorpay")} className={`rounded-lg border p-4 text-left ${paymentMethod === "razorpay" ? "border-gold bg-gold/10" : "border-white/10"}`}><CreditCard className="mb-3 text-gold" /> Razorpay</button>
            <button type="button" onClick={() => setPaymentMethod("cod")} className={`rounded-lg border p-4 text-left ${paymentMethod === "cod" ? "border-gold bg-gold/10" : "border-white/10"}`}><Truck className="mb-3 text-gold" /> Cash on Delivery</button>
          </div>
        </form>
        <aside className="glass h-fit rounded-lg p-5">
          <h2 className="font-display text-3xl text-champagne">Payable</h2>
          <p className="mt-5 flex items-center gap-2 text-4xl font-bold text-gold"><IndianRupee /> {cart.total().toLocaleString("en-IN")}</p>
          <p className="mt-3 text-sm text-white/60">Razorpay is wired through the backend order endpoint. Use COD locally until keys are configured.</p>
          <Button disabled={loading || !cart.items.length} onClick={placeOrder} className="mt-6 w-full">{loading ? "Placing..." : "Place order"}</Button>
        </aside>
      </div>
    </Section>
  );
}
