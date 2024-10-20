const pool = require("./db");

async function getVegetarianRecipesWithPotato() {
  const [rows] = await pool.query(`
    SELECT r.name 
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE r.is_vegetarian = true AND i.name = 'potato'
  `);
  return rows;
}

async function getNoBakeCakes() {
  const [rows] = await pool.query(`
    SELECT name 
    FROM recipes 
    WHERE category_id = (SELECT id FROM categories WHERE name = 'cake') 
    AND needs_baking = false
  `);
  return rows;
}

async function getVeganJapaneseRecipes() {
  const [rows] = await pool.query(`
    SELECT name 
    FROM recipes 
    WHERE is_vegan = true AND cuisine = 'Japanese'
  `);
  return rows;
}

(async () => {
  try {
    const vegetarianRecipesWithPotato = await getVegetarianRecipesWithPotato();
    console.log("Vegetarian recipes with potato:", vegetarianRecipesWithPotato);

    const noBakeCakes = await getNoBakeCakes();
    console.log("No bake cakes:", noBakeCakes);

    const veganJapaneseRecipes = await getVeganJapaneseRecipes();
    console.log("Vegan and Japanese recipes:", veganJapaneseRecipes);
  } catch (err) {
    console.error("Error executing queries:", err);
  }
})();
