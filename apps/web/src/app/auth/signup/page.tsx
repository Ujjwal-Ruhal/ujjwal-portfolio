"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Section } from "@/components/ui";
import { api } from "@/lib/api";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  async function signup() {
    try {
      const data = await api<{ token: string }>("/auth/signup", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem("zyvara_token", data.token);
      toast.success("Your Zyvara account is ready");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
  }
  return (
    <Section eyebrow="Signup" title="Create your Zyvara account">
      <div className="glass mx-auto mt-8 max-w-md rounded-lg p-6">
        {(["name", "email", "password"] as const).map((key) => <input key={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} type={key === "password" ? "password" : "text"} placeholder={key[0].toUpperCase() + key.slice(1)} className="mb-3 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />)}
        <Button onClick={signup} className="w-full">Sign up</Button>
      </div>
    </Section>
  );
}
