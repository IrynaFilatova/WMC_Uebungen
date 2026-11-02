import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// Ingredients table
export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
});
