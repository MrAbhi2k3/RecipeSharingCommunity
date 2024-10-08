import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_URL } from "../config/config";
import { FaRegListAlt } from "react-icons/fa";
import { MdTitle, MdOutlineImage } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/recipe/${id}`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipeData(data);
        } else {
          toast.error("Failed to fetch recipe data");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error("An error occurred while fetching the recipe");
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/auth/recipe/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        toast.success("Recipe updated successfully");
        setTimeout(() => {
          navigate("/recipes");
        }, 3000);
      } else {
        toast.error("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("An error occurred while updating the recipe");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-b from-indigo-300 via-white to-indigo-100 p-4">
      <div className="w-full max-w-lg md:max-w-3xl lg:max-w-4xl p-6 space-y-6 bg-white rounded-lg shadow-xl border border-indigo-200">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-indigo-600">Update Recipe</h2>
        <form onSubmit={handleUpdateRecipe} className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <MdTitle className="text-2xl md:text-3xl lg:text-4xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600 ml-2">Title:</label>
            </div>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
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
            <input
              type="text"
              name="ingredients"
              value={recipeData.ingredients.join(", ")}
              onChange={(e) => handleChange({ target: { name: "ingredients", value: e.target.value.split(",") } })}
              className="w-full px-3 py-2 text-gray-700 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter ingredients (comma-separated)"
            />
          </div>

          {/* Instructions */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <AiOutlineFileText className="text-2xl md:text-3xl text-indigo-600" />
              <label className="block text-md md:text-lg font-semibold text-gray-600 ml-2">Instructions:</label>
            </div>
            <textarea
              name="instructions"
              value={recipeData.instructions}
              onChange={handleChange}
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
              value={recipeData.imageUrl}
              onChange={handleChange}
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
              Update Recipe
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateRecipe;
