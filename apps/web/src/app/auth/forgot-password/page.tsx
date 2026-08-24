import { Button, Section } from "@/components/ui";

export default function ForgotPasswordPage() {
  return (
    <Section eyebrow="Recovery" title="Reset your password">
      <div className="glass mx-auto mt-8 max-w-md rounded-lg p-6">
        <input placeholder="Email address" className="mb-3 w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-gold" />
        <Button className="w-full">Send OTP</Button>
      </div>
    </Section>
  );
}
