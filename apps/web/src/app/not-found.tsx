import Link from "next/link";
import { Button, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section eyebrow="404" title="This sparkle slipped away">
      <p className="mt-6 max-w-xl text-white/65">The page or product you are looking for is not available right now.</p>
      <Link href="/shop" className="mt-6 inline-flex"><Button>Back to shop</Button></Link>
    </Section>
  );
}
