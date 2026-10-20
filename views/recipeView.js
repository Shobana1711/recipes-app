/**
 * View layer: formats the JSON responses sent back to the client.
 * Keeping this separate keeps controllers free of response-shape details.
 */
const formatRecipe = (recipe) => ({
  id: recipe._id,
  title: recipe.title,
  description: recipe.description,
  ingredients: recipe.ingredients,
  instructions: recipe.instructions,
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  servings: recipe.servings,
  difficulty: recipe.difficulty,
  category: recipe.category,
  createdAt: recipe.createdAt,
  updatedAt: recipe.updatedAt,
});

const single = (recipe, message) => ({
  success: true,
  ...(message && { message }),
  data: formatRecipe(recipe),
});

const list = (recipes, meta) => ({
  success: true,
  count: recipes.length,
  ...meta,
  data: recipes.map(formatRecipe),
});

const message = (text) => ({ success: true, message: text });

const error = (text, details) => ({
  success: false,
  message: text,
  ...(details && { errors: details }),
});

module.exports = { formatRecipe, single, list, message, error };
