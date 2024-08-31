import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      let response = await fetch("http://localhost:2000/auth/login", {
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
    <div className="flex items-center justify-center min-h-screen bg-green-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              type="email"
              className="block w-full px-3 py-2 text-gray-700 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="flex items-center border rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full px-3 py-2 text-gray-700 border-none rounded-l-md focus:ring-0 focus:outline-none"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="px-3 py-2 text-sm text-gray-500 rounded-r-md hover:text-indigo-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>

          <div className="text-center">
            <Link to="/forgotPassword" className="text-sm text-indigo-600 hover:text-indigo-700">
              Forgot Password?
            </Link>
          </div>

          {showError && (
            <div className="px-4 py-2 text-red-700 bg-red-100 rounded-md" role="alert">
              Please fill in all the fields
            </div>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
