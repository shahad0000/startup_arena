import React, { useState } from "react"

/* const randomColors = [
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-teal-200",
] */

const meetings = [
  {
    title: "AI-Powered Customer Service Platform",
    time: "10:05",
    name: "shouq",
  },
  {
    title: "Telemedicine Platform for Rural Areas",
    time: "10:25",
    name: "shahad",
  },
  { title: "Blockchain Payment Gateway", time: "10:40", name: "saad" },
  {
    title: "Sustainable Fashion Marketplace",
    time: "11:20",
    name: "abdalrman",
  },
  { title: "Smart Grid Energy Management", time: "11:35", name: "shouq" },
  {
    title: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit maxime beatae a consectetur at architecto, provident illo deleniti. Delectus doloribus voluptate sapiente sit at iure earum quo illum libero veniam.`,
    time: "11:35",
    name: "shahad",
  },
]

const WatchMeetings = () => {
/*   const [meetingCards] = useState(
    meetings.map((meeting) => ({
      ...meeting,
      color: randomColors[Math.floor(Math.random() * randomColors.length)],
    }))
  ) */

  return (
    <div className="bg-[#FAFAFA] px-4 md:px-8 py-10 text-[#333333]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-xl font-bold">
            {" "}
            <p className="text-2xl font-bold">Watch Meetings</p>
          </h1>
          <p className="text-sm text-gray-500">
            {" "}
            Explore recorded investor meetings and startup pitches
          </p>
        </div>

        {/* Filters Section */}
    <div className="flex w-full  mb-6 justify-end ">
  <div className="flex flex-col gap-2 items-start  ">
   
    <select
      id="industry-select"
      className="border border-[#E0E0E0] rounded-lg px-4 py-2 w-full max-w-xs text-sm text-[#333333]"
    >
      <option>All Industries</option>
      <option>Technology</option>
      <option>Healthcare</option>
      <option>Finance</option>
    </select>
  </div>
</div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
          {meetings.map((meeting, index) => (
            <div
              key={index}
              className="bg- rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div
                className={`h-32 w-full bg-black flex items-center justify-center`}
              >
                <p className="text-lg font-semibold text-white text-center line-clamp-2 px-4">
                  {meeting.title}
                </p>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 text-right mb-2">
                  {meeting.time}
                </p>

                <div className="text-sm font-medium text-gray-700">
                  by <span className="font-semibold">{meeting.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
       <div className="flex justify-center mt-10">
        <button className="border border-gray-300 px-6 py-3 rounded-[10px] text-[16px] font-medium focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 ">
          Load More Ideas
        </button>
      </div>
      </div>
    </div>
  )
}

export default WatchMeetings
