const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/middleware");
const { getRecipeById } = require("../controllers/RecipeController");

const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  LikedList,
  getAllLikedRecipes,
  removeFromLikedRecipes,
  searchRecipes,
  updateRecipe,
} = require("../controllers/RecipeController");

// Route definitions
router.post("/recipe", createRecipe);
router.get("/recipe", verifyToken, getAllRecipes);
router.get("/likedRecipes", getAllLikedRecipes);
router.delete("/recipe/:id", deleteRecipe);
router.post("/likedRecipes/:id", LikedList);
router.delete("/removeLiked/:id", removeFromLikedRecipes);
router.get("/searchRecipes/:key", searchRecipes);
router.put("/recipe/:id", updateRecipe);
router.get("/recipe/:id", verifyToken, getRecipeById);

module.exports = router;
