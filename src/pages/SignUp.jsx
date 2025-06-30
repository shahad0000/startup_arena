import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";

function SignUp() {
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
              <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 rounded-lg w-20 hover:bg-blue-500 hover:text-white py-2 px-2">
                <SiCashapp />
                <p className="text-sm font-medium">Investor</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 rounded-lg w-20 hover:bg-blue-500 hover:text-white py-2 px-2">
                <FaRegLightbulb />
                <p className="text-sm font-medium">Founder</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1 border border-gray-300 rounded-lg w-20 hover:bg-blue-500 hover:text-white py-2 px-2">
                <FaStar />
                <p className="text-sm font-medium">critic</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-100">
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="text"
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
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                />
                <span className=" text-xs text-[#9CA3AF] ">
                  Password should be grater than 8 letters
                </span>
              </div>
              <div className="flex flex-col p-1 gap-1 w-full">
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  className="border border-gray-400 rounded-sm pl-2 h-7 outline-none "
                />
                <span className=" text-xs text-[#9CA3AF] ">
                  Confirm password should br equal password
                </span>
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

export default SignUp;
