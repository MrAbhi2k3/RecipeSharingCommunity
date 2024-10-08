const Recipe = require("../Schema/RecipeSchema");
const Liked = require("../Schema/LikedRecipeSchema");


// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      imageUrl,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();

    res.status(200).json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.deleteOne({ _id: recipeId });

    if (!deletedRecipe.deletedCount) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing recipe
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { title, ingredients, instructions, imageUrl } = req.body;

    // Find and update the recipe by ID
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { title, ingredients, instructions, imageUrl }, // Fields to update
      { new: true } // Return the updated recipe
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", updatedRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipeById = async (req, res) => {
  const recipeId = req.params.id; // Get recipe ID from URL parameters
  try {
    const recipe = await Recipe.findById(recipeId);  // Fetch recipe from DB
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });  // If not found, return 404
    }
    res.status(200).json(recipe);  // Return recipe data
  } catch (error) {
    console.error(error);  // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
};

// Like a recipe (add to favorites)
const LikedList = async (req, res) => {
  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });

    const existingFavorite = await Liked.findOne({ title: recipe.title });

    if (existingFavorite) {
      return res
        .status(400)
        .json({ error: "Recipe already exists in your favorites" });
    }

    const { title, instructions, imageUrl, ingredients } = recipe;
    const newFavorite = await Liked.create({
      title,
      instructions,
      imageUrl,
      ingredients,
    });

    return res.status(201).json({ favoriteRecipe: newFavorite });
  } catch (error) {
    console.error("Error in Liked:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all liked recipes
const getAllLikedRecipes = async (req, res) => {
  try {
    const allLikedRecipes = await Liked.find();

    res.status(200).json(allLikedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove from liked recipes
const removeFromLikedRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedLikedRecipe = await Liked.deleteOne({ _id: recipeId });

    if (!deletedLikedRecipe.deletedCount) {
      return res.status(404).json({ error: "Liked recipe not found" });
    }

    res.status(200).json({ message: "Recipe removed from liked recipes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search for recipes
const searchRecipes = async (req, res) => {
  const searchKey = req.params.key;

  try {
    const recipes = await Recipe.find({
      title: { $regex: new RegExp(searchKey, "i") },
    });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getAllLikedRecipes,
  LikedList,
  removeFromLikedRecipes,
  searchRecipes,
  getRecipeById,
};
