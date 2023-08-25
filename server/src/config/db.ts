import mongoose, {ConnectOptions} from "mongoose";
import {PrismaClient} from "@prisma/client";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`.magenta.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Williams123@localhost:5432/myassesmentdb?schema=public",
    },
  },
});

// export default prisma;
