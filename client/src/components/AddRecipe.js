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
      const response = await fetch(`${BACKEND_URL}/auth/recipe`,
        {
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
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/path-to-your-image.jpg')]">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded shadow-md bg-opacity-90">
        <h2 className="text-2xl font-bold text-center text-gray-700">Add Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <MdTitle className="text-xl mr-2 text-indigo-500" />
            <label className="block text-sm font-medium text-gray-600">Title:</label>
            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 ml-2 text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <div className="flex items-center">
              <FaRegListAlt className="text-xl mr-2 text-indigo-500" />
              <label className="block text-sm font-medium text-gray-600">Ingredients:</label>
            </div>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 mr-2 text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center"
                >
                  <FaPlusCircle className="mr-1" /> Add Ingredient
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <AiOutlineFileText className="text-xl mr-2 text-indigo-500" />
            <label className="block text-sm font-medium text-gray-600">Instructions:</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 ml-2 text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <MdOutlineImage className="text-xl mr-2 text-indigo-500" />
            <label className="block text-sm font-medium text-gray-600">Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 ml-2 text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add Recipe
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddRecipe;
