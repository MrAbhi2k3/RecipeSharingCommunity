import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch("http://localhost:2000/auth/recipe", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to delete this recipe?")) {
        const response = await fetch(
          `http://localhost:2000/auth/recipe/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Recipe deleted successfully");

          setTimeout(() => {
            window.location = "/recipes";
          }, 4000);
        } else {
          getRecipes();
          window.location = "/recipes";
        }
      }
    } catch (error) {
      toast.error("An error occurred while deleting the recipe:", error);

      setTimeout(() => {
        window.location.href = "/recipes";
      }, 3000);
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await fetch(
        `http://localhost:2000/auth/likedRecipes/${recipeId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Recipe added to favorites successfully");

        setTimeout(() => {
          window.location.href = "/favouriteRecipes";
        }, 4000);
      } else {
        const data = await response.json();
        if (data.error === "Recipe already exists in your favorites") {
          toast.warn("Recipe already exists in your favorites");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.error("An error occurred while adding to favorites:", error);
    }
  };

  const SearchRecipes = async (e) => {
    try {
      if (e.target.value) {
        let Searchedrecipes = await fetch(
          `http://localhost:2000/auth/searchRecipes/${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Searchedrecipes = await Searchedrecipes.json();

        if (!Searchedrecipes.message) {
          setRecipes(Searchedrecipes);
        } else {
          setRecipes([]);
        }
      } else {
        getRecipes();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="w-full max-w-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search recipes"
          onChange={(e) => SearchRecipes(e)}
        />
      </div>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-45 h-45 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.length > 0 &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient}
                  </li>
                ))}
            </ul>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
              {recipe.instructions.match(/^\d+\./) ? (
                <div className="text-gray-700">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              ) : (
                <ol className="list-decimal list-inside text-gray-700">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleDeleteRecipe(recipe._id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                onClick={() => handleAddToFavorites(recipe._id)}
              >
                Add to Favorites
              </button>
              <Link
                to={"/addRecipe"}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Add more recipes
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-center text-xl text-gray-700">No Recipes Found</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default Recipes;
