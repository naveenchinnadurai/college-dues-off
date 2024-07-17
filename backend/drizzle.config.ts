import { type Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config;

if (!process.env.DATABASE_URL) {
  console.log("🔴 Cannot find database url");
}

export default {
  schema: "./src/db_config/schema.ts",
  out: "./src/db_config/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
} satisfies Config;