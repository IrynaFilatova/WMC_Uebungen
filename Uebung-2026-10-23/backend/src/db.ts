import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Create SQLite database client
const client = createClient({
  url: "file:local.db",
});

// Initialize Drizzle ORM
export const db = drizzle({ client });
