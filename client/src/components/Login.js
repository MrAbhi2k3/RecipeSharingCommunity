import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../assets/login.png";
import { BACKEND_URL } from "../config/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    try {
      let response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: Email, password }),
      });

      response = await response.json();

      if (!response.error) {
        toast.success("Login Successful");
        localStorage.setItem("token", response.token);

        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">

        {/* Left Section for Image */}
        <div className="w-32 md:w-1/2 flex justify-center md:block p-6">
          <img src={loginImage} alt="Logo" className="w-40 h-32 md:w-full md:h-full object-cover rounded-full md:rounded-none mb-4 md:mb-0" />
        </div>

        {/* Right Section for Form */}
        <div className="w-2/3 p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="block w-full px-4 py-3 text-gray-700 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full px-4 py-3 text-gray-700 border-none rounded-l-lg focus:ring-0 focus:outline-none"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 text-sm text-gray-500 rounded-r-lg hover:text-blue-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-gray-900 hover:shadow-lg transition duration-300 font-medium">
                Login
              </button>
            </div>

            <div className="text-center">
              <Link to="/forgotPassword" className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-200">
                Forgot Password?
              </Link>
              <div className="mt-2">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link to="/signup" className="text-indigo-600 hover:text-gray-800 transition duration-200 font-bold">
                  Register
                </Link>
              </div>
            </div>

            {showError && (
              <div className="px-4 py-2 text-red-700 bg-red-100 rounded-lg" role="alert">
                Please fill in all the fields
              </div>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
