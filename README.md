
# Recipes CRUD API

A RESTful API for managing recipes using Node.js, Express.js, MongoDB, and Mongoose. The project follows the MVC architecture and includes CRUD operations, validation, and error handling.

## Features

- Create a new recipe
- Retrieve all recipes
- Retrieve a recipe by ID
- Update an existing recipe
- Delete a recipe
- MongoDB integration using Mongoose
- Input validation and error handling
- Postman API documentation

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## Installation

1. Clone the repository.
2. Install dependencies:npm install
3. Create a `.env` file in the root directory:
4. Start MongoDB.
5. Run the application:

   npm run dev

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/recipes | Create a recipe |
| GET | /api/recipes | Get all recipes |
| GET | /api/recipes/:id | Get a recipe by ID |
| PUT | /api/recipes/:id | Update a recipe |
| DELETE | /api/recipes/:id | Delete a recipe |
| GET | /api/health | Check API status |

## Base URL

http://localhost:5000

## Recipe Fields

- title: String, required
- description: String, required
- ingredients: Array of strings, required
- instructions: String, required
- cookingTime: Number, required
- servings: Number, required
- category: String, optional

## Error Handling

The API handles validation errors, invalid IDs, missing recipes, invalid JSON, and unknown routes.

## Postman Documentation

Import the API endpoints into Postman, test all CRUD operations, save sample requests and responses, and publish the collection documentation.

## License

MIT
