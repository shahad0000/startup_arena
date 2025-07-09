import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchAllIdeas } from "../services/ideas.service";
import { getCurrentUser } from "../services/auth.service";
import { FindingIdeas } from "../public/ExporImage";
import { ArrowUp, ChevronDown, TrendingUp, Search, Clock } from "lucide-react";
import { Lightbulb } from "lucide-react";

export default function AllIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "oldest"
  const [voteSort, setVoteSort] = useState("popular"); // "popular" | "least"

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ideasData, userData] = await Promise.all([
          fetchAllIdeas(),
          getCurrentUser(),
        ]);
        setIdeas(ideasData);
        setCurrentUser(userData);
      } catch (err) {
        console.error("Error loading ideas or user:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  return (
    <div className="min-h-screen max-w-screen text-[#333333]">
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Explore Startup Ideas
                  </h1>
                  <p className="text-gray-600 text-xs hidden sm:block">
                    Discover innovative ideas from founders worldwide
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search ideas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-30 lg:w-64 pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm"
                  />
                </div>
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto md:px-3 lg:px-6 ">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{error}</p>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No ideas found matching your search.
              </p>
            </div>
          ) : (
            <div className="p-1 lg:px-6 lg:py-8 sm:px-8 md:px-10 border-l-4 border-r-4 border-double border-gray-200 bg-gradient-to-b from-slate-50 to-white">
              <IdeaCard ideas={filteredIdeas} userRole={currentUser?.role} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
