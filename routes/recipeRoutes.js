const express = require('express');
const {
  createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe,
} = require('../controllers/recipeController');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.route('/').post(createRecipe).get(getAllRecipes);
router
  .route('/:id')
  .get(validateObjectId, getRecipeById)
  .put(validateObjectId, updateRecipe)
  .delete(validateObjectId, deleteRecipe);

module.exports = router;
