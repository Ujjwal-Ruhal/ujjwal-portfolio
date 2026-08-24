import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { User } from "./models.js";

export type AuthedRequest = Request & { user?: { id: string; role: string } };

export function signToken(user: { _id: unknown; role: string }) {
  return jwt.sign({ id: String(user._id), role: user.role }, config.jwtSecret, { expiresIn: "7d" });
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; role: string };
    const user = await User.findById(decoded.id).select("_id role");
    if (!user) return res.status(401).json({ message: "Invalid session" });
    req.user = { id: String(user._id), role: user.role };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
}
