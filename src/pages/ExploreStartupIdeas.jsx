import React, { useEffect, useState } from "react";
import { IdeaCard } from "../Component/IdeaCard";
import { IoSearch } from "react-icons/io5";
import { fetchAllIdeas } from "../services/ideas.service";
import { getCurrentUser } from "../services/auth.service";

export default function AllIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

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
    
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    loadData();
    fetchUser();
  }, []);

  return (
    <div className="bg-[#FAFAFA] px-4 md:px-8 py-10 text-[#333333]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-[28px] font-bold font-inter">
          Explore Startup Ideas
        </h1>
        <p className="text-[16px] text-[#888888] font-inter">
          Discover innovative startup ideas from founders worldwide
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

      {/* Content */}
      {loading ? (
        <p className="text-center text-sm">Loading ideas...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : ideas.length === 0 ? (
        <p className="text-center">No ideas found.</p>
      ) : (
        <IdeaCard ideas={ideas} userRole={currentUser?.role} />
      )}
    </div>
  );
}
