"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Bot, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ExperienceLayer() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [chatOpen, setChatOpen] = useState(false);
  useEffect(() => {
    const move = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  async function enableNotifications() {
    if ("Notification" in window) await Notification.requestPermission();
  }
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-6 w-6 rounded-full border border-gold/80 mix-blend-difference md:block" animate={{ x: cursor.x - 12, y: cursor.y - 12 }} transition={{ type: "spring", stiffness: 420, damping: 32 }} />
      <button aria-label="Open AI stylist" onClick={() => setChatOpen(true)} className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-obsidian shadow-2xl transition hover:-translate-y-1">
        <Bot />
      </button>
      <AnimatePresence>
        {chatOpen && (
          <motion.aside initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} className="fixed bottom-40 right-5 z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-white/10 bg-obsidian shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4"><div><p className="font-display text-xl text-champagne">Zyvara AI Stylist</p><p className="text-xs text-white/50">Recommendation assistant</p></div><button aria-label="Close AI stylist" onClick={() => setChatOpen(false)} className="rounded-full p-2 hover:bg-white/10"><X size={18} /></button></div>
            <div className="space-y-3 p-4 text-sm text-white/70">
              <p className="rounded-lg bg-white/[0.06] p-3">Tell me your outfit, budget, and occasion. I will suggest rings, jhumkas, or layered pieces from Zyvara.</p>
              <button onClick={enableNotifications} className="flex w-full items-center gap-2 rounded-lg border border-white/10 p-3 text-left hover:border-gold"><Bell size={16} className="text-gold" /> Enable drop alerts</button>
              <div className="flex gap-2 rounded-full bg-black/30 p-2"><input placeholder="Try: black saree under Rs. 1000" className="min-w-0 flex-1 bg-transparent px-3 outline-none" /><button aria-label="Send" className="rounded-full bg-gold p-2 text-obsidian"><Send size={16} /></button></div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
