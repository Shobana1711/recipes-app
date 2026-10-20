const mongoose = require('mongoose');
const view = require('../views/recipeView');

/** Rejects requests whose :id param is not a valid MongoDB ObjectId. */
module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json(view.error('Invalid recipe ID format'));
  }
  next();
};
