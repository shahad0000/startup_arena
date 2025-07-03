import React, { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { FiEdit3 } from 'react-icons/fi';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import tagColors from "../Component/CatagoryColors"
import { Link } from 'react-router';


const submittedIdeas = [
  {
    id: 1,
    title: 'EcoTrack - Carbon Footprint App',
    description: 'A tool to track and reduce your carbon footprint.',
    totalUpvotes: 113,
    categorys: 'Fitness'
  },
  {
    id: 2,
    title: 'HealthTrack - Wellness App',
    description: 'An app to monitor your health and wellness.',
    totalUpvotes: 23,
    categorys: 'Health'
  },
  {
    id: 3,
    title: 'EduLearn - Learning Platform',
    description: 'A platform for online learning and education.',
    totalUpvotes: 68,
    categorys: 'Education'
  },
  {
    id: 4,
    title: 'FitTrack - Fitness App',
    description: 'An app to track your fitness goals and progress.',
    totalUpvotes: 25,
    categorys: 'Technology'
  }
];

export default function MyIdeas() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="bg-white px-4 md:px-10 py-10 text-[#333]  mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">My Ideas</h1>
        <p className="text-sm text-gray-500">View and edit your personal details</p>
      </div>

      {/* Submitted Ideas */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-lg">Your Submitted Ideas</h3>
        <Link
        to={"/submitIdea"}
        className="bg-yellow-400 text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-500">
          Add Idea +
        </Link>
      </div>

      <div className="space-y-4 mb-12">
        {submittedIdeas.map((idea) => (
          <div key={idea.id} className="bg-white border border-gray-200 rounded-md p-4 flex justify-between items-start">
            <div>
              <div className='flex gap-2 '>
              <h4 className="font-medium text-base mb-1">{idea.title}</h4> <span className="flex items-center text-amber-400 font-medium">
                  <GoArrowUp className="mr-1" /> {idea.totalUpvotes}
                </span></div>
              <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
              <div className="flex items-center gap-2 text-sm">
                
                {idea.categorys && (
                  <span className={`${tagColors[idea.categorys]} px-2 py-1 rounded-full text-xs`}>{idea.categorys}</span>
                )}
              </div>
            </div>
       <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setActiveMenu(activeMenu === idea.id ? null : idea.id)}
                >
                  <BiDotsVerticalRounded size={20} />
                </button>
                {activeMenu === idea.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-10">
                    <Link className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-1200">View Detail</Link>
                    <Link className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">Analysis</Link>
                    <button className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">Delete</button>
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>

      
    </div>
  );
}  
