import type { Product } from "./types";

export const categories = ["All", "Earrings", "Jhumkas", "Necklaces", "Rings", "Bracelets", "Watches", "Accessories"];

export const products: Product[] = [
  {
    _id: "p1",
    name: "Aurelia Gold Jhumkas",
    slug: "aurelia-gold-jhumkas",
    category: "Jhumkas",
    description: "Lightweight gold-toned jhumkas with pearl drops for festive and everyday styling.",
    price: 899,
    compareAtPrice: 1499,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Bestseller", "Festive"],
    rating: 4.9,
    reviewCount: 128,
    inventory: 32,
    isFeatured: true,
    isTrending: true,
    reviews: [{ name: "Riya", rating: 5, comment: "Looks expensive and feels super light." }]
  },
  {
    _id: "p2",
    name: "Noor Layered Necklace",
    slug: "noor-layered-necklace",
    category: "Necklaces",
    description: "A luxe layered necklace made for sarees, co-ords, date nights, and Instagram reels.",
    price: 1299,
    compareAtPrice: 2199,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Layered", "Party"],
    rating: 4.8,
    reviewCount: 91,
    inventory: 18,
    isFeatured: true
  },
  {
    _id: "p3",
    name: "Mira Silver Stack Ring",
    slug: "mira-silver-stack-ring",
    category: "Rings",
    description: "Minimal silver ring stack with a polished mirror finish and adjustable fit.",
    price: 499,
    compareAtPrice: 899,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Silver", "Minimal"],
    rating: 4.7,
    reviewCount: 204,
    inventory: 42,
    isTrending: true
  },
  {
    _id: "p4",
    name: "Sia Pearl Bracelet",
    slug: "sia-pearl-bracelet",
    category: "Bracelets",
    description: "Pearl bracelet with gold accents, built for soft glam everyday wear.",
    price: 699,
    compareAtPrice: 1199,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Pearl", "Gift"],
    rating: 4.8,
    reviewCount: 76,
    inventory: 26,
    isFeatured: true
  },
  {
    _id: "p5",
    name: "Veda Rose Watch",
    slug: "veda-rose-watch",
    category: "Watches",
    description: "Rose gold fashion watch with a slim dial and jewellery-inspired strap.",
    price: 1799,
    compareAtPrice: 2999,
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Watch", "Rose Gold"],
    rating: 4.6,
    reviewCount: 63,
    inventory: 14,
    isTrending: true
  },
  {
    _id: "p6",
    name: "Ira Charm Hoops",
    slug: "ira-charm-hoops",
    category: "Earrings",
    description: "Everyday hoops with tiny charms for a premium street-style look.",
    price: 599,
    compareAtPrice: 999,
    images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85"],
    tags: ["Hoops", "Daily"],
    rating: 4.9,
    reviewCount: 148,
    inventory: 35,
    isFeatured: true,
    isTrending: true
  }
];

export const formatPrice = (price: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
