"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Section } from "@/components/ui";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@zyvara.in");
  const [password, setPassword] = useState("Admin@123");
  async function login() {
    try {
      const data = await api<{ token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      localStorage.setItem("zyvara_token", data.token);
      toast.success("Welcome back to Zyvara");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  }
  return (
    <Section eyebrow="Login" title="Step back into your shine room">
      <div className="glass mx-auto mt-8 max-w-md rounded-lg p-6">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-3 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="mb-5 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />
        <Button onClick={login} className="w-full">Login</Button>
        <div className="mt-5 flex justify-between text-sm text-white/60"><Link href="/auth/signup" className="hover:text-gold">Create account</Link><Link href="/auth/forgot-password" className="hover:text-gold">Forgot password?</Link></div>
      </div>
    </Section>
  );
}
