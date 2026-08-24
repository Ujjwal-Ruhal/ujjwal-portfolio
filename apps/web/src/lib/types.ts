export type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  inventory: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  reviews?: { name: string; rating: number; comment: string }[];
};

export type CartItem = Product & { quantity: number };

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};
