// Drizzle ORM initialization (minimal)
import { drizzle } from "drizzle-orm/mysql2";
import { pool } from "./db";

// Create a Drizzle client using the MySQL pool. If DB isn't reachable,
// initialization may still succeed and errors will surface on queries.
export const db = drizzle(pool as any);

// TODO: define tables/schemas and export helpers
