// app/lib/db.ts
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Please set it in .env.local");
  }

  pool = new Pool({
    connectionString,
  });

  return pool;
}