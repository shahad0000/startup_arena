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
    return <p className="p-6 text-center">Loading Venture Board...</p>;

  return (
    <>
      <div className="bg-[#FAFAFA] px-4 md:px-8 py-10 text-[#333333]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[28px] font-bold font-inter">
            The Venture Board
          </h1>
          <p className="text-[16px] text-[#888888] font-inter">
            High-performing ideas with <span className="font-bold"> 100+ </span>
            community votes
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="relative w-full md:w-1/3">
            <span className="absolute left-3 top-2.5 text-[#888888]">
              <IoSearch />
            </span>
            <input
              type="text"
              placeholder="Search ideas..."
              className="w-full pl-10 pr-4 py-2 border border-[#E0E0E0] rounded-lg"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-4 w-full md:w-2/3">
            {["All createdAt", "Most Upvoted"].map((label, i) => (
              <select
                key={i}
                className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm text-[#333333]"
              >
                <option>{label}</option>
              </select>
            ))}
          </div>
        </div>
        <IdeaCard ideas={ideas} userRole={currentUser?.role} />
      </div>
    </>
  );
}

export default VentureBoard;
