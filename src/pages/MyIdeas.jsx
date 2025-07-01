import React, { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { FiEdit3 } from 'react-icons/fi';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import tagColors from "../Component/CatagoryColors"


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
    <div className="bg-white px-4 md:px-10 py-10 text-[#333] max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">My Ideas</h1>
        <p className="text-sm text-gray-500">View and edit your personal details</p>
      </div>
{/* 
      <div className="bg-gray-50 border border-gray-200 rounded-md p-5 mb-8 cursor-pointer" onClick={() => setShowPopup(true)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-1 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-600">john.doe@example.com</p>
            <div className="flex gap-2 mt-2">
              <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">Founder</span>
              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Country: USA</span>
              <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded">Gender: Male</span>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            <FiEdit3 size={20} />
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">User Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Role:</strong> Founder</p>
              <p><strong>Country:</strong> USA</p>
              <p><strong>Gender:</strong> Male</p>
            </div>
            <div className="mt-6 text-right">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}


      {/* Submitted Ideas */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-lg">Your Submitted Ideas</h3>
        <button className="bg-yellow-400 text-white px-4 py-2 text-sm rounded-md hover:bg-yellow-500">
          Add Idea +
        </button>
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
                    <button className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">View Detail</button>
                    <button className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100">Analysis</button>
                    <button className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">Delete</button>
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="border-t pt-6">
        <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
          Logout Account
        </button>
      </div>
    </div>
  );
}  
