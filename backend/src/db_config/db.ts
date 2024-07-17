import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import dotenv from "dotenv";

import * as schema from "./schema";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.log("🔴 Cannot find database url");
}

let db:any=null;
try {
  const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
  db = drizzle(client, { schema: schema, logger: true });

  console.log("Database Connection Successful")
}catch(error){
  console.log(error)
}



export default db;