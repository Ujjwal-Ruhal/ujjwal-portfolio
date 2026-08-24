import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Button, Section } from "@/components/ui";

export default function ContactPage() {
  const contactItems: Array<[LucideIcon, string]> = [[Mail, "care@zyvara.in"], [Phone, "+91 99999 99999"], [MapPin, "Mumbai, India"]];
  return (
    <Section eyebrow="Contact" title="We are here for the sparkle questions">
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form className="glass rounded-lg p-6"><input placeholder="Name" className="mb-3 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-gold" /><input placeholder="Email" className="mb-3 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-gold" /><textarea placeholder="Message" rows={6} className="mb-3 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-gold" /><Button>Send message</Button></form>
        <div className="grid gap-4">{contactItems.map(([Icon, text]) => <div key={text} className="glass rounded-lg p-6"><Icon className="mb-4 text-gold" /><p className="text-xl text-champagne">{text}</p></div>)}</div>
      </div>
    </Section>
  );
}
