import React from "react";
import investmentIdea from "../public/images/Market-launch-pana.png";
import { FaCheck } from "react-icons/fa6";

function SignUpSecondStep({ formData, setFormData, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
   <div className="flex flex-col min-h-screen justify-center items-center px-4 py-6 bg-gray-50"> 

      {/* Image & Form Section */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center gap-12 p-6 rounded-lg ">
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
    <p className="text-2xl font-bold mb-1">SIGNUP</p>
    <p className="text-lg font-bold">Create New Account</p>
    <p className="text-sm font-medium text-gray-500 mt-1">
      Join our startup community
    </p>
  </div>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="e.g. 25"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

            {/* Gender Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select country</option>
                <option>Saudi Arabia</option>
                <option>Kuwait</option>
                <option>The United Arab Emirates</option>
                <option>Qatar</option>
                <option>Bahrain</option>
                <option>Oman</option>
              </select>
            </div>

            {/* City Field */}
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="border border-gray-400 rounded-sm pl-3 pr-3 h-10 w-full outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={onBack}
                className="py-2 w-full rounded-lg bg-gray-300 text-black text-sm font-medium hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="py-2 w-full rounded-lg bg-[#1E40AF] text-white text-sm font-medium hover:bg-blue-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpSecondStep;
