"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductCard, Button, Section } from "@/components/ui";
import { formatPrice, products } from "@/lib/data";
import { useCart } from "@/store/cart";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === params.slug);
  const add = useCart((state) => state.add);
  if (!product) {
    return (
      <Section eyebrow="404" title="This product slipped away">
        <p className="mt-6 text-white/65">It may be sold out or no longer available.</p>
        <Link href="/shop" className="mt-6 inline-flex"><Button>Back to shop</Button></Link>
      </Section>
    );
  }
  const related = products.filter((p) => p.category === product.category && p._id !== product._id).concat(products.filter((p) => p._id !== product._id)).slice(0, 3);
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
          <Image src={product.images[0]} alt={product.name} fill priority className="object-cover transition duration-700 group-hover:scale-110" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">{product.category}</p>
          <h1 className="font-display text-5xl text-champagne">{product.name}</h1>
          <div className="flex items-center gap-2 text-white/70"><Star className="fill-gold text-gold" size={18} /> {product.rating} from {product.reviewCount} reviews</div>
          <p className="text-lg leading-8 text-white/70">{product.description}</p>
          <div className="flex items-end gap-3"><span className="text-3xl font-bold text-gold">{formatPrice(product.price)}</span>{product.compareAtPrice && <span className="text-white/40 line-through">{formatPrice(product.compareAtPrice)}</span>}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={() => add(product)}>Add to cart</Button>
            <Button onClick={() => add(product)} className="bg-champagne">Buy now</Button>
          </div>
          <button className="flex items-center gap-2 text-sm text-white/70 hover:text-gold"><Heart size={18} /> Save to wishlist</button>
          <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 sm:grid-cols-2">
            <span className="flex items-center gap-2"><Truck className="text-gold" /> Ships in 24 hours</span>
            <span className="flex items-center gap-2"><ShieldCheck className="text-gold" /> Secure checkout</span>
          </div>
        </motion.div>
      </section>
      <Section eyebrow="Reviews" title="Real shine, real reactions">
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(product.reviews?.length ? product.reviews : [{ name: "Ananya", rating: 5, comment: "The finish is beautiful and the packaging felt premium." }, { name: "Megha", rating: 5, comment: "Perfect for college events and brunch outfits." }, { name: "Sara", rating: 4, comment: "Great value for the price." }]).map((review) => (
            <div key={`${review.name}-${review.comment}`} className="glass rounded-lg p-5"><p className="mb-2 text-gold">{"*".repeat(review.rating)}</p><p className="text-white/75">{review.comment}</p><p className="mt-4 text-sm text-white/45">{review.name}</p></div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Related" title="Complete the look">
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </Section>
    </>
  );
}
