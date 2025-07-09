import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import  investmentIdea  from "../public/images/Market-launch-pana.png";
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
<div className="flex flex-col min-h-screen justify-center items-center px-4 py-6 bg-gray-50"> 

  {/* Image & Form Section */}
  <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 p-6 rounded-lg ">
    
    {/* Left - Image (visible only on large screens) */}
   <div className="hidden lg:flex w-full lg:w-3/3 aspect-[51/0] mx-auto">
     <img
       src={investmentIdea}
       alt="Investment Illustration"
       className="w-full h-auto object-contain"
     />
   </div>
 

    {/* Right - Form */}
    <div className="w-full lg:w-1/2 max-w-md">
       <div className="mb-8 text-center">
    <p className="text-2xl font-bold">SIGN UP</p>
    <p className="text-lg font-bold mt-1">Create New Account</p>
    <p className="text-sm font-medium text-gray-500 mt-1">
      Join our startup community
    </p>
  </div>
      {/* Role Selection */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Select Your Role:</p>
        <div className="grid grid-cols-3 gap-3">
          {roles.map(({ label, value }) => (
            <div
              key={value}
              className={`flex flex-col justify-center items-center gap-2 border border-gray-300 rounded-lg py-3 px-2 cursor-pointer transition-all duration-200
                ${formData.role === value ? "bg-[#1e40afeb] text-white" : "hover:bg-blue-50 hover:border-blue-300"}`}
              onClick={() => handleRoleSelect(value)}
            >
              {label === "Investor" && <SiCashapp size={20} />}
              {label === "Founder" && <FaRegLightbulb size={20} />}
              {label === "Critic" && <FaStar size={20} />}
              <p className="text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Your full name"
            className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. user@example.com"
            className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="mt-4 py-2 w-full rounded-lg bg-[#1E40AF] text-white text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          Next
        </button>
      </form>

      {/* Sign-in Link */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
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

  );
}

export default SignUpFirstStep;
