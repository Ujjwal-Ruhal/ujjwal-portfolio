import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: Number,
    images: [String],
    tags: [String],
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    inventory: { type: Number, default: 20 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text" });

const addressSchema = new Schema(
  {
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: String,
    googleId: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    addresses: [addressSchema]
  },
  { timestamps: true }
);

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    image: String,
    price: Number,
    quantity: Number
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    address: addressSchema,
    subtotal: Number,
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: Number,
    coupon: String,
    paymentMethod: { type: String, enum: ["razorpay", "cod"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["placed", "packed", "shipped", "delivered", "cancelled"], default: "placed" },
    razorpayOrderId: String
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
export const User = mongoose.model("User", userSchema);
export const Order = mongoose.model("Order", orderSchema);
