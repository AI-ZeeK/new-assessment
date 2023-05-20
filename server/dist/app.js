import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comment.js";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
//  Configurations
const color = colors;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
    res.send("Deployed successfully");
});
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
// Mongoose SETUP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Started on Port:${PORT}`.bgYellow.italic));
// app.on("close", async () => {
//   await prisma.$disconnect();
// });
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to database");
        // Your app logic here
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    //   finally {
    //     prisma.$disconnect();
    //     console.log("Disconnected from database");
    //   }
}
// main();
