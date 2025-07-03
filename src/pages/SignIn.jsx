import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";
import { signIn } from "../services/auth.services";
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
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center p-3">
      {/* signup text */}
      <div className="p-5 shadow-2xl rounded-lg flex justify-center items-center gap-15 ">
        <img src={investmentIdea} alt="" className="h-100" />
        <div>
          {/* form start */}
          <div className="text-black">
            <div className="p-3">
              <p className="text-2xl font-bold text-center p-3">SIGNIN</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-100"
            >
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                />
                <span className=" text-xs text-[#9CA3AF] ">
                  Pleas Enter Valid Email
                </span>
              </div>
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                />
                <span className=" text-xs text-[#9CA3AF] ">
                  Password should be grater than 8 letters
                </span>
              </div>
              <div className="w-full flex items-center justify-center mt-3">
                <button
                  type="submit"
                  className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white cursor-pointer"
                >
                  SIGN IN
                </button>
              </div>
              <div>
                <p className="text-sm text-center text-gray-600 mt-4">
                  Already have an account?
                  <Link
                    to="/signup"
                    className="text-[#1E40AF] hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              {error && <p className="text-red-700 text-xs mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
