const view = require('../views/recipeView');

const notFound = (req, res) => {
  res.status(404).json(view.error(`Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json(view.error('Validation failed', details));
  }
  // Bad ObjectId / type cast
  if (err.name === 'CastError') {
    return res.status(400).json(view.error(`Invalid value for field "${err.path}"`));
  }
  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json(view.error('Malformed JSON in request body'));
  }
  console.error(err);
  res.status(500).json(view.error('Internal server error'));
};

module.exports = { notFound, errorHandler };
