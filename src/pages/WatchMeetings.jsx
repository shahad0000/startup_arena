import React, { useEffect, useState } from "react";
import { zoomRecordings } from "../services/zoom.service";
import { FaVideo } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const WatchMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true);
      setError("");
      try {
        const meetingData = await zoomRecordings();
        setMeetings(meetingData);
      } catch (err) {
        console.error("Zoom recordings error:", err);
        setError("Failed to load meetings.");
      } finally {
        setLoading(false);
      }
    };
    loadMeetings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-2 min-h-screen min-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }
  const filterMeetings = meetings.filter((meeting) => {
    return meeting.topic.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  });
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen text-[#333333]">
      <div className="min-h-screen">
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                  <FaVideo className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Watch Meetings
                  </h1>
                  <p className="text-gray-600 text-xs hidden sm:block">
                    Explore recorded investor meetings and startup pitches
                  </p>
                </div>
              </div>
  
              <div className="flex items-center gap-3">
                <div className="relative">
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-30 lg:w-64 pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto lg:px-6 px-3">
          {filterMeetings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No meetings found.</p>
            </div>
          ) : (
            <div className="px-3 py-6 lg:px-6 lg:py-8 sm:px-8 md:px-10 border-l-4 border-r-4 border-double border-gray-200 bg-gradient-to-b from-slate-50 to-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterMeetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="relative w-full pb-[56.25%]">
                      {meeting.recording_files?.length > 0 ? (
                        meeting.recording_files
                          .filter((file) => file.file_type === "MP4")
                          .map((file) => (
                            <video
                              key={file.id}
                              controls
                              className="absolute top-0 left-0 w-full h-full object-cover"
                              src={file.download_url}
                              preload="metadata"
                            />
                          ))
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                          No video available
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(meeting.start_time).toLocaleString()}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {meeting.topic}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10 text-sm text-gray-400 italic">
                You’ve reached the end. Stay tuned for more!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default WatchMeetings;
