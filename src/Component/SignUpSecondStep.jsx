import React from "react";
import { investmentIdea } from "../public/ExporImage";
import { FaCheck } from "react-icons/fa6";

function SignUpSecondStep({ formData, setFormData, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center items-center p-3">
      {/* signup text */}
      <div className="p-3">
        <p className="text-2xl font-bold text-center p-3">SIGNUP</p>
        <p className="text-lg font-bold text-center">Create New Account</p>
        <p className="text-sm font-medium text-center text-[#9CA3AF] ">
          Join our startup community
        </p>
      </div>
      {/* signup steps */}
      <div className="flex justify-center items-center gap-4">
        <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
          <p className="py-4 px-4 rounded-full bg-[#1E40AF] text-lg font-bold text-white">
            <FaCheck />
          </p>
        </div>
        <div>
          <p>
            <sup className="text-3xl font-extrabold text-[#1E40AF]">______</sup>
          </p>
        </div>
        <div className="py-1 px-1 rounded-full bg-[#1E40AF]">
          <p className="py-2 px-4 rounded-full bg-[#1E40AF] text-lg font-bold text-white    ">
            2
          </p>
        </div>
      </div>
      <div className="p-5  rounded-lg flex justify-center items-center gap-15 ">
        <img src={investmentIdea} alt="" className="h-100" />
        <div className="flex flex-col items-center justify-center w-100">
          {/* form start */}
          <div className="text-black flex flex-col p-1 gap-2 w-full">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col p-1 gap-1">
                <label className="text-md font-medium">Age:</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 25"
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col p-1 gap-1">
                <label className="text-md font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="flex flex-col p-1 gap-1">
                <label className="text-md font-medium">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
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
              <div className="flex flex-col p-1 gap-1">
                <label className="text-md font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none"
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <div className="w-full flex gap-2 mt-4">
                  <button
                    onClick={onBack}
                    className="text-sm font-medium py-2 w-full rounded-lg bg-gray-300 text-black"
                  >
                    Back
                  </button>
                  <button
                    onClick={onSubmit}
                    className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpSecondStep;
