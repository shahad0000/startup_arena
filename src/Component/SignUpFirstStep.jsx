import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";
import { Link } from "react-router";

function SignUpFirstStep({ formData = {}, setFormData, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const roles = [
    { label: "Investor", value: "investor" },
    { label: "Founder", value: "founder" },
    { label: "Critic", value: "critic" },
  ];
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center p-3">
      {/* signup text */}
      <div className="p-3">
        <p className="text-2xl font-bold text-center p-3">SIGN UP</p>
        <p className="text-lg font-bold text-center">Create New Account</p>
        <p className="text-sm font-medium text-center text-[#9CA3AF] ">
          Join our startup community
        </p>
      </div>
      {/* signup steps */}
      <div className="flex justify-center items-center gap-4">
        <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
          <p className="py-2 px-4 rounded-full bg-[#1E40AF] text-lg font-bold text-white">
            1
          </p>
        </div>
        <div>
          <p>
            <sup className="text-3xl font-extrabold text-[#1E40AF]">______</sup>
          </p>
        </div>
        <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
          <p className="py-2 px-4 rounded-full bg-white text-lg font-bold text-black">
            2
          </p>
        </div>
      </div>
      <div className="p-5  rounded-lg flex justify-center items-center gap-15 ">
        <img src={investmentIdea} alt="" className="h-100" />
        <div>
          {/* form start */}
          <div className="text-black flex flex-col items-center justify-center w-100">
            <div className="flex items-center justify-between p-3 gap-4 w-full">
              <p className="text-sm font-medium text-start">
                Select Your Role:
              </p>
            </div>

            <div className="flex items-center justify-between p-3 gap-4 w-full">
              {roles.map(({ label, value }) => (
                <div
                  key={value}
                  className={`flex flex-col justify-center items-center gap-1 border border-gray-300 rounded-lg w-20 py-2 px-2 cursor-pointer hover:bg-[#1e40afd0] hover:text-white 
                    ${formData.role === value ? "bg-[#1e40afeb] text-white" : ""}`}
                  onClick={() => handleRoleSelect(value)}
                >
                  {label === "Investor" && <SiCashapp />}
                  {label === "Founder" && <FaRegLightbulb />}
                  {label === "Critic" && <FaStar />}
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center w-100">
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                  placeholder="e.g. user@example.com"
                  required
                />
                {/* <span className=" text-xs text-[#9CA3AF] ">
                  Please enter a valid email
                </span> */}
              </div>
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  placeholder="Create a strong password"
                  required
                />
                {/* <span className=" text-xs text-[#9CA3AF] ">
                  Password should be greater than 8 characters
                </span> */}
              </div>
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  placeholder="Re-enter your password"
                  required
                />
                {/* <span className=" text-xs text-[#9CA3AF] ">
                  Confirm password should be equal password
                </span> */}
              </div>
              <div className="w-full flex items-center justify-center mt-3">
                <button
                  onClick={onNext}
                  className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white"
                >
                  Next
                </button>
              </div>
              <div>
                <p className="text-sm text-center text-gray-600 mt-4">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="text-[#1E40AF] hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpFirstStep;
