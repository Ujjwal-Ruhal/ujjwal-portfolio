import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config.js";
import { connectDb } from "./db.js";
import { router } from "./routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 400 }));
app.use("/api", router);
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(400).json({ message: err instanceof Error ? err.message : "Something went wrong" });
});

connectDb()
  .then(() => app.listen(config.port, () => console.log(`Zyvara API running on ${config.port}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
