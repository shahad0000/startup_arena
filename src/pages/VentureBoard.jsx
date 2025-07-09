import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchVentureBoard } from "../services/venture-board.service";
import { getCurrentUser } from "../services/auth.service";
import { ArrowUp, ChevronDown, TrendingUp, Search, Clock } from "lucide-react";

function VentureBoard() {
  const [ideas, setIdeas] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "oldest"
  const [voteSort, setVoteSort] = useState("popular"); // "popular" | "least"

  const filteredIdeas = ideas
    .filter((idea) =>
      idea.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    })
    .sort((a, b) => {
      if (voteSort === "popular") {
        return b.totalUpvotes - a.totalUpvotes;
      } else if (voteSort === "least") {
        return a.totalUpvotes - b.totalUpvotes;
      }
      return 0;
    });

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const [ventureData, userData] = await Promise.all([
          fetchVentureBoard(),
          getCurrentUser(),
        ]);
        setIdeas(ventureData.data);
        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadIdeas();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 text-[#333] font-sans relative overflow-hidden">
      {/* Background Icon */}
      <img
        src="https://static.thenounproject.com/png/profit-icon-4491647-512.png"
        alt="Background Icon"
        className="absolute opacity-10 w-[280px] md:w-[360px] lg:w-[440px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-3 py-9 lg:px-6 lg:py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            The Venture Board
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Explore high-impact startup ideas with{" "}
            <span className="font-semibold text-blue-700">
              100+ community votes
            </span>
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md rounded-xl px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Search */}
          <div className="flex lg:w-[70%]">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm mx-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="relative w-full">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search startup ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm transition-all"
              />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="hidden lg:flex gap-2">
            <div className="relative">
              <ChevronDown className="absolute textg right-3 top-1/2 transform -translate-y-1/2  w-4 h-4 pointer-events-none z-10" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-10 py-2.5 bg-white text-gray-400 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] appearance-none backdrop-blur-sm text-xs cursor-pointer transition-all"
              >
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  w-4 h-4 pointer-events-none z-10" />
              <select
                value={voteSort}
                onChange={(e) => setVoteSort(e.target.value)}
                className="pl-8 pr-10 py-2.5 bg-white text-gray-400 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] appearance-none backdrop-blur-sm text-xs cursor-pointer transition-all"
              >
                <option value="popular">Most Voted</option>
                <option value="least">Least Voted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:px-6 lg:py-8 sm:px-3 md:px-7 border-l-4 border-r-4 border-double border-gray-200 bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-inner animate-fadeIn">
          <IdeaCard ideas={filteredIdeas} userRole={currentUser?.role} />
        </div>
      </div>
    </div>
  );
}

export default VentureBoard;
