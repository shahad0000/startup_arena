import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";
import { signIn } from "../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { SlArrowLeft } from "react-icons/sl";
import { IoArrowBackCircleSharp } from "react-icons/io5";
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
<<<<<<< HEAD
      <div className="flex flex-col min-h-screen justify-center items-center p-3 bg-white">
        <div>
          <div>
            <div className="p-3">
              <p className="text-2xl font-bold text-center p-3">SIGNUP</p>
              <p className="text-lg text-[#9CA3AF] font-medium text-center">
                Welcome Back
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-4xl  rounded-lg bg-white flex flex-col md:flex-row justify-center items-center gap-6 p-5">
          {/* Left Section - Image & Back Link */}
          <div className="flex flex-col items-center text-center md:text-left md:items-start">
            <img
              src={investmentIdea}
              alt="Investment Idea"
              className="hidden md:block h-40 sm:h-60 md:h-80 object-contain w-100"
=======
      <div className="flex flex-col min-h-screen justify-center items-center p-3 bg-gray-100">
        <div className="w-full max-w-4xl shadow-2xl rounded-lg bg-white flex flex-col md:flex-row justify-center items-center gap-6 p-5">
          {/* Left Section - Image & Back Link */}
          <div className="flex flex-col items-center text-center md:text-left md:items-start">
            <div className="mb-4">
              <Link
                to="/"
                className="inline-flex items-center justify-start text-blue-500 hover:underline"
              >
                <SlArrowLeft className="mr-1" /> Back
              </Link>
            </div>
            <img
              src={investmentIdea}
              alt="Investment Idea"
              className="hidden md:block h-40 sm:h-60 md:h-80 object-contain"
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
            />
          </div>

          {/* Right Section - Sign In Form */}
<<<<<<< HEAD
          <div className=" max-w-md mt-6 md:mt-0 w-100">
            <div className="text-black">
=======
          <div className="w-full max-w-md mt-6 md:mt-0">
            <div className="text-black">
              <div className="p-3">
                <p className="text-2xl font-bold text-center">SIGN IN</p>
              </div>
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <div className="flex flex-col p-1 gap-1 w-full">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
<<<<<<< HEAD
                    placeholder="Please Enter Valid Email"
=======
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  />
<<<<<<< HEAD
=======
                  <span className="text-xs text-[#9CA3AF]">
                    Please Enter Valid Email
                  </span>
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
                </div>
                <div className="flex flex-col p-1 gap-1 w-full">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
<<<<<<< HEAD
                    placeholder="Password should be greater than 8 letters"
=======
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  />
<<<<<<< HEAD
=======
                  <span className="text-xs text-[#9CA3AF]">
                    Password should be greater than 8 letters
                  </span>
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
                </div>
                <div className="w-full flex items-center justify-center mt-3">
                  <button
                    type="submit"
                    className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white cursor-pointer hover:bg-blue-800 transition"
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
<<<<<<< HEAD
                    If you do not have an account yet!
=======
                    Already have an account?
>>>>>>> de5562fec9517b50b54e1fad4cdc8ee44445881d
                    <Link
                      to="/signup"
                      className="text-[#1E40AF] hover:underline font-medium ml-1"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
                {error && (
                  <p className="text-red-700 text-xs mt-2 text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
