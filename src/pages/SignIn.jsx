import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { investmentIdea } from "../public/ExporImage";

function SignUp() {
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
              <div className="w-full flex items-center justify-center">
                <button className="text-sm font-medium py-2 w-full rounded-lg bg-[#1E40AF] text-white">
                  SIGNIN
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
