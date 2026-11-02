let ingredients = [];

const ingredientsGrid = document.querySelector("#ingredients-grid");
const searchInput = document.querySelector("#search-input");
const ingredientForm = document.querySelector("#ingredient-form");

// Render ingredients
function renderIngredients(ingredientsArray) {
  ingredientsGrid.innerHTML = "";

  ingredientsArray.forEach((ingredient) => {
    const card = document.createElement("article");

    card.classList.add("ingredient-card");

    card.innerHTML = `
            <div class="ingredient-card-top">
                <span class="ingredient-category">
                    ${ingredient.category.toUpperCase()} · ${ingredient.type.toUpperCase()}
                </span>
                <span class="ingredient-icon">✦</span>
            </div>

            <h3>${ingredient.name}</h3>

            <p class="ingredient-description">
                ${ingredient.description}
            </p>

            <span class="ingredient-type">FRAGRANCE INGREDIENT</span>

            <button class="delete-button">Delete</button>
        `;

    ingredientsGrid.append(card);

    // Delete ingredient
    const deleteButton = card.querySelector(".delete-button");

    deleteButton.addEventListener("click", async () => {
      const response = await fetch(
        `http://localhost:8000/api/ingredients/${ingredient.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        loadIngredients();
      }
    });
  });
}

// Search ingredients
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(searchValue);
  });

  renderIngredients(filteredIngredients);
});

// Load ingredients from database
async function loadIngredients() {
  const response = await fetch("http://localhost:8000/api/ingredients");

  const data = await response.json();

  ingredients = data;

  renderIngredients(ingredients);
}

// Add ingredient
ingredientForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newIngredient = {
    name: document.querySelector("#ingredient-name").value,
    category: document.querySelector("#ingredient-category").value,
    type: document.querySelector("#ingredient-type").value,
    description: document.querySelector("#ingredient-description").value,
  };

  const response = await fetch("http://localhost:8000/api/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIngredient),
  });

  if (response.ok) {
    ingredientForm.reset();
    loadIngredients();
  }
});

// Initial loading
loadIngredients();
