import { Section } from "@/components/ui";

export default function FAQPage() {
  const faqs = [
    ["Is Zyvara jewellery waterproof?", "Our pieces are fashion jewellery. Keep them away from perfume, sweat, and water for best life."],
    ["Do you offer COD?", "Yes, Cash on Delivery is available on eligible pincodes."],
    ["How long does shipping take?", "Most orders ship within 24 hours and arrive in 3-7 business days."]
  ];
  return <Section eyebrow="FAQ" title="Everything before you checkout"><div className="mt-8 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-lg border border-white/10 bg-white/[0.04] p-5"><summary className="cursor-pointer font-display text-2xl text-champagne">{q}</summary><p className="mt-3 text-white/65">{a}</p></details>)}</div></Section>;
}
