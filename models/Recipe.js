const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Ingredient quantity is required'],
      trim: true,
    },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one ingredient is required',
      },
    },
    instructions: {
      type: [String],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one instruction step is required',
      },
    },
    prepTime: {
      type: Number,
      min: [0, 'Prep time cannot be negative'],
      default: 0, // minutes
    },
    cookTime: {
      type: Number,
      min: [0, 'Cook time cannot be negative'],
      default: 0, // minutes
    },
    servings: {
      type: Number,
      min: [1, 'Servings must be at least 1'],
      default: 1,
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be easy, medium or hard',
      },
      default: 'easy',
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'general',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
