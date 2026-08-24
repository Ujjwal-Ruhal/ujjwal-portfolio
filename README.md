# Zyvara

Luxury Style. Everyday Price.

Zyvara is a production-oriented full-stack ecommerce jewellery app for a young Indian audience. It includes a premium Next.js storefront, Express + MongoDB API, JWT auth, Google login hooks, Razorpay payment hooks, admin dashboard, PWA files, SEO metadata, sample products, and deployment notes.

## Stack

- Frontend: Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, GSAP
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT, Google OAuth-ready endpoint
- Payments: Razorpay order creation, Cash on Delivery
- Hosting: Vercel frontend, Render backend, MongoDB Atlas

## Local Setup

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
npm run dev
```

Frontend runs on `http://localhost:3000` and API runs on `http://localhost:5000`.

## Seed Data

```bash
npm run seed
```

## Demo Accounts

- Admin: `admin@zyvara.in` / `Admin@123`
- User: `anya@zyvara.in` / `Zyvara@123`

## Deployment

### MongoDB Atlas

Create a cluster, add the connection string to `apps/api/.env` as `MONGODB_URI`, and allow Render's outbound IPs or `0.0.0.0/0` for a quick demo.

### Render Backend

- Root directory: `apps/api`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Required env: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

### Vercel Frontend

- Root directory: `apps/web`
- Build command: `npm run build`
- Required env: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_SITE_URL`

## Architecture

```text
apps/
  api/     Express API, MongoDB models, auth, product/order/payment routes
  web/     Next.js storefront, admin dashboard, reusable UI, commerce state
```

The app is designed to work with real data through the API while still rendering a strong local demo experience using sample catalogue data.
