import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchAllIdeas } from "../services/ideas.service";
import { getCurrentUser } from "../services/auth.service";
import { FindingIdeas } from "../public/ExporImage";

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
    <div className="bg-white font-ibm  text-[#333333]">
      {/* hero section */}
      <div className="flex h-screen justify-between items-center px-8">
        <div className=" flex flex-col gap-2  w-6/12">
          <p className="text-4xl font-bold font-inter text-end">All Startup Ideas</p>
          <p className="text-lg text-end text-gray-600 font-inter">
            Turn your startup ideas into reality by sharing your concepts with a
            vibrant community of innovators, thinkers, and investors. Get
            valuable, constructive feedback to refine your vision, and build
            connections with investors eager to support the next big idea.
            Discover a world of innovation through startup ideas submitted by
            founders from across the globe.
          </p>
        </div>
        <div className="w-6/12 flex justify-start ">
          <img src={FindingIdeas} alt="" className="w-100" />
        </div>
      </div>

      <div className=" p-5 bg-gray-50 flex flex-col gap-2 mb-5">
        <p className="text-[28px] font-bold font-inter">
          Explore Startup Ideas
        </p>
        <p className="text-[16px] text-[#888888] font-inter">
          Discover innovative startup ideas from founders worldwide
        </p>
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-10">
          <div className="relative w-full md:w-1/3">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-3 w-full md:w-2/3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Recently Added</option>
              <option value="oldest">Oldest</option>
            </select>
            <select
              value={voteSort}
              onChange={(e) => setVoteSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Upvoted</option>
              <option value="least">Least Upvoted</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-2  border-gray-400  rounded-lg ">
          {loading ? (
            <p className="text-center text-sm">Loading ideas...</p>
          ) : error ? (
            <p className="text-center text-gray-500">{error}</p>
          ) : ideas.length === 0 ? (
            <p className="text-center">No ideas found.</p>
          ) : (
            <IdeaCard ideas={filteredIdeas} userRole={currentUser?.role} />
          )}
        </div>
      </div>
    </div>
  );
}
