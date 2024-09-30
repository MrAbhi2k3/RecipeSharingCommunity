import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegListAlt, FaPlusCircle } from "react-icons/fa";
import { MdTitle, MdOutlineImage } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { BACKEND_URL } from "../config/config";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    const lastIngredient = recipe.ingredients[recipe.ingredients.length - 1];
    if (lastIngredient !== "") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonEmptyIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.trim() !== ""
    );

    if (nonEmptyIngredients.length === 0) {
      toast.warn("Please provide at least one non-empty ingredient.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        toast.success("Recipe added successfully");
        setTimeout(() => {
          window.location.href = "/recipes";
        }, 4000);
      } else {
        toast.error("Failed to add recipe:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while adding the recipe:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-b from-indigo-300 via-white to-indigo-100 p-4">
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl p-6 space-y-6 bg-white rounded-lg shadow-xl border border-indigo-200">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-indigo-600">Add Your Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <MdTitle className="text-2xl md:text-3xl lg:text-4xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600 ml-2">Title:</label>
            </div>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter recipe title"
            />
          </div>

          {/* Ingredients Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaRegListAlt className="text-2xl md:text-3xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600">Ingredients:</label>
            </div>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Ingredient ${index + 1}`}
                />
                {index === recipe.ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center space-x-1"
                  >
                    <FaPlusCircle className="text-white" />
                    <span>Add Ingredient</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <AiOutlineFileText className="text-2xl md:text-3xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600 ml-2">Instructions:</label>
            </div>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              placeholder="Enter recipe instructions"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <MdOutlineImage className="text-2xl md:text-3xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600 ml-2">Image URL:</label>
            </div>
            <input
              type="text"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter image URL (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
            >
              Add Recipe
            </button>
          </div>
        </form>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddRecipe;
