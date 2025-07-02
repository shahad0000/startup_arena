import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";
import { FaCheck } from "react-icons/fa6";

function SignUpSecondStep() {
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
                <label className="text-sm font-medium">Age</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                />
              </div>
              <div className="flex flex-col p-1 gap-1">
                <label className="text-sm font-medium ">Gender</label>
                <select className="border border-gray-400 rounded-sm pl-2 h-7 outline-none">
                  <option>-----</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="flex flex-col p-1 gap-1">
                <label className="text-sm font-medium ">Country</label>
                <select className="border border-gray-400 rounded-sm pl-2 h-7 outline-none">
                  <option>-----</option>
                  <option>Saudi Arabia</option>
                  <option>Kuwait</option>
                  <option>The United Arab Emirates</option>
                  <option>Qatar</option>
                  <option>Bahrain</option>
                  <option>Oman</option>
                </select>
              </div>
              <div className="w-full flex items-center justify-center">
                <button className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpSecondStep;
