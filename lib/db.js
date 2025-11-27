// lib/db.js
import mongoose from "mongoose";

// ⛓️ Load connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables.");
}

// Cached connection for Next.js hot reload
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔗 Attempting MongoDB connection...");

    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📁 DB: ${mongoose.connection.db?.databaseName || "N/A"}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        console.log("💡 Fix your MongoDB username/password in Atlas or update .env file");
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
