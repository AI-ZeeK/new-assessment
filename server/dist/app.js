import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comment.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import redis from "redis";
import { PrismaClient } from "@prisma/client";
import friendsRoutes from "./routes/friends.js";
import UserRoutes from "./routes/user.js";
export const prisma = new PrismaClient();
export const redisClient = redis.createClient();
//  Configurations
const color = colors;
dotenv.config();
const app = express();
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 100, // maximum requests allowed per windowMs
});
// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
    res.send("Deployed successfully");
});
app.use("/api/post/users/:authorId", limiter);
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", friendsRoutes);
app.use("/api", UserRoutes);
// Mongoose SETUP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Started on Port:${PORT}`.bgYellow.italic));
// app.on("close", async () => {
//   await prisma.$disconnect();
// });
// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Connected to database");
//     // Your app logic here
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   } finally {
//     prisma.$disconnect();
//     console.log("Disconnected from database");
//   }
// }
// main();
