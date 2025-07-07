import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchVentureBoard } from "../services/venture-board.service";
import { getCurrentUser } from "../services/auth.service";

function VentureBoard() {
  const [ideas, setIdeas] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div class="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );

  return (
<div
  className="min-h-screen w-full bg-gradient-to-br from-white via-[#f0f9ff] to-[#e0f2fe] text-gray-800 font-sans relative overflow-hidden"
>
  <img
    src="https://static.thenounproject.com/png/profit-icon-4491647-512.png"
    alt="Background Icon"
    className="absolute opacity-10 w-[280px] md:w-[360px] lg:w-[440px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
  />

  <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 relative z-10">
    {/* Header */}
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
        The Venture Board 
      </h1>
      <p className="text-base md:text-lg text-gray-500 mt-3">
        Explore high-impact startup ideas with{" "}
        <span className="font-semibold text-blue-900">100+ community votes</span>
      </p>
    </div>

    {/* Filters */}
    <div className="bg-white border border-gray-100 shadow-md rounded-xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
      <div className="relative w-full md:w-1/2">
        <IoSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search startup ideas..."
          className="w-full pl-12 pr-4 py-2.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-wrap justify-end gap-3 w-full md:w-auto">
        <select className="bg-gray-100 text-sm px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All Time</option>
          <option>This Month</option>
          <option>This Week</option>
        </select>
        <select className="bg-gray-100 text-sm px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Most Upvoted</option>
          <option>Newest First</option>
          <option>Most Discussed</option>
        </select>
      </div>
    </div>

    {/* Ideas List */}
    <div className="animate-fadeIn">
      <IdeaCard ideas={ideas} userRole={currentUser?.role} />
    </div>
  </div>
</div>



  );
}

export default VentureBoard;
