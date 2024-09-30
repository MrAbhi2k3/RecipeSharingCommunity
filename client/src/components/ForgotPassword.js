import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiLock } from "react-icons/fi";
import forgotlogo from "../assets/forgot.png";
import { BACKEND_URL } from "../config/config";

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
      const response = await fetch(`${BACKEND_URL}/auth/forgotpassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-100">
          <img
            src={forgotlogo}
            alt="Forgot Password"
            className="w-40 h-40 md:w-64 md:h-64 object-contain"
          />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Update Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm">
                <FiMail className="text-gray-500 mr-3" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full p-2 bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                New Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm">
                <FiLock className="text-gray-500 mr-3" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                  className="w-full p-2 bg-transparent outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
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
