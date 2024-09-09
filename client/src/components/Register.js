import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: Email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        if (user.error) {
          toast.warn("User already exists. Try with a different email");
        } else {
          toast.success("Registration successful.");
          localStorage.setItem("token", user.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        }
      } else {
        console.error("Failed to register user:", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while registering user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-400">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Image Container */}
        <div className="w-full md:w-1/2 flex justify-center md:block p-6">
          <img
            src={registerImage}
            alt="Register"
            className="w-32 h-32 md:w-full md:h-full object-cover rounded-full md:rounded-none mb-4 md:mb-0"
          />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
              Create Account
            </h2>
            <div className="mb-5 flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full px-2 py-1 focus:outline-none"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-5 flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full px-2 py-1 focus:outline-none"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full px-2 py-1 focus:outline-none"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <div className="mx-4 text-sm text-gray-600">
                By signing up, you agree to our Terms, Data Policy and Cookies Policy.
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-indigo-500 text-white rounded-md hover:bg-gray-900 transition duration-300 text-lg font-medium"
            >
              Sign Up
            </button>
            <div className="mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 hover:underline hover:text-gray-900 font-bold"
              >
                Login
              </Link>
            </div>
          </form>
          {showError && (
            <div className="mt-4 text-red-500 text-center font-medium">
              Please fill all the fields
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
