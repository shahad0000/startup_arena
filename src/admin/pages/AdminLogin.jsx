// src/pages/AdminLogin.jsx
import { useState } from "react";
import { Link } from "react-router";
import AdminNav from "../components/AdminNav";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          {/* Header Tabs */}
          <div className="flex justify-between mb-6">
            <button className="px-4 py-1 rounded-md bg-blue-600 text-white text-sm font-semibold">
              Admin Login
            </button>
            <Link
              to="/signup"
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Welcome Text */}
          <h2 className="text-xl font-bold mb-1">Welcome Back, Admin</h2>
          <p className="text-gray-500 text-sm mb-6">
            Sign in to your admin panel
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
