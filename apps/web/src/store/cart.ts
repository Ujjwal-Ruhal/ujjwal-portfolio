"use client";

import toast from "react-hot-toast";
import { create } from "zustand";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
  coupon: string;
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  setCoupon: (coupon: string) => void;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  coupon: "",
  add: (product) => {
    set((state) => {
      const current = state.items.find((item) => item._id === product._id);
      return { items: current ? state.items.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)) : [...state.items, { ...product, quantity: 1 }] };
    });
    toast.success(`${product.name} added to cart`);
  },
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
  setQty: (id, quantity) => set((state) => ({ items: state.items.map((item) => (item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item)) })),
  setCoupon: (coupon) => set({ coupon }),
  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  discount: () => (get().coupon.toUpperCase() === "ZYVARA10" ? Math.round(get().subtotal() * 0.1) : 0),
  shipping: () => (get().subtotal() > 1499 ? 0 : get().items.length ? 79 : 0),
  total: () => get().subtotal() - get().discount() + get().shipping()
}));
