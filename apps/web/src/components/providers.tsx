"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { ExperienceLayer } from "./experience";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <a aria-label="WhatsApp support" href="https://wa.me/919999999999" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-2xl transition hover:-translate-y-1">
        <MessageCircle />
      </a>
      <ExperienceLayer />
      <Toaster position="top-right" toastOptions={{ style: { background: "#15120f", color: "#fff8df", border: "1px solid rgba(215,168,76,.35)" } }} />
    </>
  );
}
