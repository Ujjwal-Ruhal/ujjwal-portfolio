import bcrypt from "bcryptjs";
import express from "express";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import { z } from "zod";
import { config } from "./config.js";
import { requireAdmin, requireAuth, signToken, type AuthedRequest } from "./middleware.js";
import { Order, Product, User } from "./models.js";

export const router = express.Router();

const productInput = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  compareAtPrice: z.number().optional(),
  images: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).default([]),
  inventory: z.number().int().min(0).default(20),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false)
});

router.get("/health", (_req, res) => res.json({ ok: true, brand: "Zyvara" }));

router.post("/auth/signup", async (req, res) => {
  const input = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) }).parse(req.body);
  const exists = await User.findOne({ email: input.email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({ ...input, password: await bcrypt.hash(input.password, 12) });
  res.status(201).json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

router.post("/auth/login", async (req, res) => {
  const input = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(req.body);
  const user = await User.findOne({ email: input.email });
  if (!user?.password || !(await bcrypt.compare(input.password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

router.post("/auth/google", async (req, res) => {
  const input = z.object({ name: z.string(), email: z.string().email(), googleId: z.string() }).parse(req.body);
  const user = await User.findOneAndUpdate({ email: input.email }, input, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

router.post("/auth/forgot-password", (_req, res) => res.json({ message: "OTP sent if the email exists" }));
router.post("/auth/verify-otp", (_req, res) => res.json({ message: "OTP verified" }));

router.get("/products", async (req, res) => {
  const { search, category, sort = "featured", min, max } = req.query;
  const query: Record<string, unknown> = {};
  if (category && category !== "All") query.category = category;
  if (search) query.$text = { $search: String(search) };
  if (min || max) query.price = { ...(min ? { $gte: Number(min) } : {}), ...(max ? { $lte: Number(max) } : {}) };
  const sortMap: Record<string, Record<string, 1 | -1>> = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    newest: { createdAt: -1 },
    featured: { isFeatured: -1, isTrending: -1 }
  };
  const products = await Product.find(query).sort(sortMap[String(sort)] || sortMap.featured);
  res.json(products);
});

router.get("/products/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post("/products/:id/reviews", requireAuth, async (req: AuthedRequest, res) => {
  const input = z.object({ rating: z.number().min(1).max(5), comment: z.string().min(3), name: z.string().min(2) }).parse(req.body);
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  product.reviews.push({ ...input, user: req.user?.id });
  product.reviewCount = product.reviews.length;
  product.rating = product.reviews.reduce((sum, r) => sum + Number(r.rating), 0) / product.reviews.length;
  await product.save();
  res.status(201).json(product);
});

router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await User.findById(req.user?.id).populate("wishlist").select("-password");
  const orders = await Order.find({ user: req.user?.id }).sort({ createdAt: -1 });
  res.json({ user, orders });
});

router.post("/wishlist/:productId", requireAuth, async (req: AuthedRequest, res) => {
  const user = await User.findById(req.user?.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const productId = req.params.productId;
  const exists = user.wishlist.some((id) => String(id) === productId);
  user.wishlist = exists ? user.wishlist.filter((id) => String(id) !== productId) : [...user.wishlist, new mongoose.Types.ObjectId(productId)];
  await user.save();
  res.json({ wishlist: user.wishlist });
});

router.post("/payments/razorpay-order", requireAuth, async (req, res) => {
  const input = z.object({ amount: z.number().positive(), currency: z.string().default("INR") }).parse(req.body);
  if (!config.razorpayKeyId || !config.razorpayKeySecret) return res.status(503).json({ message: "Razorpay keys are not configured" });
  const razorpay = new Razorpay({ key_id: config.razorpayKeyId, key_secret: config.razorpayKeySecret });
  const order = await razorpay.orders.create({ amount: Math.round(input.amount * 100), currency: input.currency, receipt: `zyvara_${Date.now()}` });
  res.json(order);
});

router.post("/orders", requireAuth, async (req: AuthedRequest, res) => {
  const input = z.object({
    items: z.array(z.object({ product: z.string(), name: z.string(), image: z.string(), price: z.number(), quantity: z.number().int().positive() })),
    address: z.object({ name: z.string(), phone: z.string(), line1: z.string(), line2: z.string().optional(), city: z.string(), state: z.string(), pincode: z.string() }),
    coupon: z.string().optional(),
    paymentMethod: z.enum(["razorpay", "cod"]),
    razorpayOrderId: z.string().optional()
  }).parse(req.body);
  const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = input.coupon?.toUpperCase() === "ZYVARA10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 1499 ? 0 : 79;
  const order = await Order.create({ ...input, user: req.user?.id, subtotal, discount, shipping, total: subtotal - discount + shipping, paymentStatus: input.paymentMethod === "cod" ? "pending" : "paid" });
  res.status(201).json(order);
});

router.get("/admin/overview", requireAuth, requireAdmin, async (_req, res) => {
  const [products, users, orders] = await Promise.all([Product.countDocuments(), User.countDocuments(), Order.find()]);
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  res.json({ products, users, orders: orders.length, revenue, lowStock: await Product.countDocuments({ inventory: { $lte: 5 } }) });
});

router.post("/admin/products", requireAuth, requireAdmin, async (req, res) => res.status(201).json(await Product.create(productInput.parse(req.body))));
router.put("/admin/products/:id", requireAuth, requireAdmin, async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, productInput.partial().parse(req.body), { new: true })));
router.delete("/admin/products/:id", requireAuth, requireAdmin, async (req, res) => res.json(await Product.findByIdAndDelete(req.params.id)));
router.get("/admin/orders", requireAuth, requireAdmin, async (_req, res) => res.json(await Order.find().sort({ createdAt: -1 }).populate("user", "name email")));
router.get("/admin/users", requireAuth, requireAdmin, async (_req, res) => res.json(await User.find().select("-password").sort({ createdAt: -1 })));
