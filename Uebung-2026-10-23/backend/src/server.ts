import { sql, eq } from "drizzle-orm";
import { db } from "./db.ts";
import { ingredients } from "./schema.ts";

// Create table if it does not exist
await db.run(sql`
    CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL
    )
`);

// Start server
Deno.serve(async (request) => {
  const headers = {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  const url = new URL(request.url);

  // GET - Get all ingredients
  if (request.method === "GET" && url.pathname === "/api/ingredients") {
    const allIngredients = await db.select().from(ingredients);

    return Response.json(allIngredients, { headers });
  }

  // POST - Add a new ingredient
  if (request.method === "POST" && url.pathname === "/api/ingredients") {
    const body = await request.json();

    await db.insert(ingredients).values(body);

    return Response.json(
      { message: "Ingredient added successfully!" },
      { status: 201, headers },
    );
  }

  // PATCH - Update an ingredient
  if (
    request.method === "PATCH" &&
    url.pathname.startsWith("/api/ingredients/")
  ) {
    const id = Number(url.pathname.split("/").pop());
    const body = await request.json();

    await db.update(ingredients).set(body).where(eq(ingredients.id, id));

    return Response.json(
      { message: "Ingredient updated successfully!" },
      { headers },
    );
  }

  // DELETE - Delete an ingredient
  if (
    request.method === "DELETE" &&
    url.pathname.startsWith("/api/ingredients/")
  ) {
    const id = Number(url.pathname.split("/").pop());

    await db.delete(ingredients).where(eq(ingredients.id, id));

    return Response.json(
      { message: "Ingredient deleted successfully!" },
      { headers },
    );
  }

  // Route not found
  return new Response("Route not found", {
    status: 404,
    headers,
  });
});
