import bcrypt from "bcryptjs";
import { connectDb } from "./db.js";
import { Product, User } from "./models.js";

const products = [
  {
    name: "Aurelia Gold Jhumkas",
    slug: "aurelia-gold-jhumkas",
    category: "Jhumkas",
    description: "Lightweight gold-toned jhumkas with pearl drops for festive and everyday styling.",
    price: 899,
    compareAtPrice: 1499,
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"],
    tags: ["bestseller", "gold", "festive"],
    inventory: 32,
    isFeatured: true,
    isTrending: true
  },
  {
    name: "Noor Layered Necklace",
    slug: "noor-layered-necklace",
    category: "Necklaces",
    description: "A luxe layered necklace made for sarees, co-ords, date nights, and Instagram reels.",
    price: 1299,
    compareAtPrice: 2199,
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"],
    tags: ["layered", "party"],
    inventory: 18,
    isFeatured: true
  },
  {
    name: "Mira Silver Stack Ring",
    slug: "mira-silver-stack-ring",
    category: "Rings",
    description: "Minimal silver ring stack with a polished mirror finish and adjustable fit.",
    price: 499,
    compareAtPrice: 899,
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"],
    tags: ["silver", "minimal"],
    inventory: 42,
    isTrending: true
  },
  {
    name: "Sia Pearl Bracelet",
    slug: "sia-pearl-bracelet",
    category: "Bracelets",
    description: "Pearl bracelet with gold accents, built for soft glam everyday wear.",
    price: 699,
    compareAtPrice: 1199,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=85"],
    tags: ["pearl", "gift"],
    inventory: 26,
    isFeatured: true
  },
  {
    name: "Veda Rose Watch",
    slug: "veda-rose-watch",
    category: "Watches",
    description: "Rose gold fashion watch with a slim dial and jewellery-inspired strap.",
    price: 1799,
    compareAtPrice: 2999,
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=85"],
    tags: ["watch", "rose gold"],
    inventory: 14,
    isTrending: true
  },
  {
    name: "Ira Charm Hoops",
    slug: "ira-charm-hoops",
    category: "Earrings",
    description: "Everyday hoops with tiny charms for a premium street-style look.",
    price: 599,
    compareAtPrice: 999,
    images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85"],
    tags: ["hoops", "daily"],
    inventory: 35,
    isFeatured: true,
    isTrending: true
  }
];

await connectDb();
await Product.deleteMany({});
await User.deleteMany({});
await Product.insertMany(products);
await User.create([
  { name: "Zyvara Admin", email: "admin@zyvara.in", role: "admin", password: await bcrypt.hash("Admin@123", 12) },
  { name: "Anya Kapoor", email: "anya@zyvara.in", role: "user", password: await bcrypt.hash("Zyvara@123", 12) }
]);
console.log("Seeded Zyvara products and demo users");
process.exit(0);
