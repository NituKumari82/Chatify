import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// 1. Security & Logging Middleware
app.use(helmet());
app.use(morgan(ENV.NODE_ENV === "production" ? "combined" : "dev"));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: { message: "Too many requests, please try again later." }
});
app.use("/api", limiter); // Apply only to API routes

// 3. Body Parsers & CORS
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors({ 
  origin: ENV.CLIENT_URL, 
  credentials: true 
}));

// 4. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 5. Deployment / Static Files
if (ENV.NODE_ENV === "production") {
  // Use path.join(__dirname, "frontend", "dist") if frontend is in the same root
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

// 6. Error Handling (Must be after routes)
app.use(errorHandler);

// 7. Start Server
server.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
  await connectDB();
});
