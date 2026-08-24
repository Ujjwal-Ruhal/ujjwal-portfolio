import { ProductCard, Section } from "@/components/ui";
import { products } from "@/lib/data";

export default function WishlistPage() {
  return <Section eyebrow="Wishlist" title="Saved for later"><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product._id} product={product} />)}</div></Section>;
}
