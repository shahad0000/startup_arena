import React from "react";
import { SubmitIdea } from "../public/ExporImage";
import Nav from "../user/components/Nav";
import Footer from "../user/components/Footer";

export default function SubmitIdeaForm() {
  return (
    <div>
      {/* <div>
        <Footer />
      </div> */}
      <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        <div className="flex flex-col justify-center items-center p-3 rounded-lg w-250 ">
          <div className="flex flex-col h-25 justify-center items-center">
            <p className="text-2xl font-bold">Draw Your Startup Idea</p>
            <p className="text-sm font-medium text-gray-600">
              Share your innovative idea with our community and get valuable
              feedback from potential investors.
            </p>
          </div>
          <div className="flex items-center justify-center  w-full gap-5">
            <div>
              <img src={SubmitIdea} alt="" className=" w-200" />
            </div>
            {/* idea title */}
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Idea Title</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-sm h-8 pl-1"
                />
                <span className="text-xs text-gray-600">
                  Enter your idea title
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Description</label>
                <textarea
                  className="border border-gray-400 rounded-sm h-20 p-1"
                  maxLength="1000"
                ></textarea>
                <span className="text-xs text-gray-600">
                  Minimum 1000F characters
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">MVP/Demo Link</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-sm h-8 pl-1"
                  placeholder="https://your-demo-link.com"
                />
                <span className="text-xs text-gray-600">
                  Optional: Share a link to your prototype or demo
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Industry</label>
                <select className="border border-gray-400 rounded-sm h-8 pl-1">
                  <option value="">------</option>
                  <option value="">Technology</option>
                  <option value="">Education</option>
                  <option value="">Health</option>
                  <option value="">Finance</option>
                  <option value="">Fitness</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Country*</label>
                <select className="border border-gray-400 rounded-sm h-8 pl-1">
                  <option>-----</option>
                  <option>Saudi Arabia</option>
                  <option>Kuwait</option>
                  <option>The United Arab Emirates</option>
                  <option>Qatar</option>
                  <option>Bahrain</option>
                  <option>Oman</option>
                </select>
              </div>
              <div className="py-3">
                <button className="font-medium py-2 w-full rounded-sm text-white bg-[#1E40AF]">
                  Submit Idea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
