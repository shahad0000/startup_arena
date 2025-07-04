import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";
import tagColors from "../Component/CatagoryColors";
import { Link } from "react-router";

export const IdeaCard = ({ ideas = [], userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const openModal = (idea) => {
    setSelectedIdea(idea);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedIdea(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
        {ideas.map((idea) => (
          <Link
            key={idea._id}
            className="bg-white border border-[#E0E0E0] rounded-lg p-4 relative transform transition-transform duration-300 ease-in-out hover:translate-1 hover:scale-100"
          >
            <div className="absolute right-4 top-4 text-amber-300 px-2 py-1 rounded flex items-center gap-1">
              <GoArrowUp /> {idea.totalUpvotes}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`${
                  tagColors[idea.category.toLowerCase()] ||
                  "bg-gray-200 text-gray-700"
                } px-2 py-1 text-xs rounded-full`}
              >
                {idea.category}
              </span>
            </div>

            <h2 className="text-[18px] font-semibold mb-2">{idea.title}</h2>

            <p className="text-[14px] text-[#666666] line-clamp-3">
              {idea.description}
            </p>

            <div className="text-[14px] flex gap-2 font-semibold text-[#666666] my-3">
              <p className=" text-black">Target market:</p>
              <p className="text-blue-800 ">{idea.targetMarket}</p>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <div className="text-[13px] text-[#888888]">
                by {idea.founderId?.name}
                <br />
                <span className="italic text-xs font-light">
                  {new Date(idea.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {userRole === "investor" && (
                <div>
                  <button
                    onClick={() => openModal(idea)}
                    className="mt-4 bg-[#1E40AF] text-white px-4 py-2 rounded hover:bg-[#1e40afc6] w-full"
                  >
                    Request Meeting
                  </button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button className="border border-gray-300 px-6 py-3 rounded-[10px] text-[16px] font-medium focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
          Load More Ideas
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white w-full max-w-md mx-auto rounded-xl p-6 shadow-xl">
            <div className=" w-full flex flex-col justify-start items-start py-4 ">
              <p className=" font-bold  text-center">Request Meeting :-</p>
              <p className="text-xl font-bold  text-center">
                {selectedIdea?.title}
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Topic</label>
                <input
                  type="text"
                  placeholder="Enter topic"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E40AF] text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
