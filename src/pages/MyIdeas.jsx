import React, { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import tagColors from "../Component/CatagoryColors";
import { Link } from "react-router";
import { fetchMyIdeas, deleteIdea } from "../services/ideas.service";
import Swal from "sweetalert2";
import { Lightbulb } from "lucide-react";

export default function MyIdeas() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This idea will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteIdea(id);
        setIdeas(ideas.filter((idea) => idea._id !== id));
        Swal.fire("Deleted!", "Idea has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error", "Failed to delete idea.", "error");
      }
    }
  };

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const data = await fetchMyIdeas();
        setIdeas(data);
      } catch (err) {
        console.error("Failed to load ideas", err);
        setError("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  return (
    <div className="min-h-screen w-full text-[#333] font-sans ">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Your Submitted Ideas
                </h1>
                <p className="text-gray-600 text-xs hidden sm:block">
                  View and edit your personal details
                </p>
              </div>
            </div>

            <div className="flex">
              <Link
                to={"/submitIdea"}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-3 py-1 lg:px-5 lg:py-2 rounded-lg text-xs lg:text-sm transition-all shadow"
              >
                Add +
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Loading / Error / Ideas */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] gap-2">
            <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">{error}</p>
        ) : ideas.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            You haven't submitted any ideas yet.
          </p>
        ) : (
          <div className="p-1 lg:px-6 lg:py-8 sm:px-8 md:px-10 border-l-4 border-r-4 border-double border-gray-200 bg-gradient-to-b from-slate-50 to-white">
            
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white m-4 drop-shadow-lg rounded-lg p-6 lg:p-9 transition-transform duration-300 hover:scale-[1.01] flex justify-between items-start"
              >
                {/* Left: Idea Content */}
                <div className="flex-1 pr-4">
                  {/* Title & Upvotes */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {idea.title}
                    </h3>
                    <span className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-700 text-sm font-semibold">
                      <GoArrowUp className="text-amber-600 w-4 h-4" />
                      {idea.totalUpvotes}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {idea.description}
                  </p>

                  {/* Category Tag */}
                  {idea.category && (
                    <span
                      className={`${
                        tagColors[idea.category.toLowerCase()] ||
                        tagColors.other
                      } px-3 py-1 text-xs font-medium rounded-full`}
                    >
                      {idea.category}
                    </span>
                  )}
                </div>

                {/* Right: Action Menu */}
                <div className="relative ml-4">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setActiveMenu(activeMenu === idea._id ? null : idea._id)
                    }
                  >
                    <BiDotsVerticalRounded size={20} />
                  </button>

                  {activeMenu === idea._id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md z-20">
                      <Link
                        to={`/detailIdea/${idea._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/IdeaAnalysis/${idea._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Analysis
                      </Link>
                      <button
                        onClick={() => handleDelete(idea._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
