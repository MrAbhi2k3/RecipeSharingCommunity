import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LikedProducts = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await fetch("http://localhost:2000/auth/likedRecipes");

      if (!response.ok) {
        toast.error("Failed to fetch favorite products");
        return;
      }

      const data = await response.json();
      setFavoriteProducts(data);
    } catch (error) {
      toast.error(`Error fetching favorite products: ${error.message}`);
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to remove this recipe from favorites?")) {
        const response = await fetch(`http://localhost:2000/auth/removeLiked/${recipeId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Item removed successfully");
          fetchFavoriteProducts();
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error(`Error removing item: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Favorites</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map((product) => (
          <li key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h4 className="text-lg font-semibold mb-2">Ingredients:</h4>
              {product.ingredients.length > 0 ? (
                <ul className="list-disc list-inside mb-4">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 mb-4">No ingredients listed.</p>
              )}
              <h4 className="text-lg font-semibold mb-2">Instructions:</h4>
              <div className="space-y-2 text-gray-700 mb-4">
                {product.instructions.split("\n").map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                onClick={() => handleRemoveItem(product._id)}
              >
                Remove Item
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
