const Recipe = require('../models/Recipe');
const view = require('../views/recipeView');

// Fields a client is allowed to set (prevents mass-assignment of _id, timestamps, etc.)
const ALLOWED_FIELDS = [
  'title', 'description', 'ingredients', 'instructions',
  'prepTime', 'cookTime', 'servings', 'difficulty', 'category',
];

const pickAllowed = (body = {}) =>
  ALLOWED_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

/**
 * @desc   Create a new recipe
 * @route  POST /api/recipes
 */
const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(pickAllowed(req.body));
    res.status(201).json(view.single(recipe, 'Recipe created successfully'));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get all recipes (supports ?search=, ?category=, ?difficulty=, ?page=, ?limit=)
 * @route  GET /api/recipes
 */
const getAllRecipes = async (req, res, next) => {
  try {
    const { search, category, difficulty } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

    const filter = {};
    if (search) {
      // Escape regex special characters so user input is treated literally
      const safe = String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = { $regex: safe, $options: 'i' };
    }
    if (category) filter.category = String(category).toLowerCase();
    if (difficulty) filter.difficulty = String(difficulty).toLowerCase();

    const [recipes, total] = await Promise.all([
      Recipe.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Recipe.countDocuments(filter),
    ]);

    res.status(200).json(
      view.list(recipes, { total, page, pages: Math.ceil(total / limit) })
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get a single recipe by ID
 * @route  GET /api/recipes/:id
 */
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json(view.error('Recipe not found'));
    }
    res.status(200).json(view.single(recipe));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Update a recipe by ID
 * @route  PUT /api/recipes/:id
 */
const updateRecipe = async (req, res, next) => {
  try {
    const updates = pickAllowed(req.body);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json(view.error('No valid fields provided for update'));
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updates, {
      new: true,            // return the updated document
      runValidators: true,  // enforce schema validation on update
    });
    if (!recipe) {
      return res.status(404).json(view.error('Recipe not found'));
    }
    res.status(200).json(view.single(recipe, 'Recipe updated successfully'));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Delete a recipe by ID
 * @route  DELETE /api/recipes/:id
 */
const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json(view.error('Recipe not found'));
    }
    res.status(200).json(view.message('Recipe deleted successfully'));
  } catch (err) {
    next(err);
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
