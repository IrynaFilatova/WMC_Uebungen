import { db } from "./db.ts";
import { ingredients } from "./schema.ts";

// Insert initial ingredients
await db.insert(ingredients).values([
  {
    name: "Sandalwood",
    category: "Woody",
    type: "Natural",
    description: "Warm, creamy and soft woody aroma.",
  },
  {
    name: "Rose Oil",
    category: "Floral",
    type: "Natural",
    description: "Soft, elegant and rich floral aroma.",
  },
  {
    name: "Bergamot",
    category: "Citrus",
    type: "Natural",
    description: "Fresh, bright and slightly bitter citrus aroma.",
  },
  {
    name: "Vanillin",
    category: "Gourmand",
    type: "Synthetic",
    description: "Sweet, warm and comforting vanilla aroma.",
  },
  {
    name: "Patchouli",
    category: "Woody",
    type: "Natural",
    description: "Deep, earthy and rich woody aroma.",
  },
  {
    name: "Mint",
    category: "Fresh",
    type: "Natural",
    description: "Cool, crisp and refreshing green aroma.",
  },
]);

console.log("Ingredients added successfully!");
