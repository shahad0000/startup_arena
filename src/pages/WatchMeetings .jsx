import React, { useState } from "react";

const randomColors = [
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-teal-200",
];

const meetings = [
  { title: "AI-Powered Customer Service Platform", time: "10:05" },
  { title: "Telemedicine Platform for Rural Areas", time: "10:25" },
  { title: "Blockchain Payment Gateway", time: "10:40" },
  { title: "Sustainable Fashion Marketplace", time: "11:20" },
  { title: "Smart Grid Energy Management", time: "11:35" },
  {
    title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit maxime beatae a consectetur at architecto, provident illo deleniti. Delectus doloribus voluptate sapiente sit at iure earum quo illum libero veniam.`,
    time: "11:35",
  },
];

const WatchMeetings = () => {
  const [meetingCards] = useState(
    meetings.map((meeting) => ({
      ...meeting,
      color: randomColors[Math.floor(Math.random() * randomColors.length)],
    }))
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-2xl font-bold">Watch Meetings</p>
          <p className="text-sm text-gray-600">
            Explore recorded investor meetings and startup pitches
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex justify-center items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Founder Location
            </label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>All Locations</option>
              <option>USA</option>
              <option>Europe</option>
              <option>Asia</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Apply
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Reset
          </button>
        </div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meetingCards.map((meeting, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md ${meeting.color} flex flex-col items-center justify-between`}
            >
              {/* Limit title to 100 characters */}
              <p className="text-lg font-bold w-full h-15 text-start">
                {meeting.title.length > 100
                  ? meeting.title.slice(0, 100) + "..."
                  : meeting.title}
              </p>
              <p className="text-sm font-medium text-gray-600 text-end w-full h-5">
                {meeting.time}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
            Load More Meetings
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchMeetings;
