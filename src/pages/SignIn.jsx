import React from "react";
import  investmentIdea  from "../public/images/Market-launch-pana.png";
import { signIn } from "../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      console.log("Signed in", data);
      navigate("/allIdeas");
    } catch (err) {
      console.error(err);
      setError("Email or password is incorrect.");
    }
  };

  return (
    <>
<div className="flex flex-col min-h-screen justify-center items-center p-4 bg-gray-50">
  <div className="text-center ">
    <p className="text-2xl font-bold">SIGN IN</p>
    <p className="font-medium text-gray-600">Welcome Back!</p>
  </div>

  {/* Container for Image + Form */}
<div className="w-full max-w-7xl rounded-lg  flex flex-col lg:flex-row items-center  ">
  {/* Left: Image Section */}
  <div className="hidden lg:flex w-full lg:w-2/3 aspect-[5-1/50] mx-auto">
    <img
      src={investmentIdea}
      alt="Investment Illustration"
      className="w-full h-auto object-contain"
    />
  </div>

  {/* Right: Sign In Form */}
  <div className="w-full lg:w-1/3 max-w-md">
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      {/* Email Field */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-md font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. user@example.com"
          className="border border-gray-400 rounded-sm pl-3 pr-3 h-9 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <span className="text-xs text-gray-400">
          Please enter your email address
        </span>
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-md font-medium">Password</label>
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border border-gray-400 rounded-sm pl-3 pr-3 h-9 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <span className="text-xs text-gray-400">
          Password should be greater than 8 letters
        </span>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-2">
        <button
          type="submit"
          className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white hover:bg-blue-800 transition-colors"
        >
          SIGN IN
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link
            to="/signup"
            className="text-[#1E40AF] hover:underline font-medium ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>
</div>
    </>
  );
}

export default SignIn;
