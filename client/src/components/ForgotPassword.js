import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotlogo from "../assets/forgot.png";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:2000/auth/forgotpassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        toast.success("Password updated successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        setMessage("An error occurred while updating the password.");
        toast.error("Error updating password");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating the password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Container */}
        <div className="w-full md:w-1/2 flex justify-center md:block p-6">
          <img
            src={forgotlogo}
            alt="Forgot Password"
            className="w-32 h-32 md:w-full md:h-full object-cover rounded-full md:rounded-none mb-4 md:mb-0"
          />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                New Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-300"
            >
              Update Password
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("Error") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
