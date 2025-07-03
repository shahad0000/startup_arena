import React from 'react'
import { IdeaCard } from '../Component/IdeaCard'
import { IoSearch } from 'react-icons/io5';

const ideas = [
  {
    id: 1,
    title: "AI-powered Tax Assistant",
    description:
      "A smart assistant that helps freelancers and small businesses calculate, track, and file their taxes using AI.",
    categorys: ["Technology"],
    founder: "Alex Chen",
    targetMarket: "Saudi Arabia",
    createdAt: "2 days ago",
    totalUpvotes: 123,
  },
  {
    id: 2,
    title: "Online Language Exchange",
    description:
      "A platform that connects people worldwide for language learning through video chats and AI corrections.",
    categorys: ["Education"],
    founder: "Maria Gomez",
    createdAt: "5 days ago",
    targetMarket: "Kuwait",

    totalUpvotes: 89,
  },
  {
    id: 3,
    title: "Sustainable Grocery Delivery",
    description:
      "Eco-friendly grocery delivery using electric bikes and reusable packaging in urban cities.",
    categorys: ["Sustainability"],
    founder: "Omar Al-Salem",
    targetMarket: "UAE",
    createdAt: "1 week ago",
    totalUpvotes: 64,
  },
]

function FeaturedIdeas() {
const featuredIdeas = ideas.filter(idea => idea.totalUpvotes >= 100);

  return (
    <>
    <div className="bg-[#FAFAFA] px-4 md:px-8 py-10 text-[#333333]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-[28px] font-bold font-inter">
Featured Ideas        </h1>
        <p className="text-[16px] text-[#888888] font-inter">
High-performing ideas with <span className='font-bold'> 100+</span> community votes        </p>
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
          {["All createdAt", "Most Upvoted"].map(
            (label, i) => (
              <select
                key={i}
                className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm text-[#333333]"
              >
                <option>{label}</option>
              </select>
            )
          )}
        </div>
      </div>
      <IdeaCard ideas={featuredIdeas} />
    </div>
</>
    )
}

export default FeaturedIdeas