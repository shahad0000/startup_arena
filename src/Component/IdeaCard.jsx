import React, { useState } from "react";
import tagColors from "../Component/CatagoryColors";
import { Link } from "react-router";
import RequestMeetingModal from "./RequestMeetingModal.jsx";
import { scheduleMeeting } from "../services/zoom.service";
import { ArrowUp, Eye, Calendar } from "lucide-react";

export const IdeaCard = ({ ideas = [], userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [IdeaId, setIdeaId] = useState(null);

  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    isPrivate: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        userId: "me",
        targetType: "idea",
        targetId: IdeaId,
      };

      const meeting = await scheduleMeeting(payload);
      console.log("Meeting created:", meeting);
      closeModal();
      setFormData({
        topic: "",
        start_time: "",
        duration: 30,
        isPrivate: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1  gap-y-7 gap-x-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white drop-shadow-lg rounded-lg lg:p-9 relative transform transition-transform duration-300 ease-in-out hover:translate-1 hover:scale-100"
          >
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      tagColors[idea.category.toLowerCase()] ||
                      tagColors.other
                    } px-3 py-1 text-xs font-medium rounded-full`}
                  >
                    {idea.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <ArrowUp className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700 font-semibold text-sm">
                    {idea.totalUpvotes - idea.totalDownvotes}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {idea.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {idea.description}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Target market:</span>
                <span className="text-blue-800 font-medium bg-blue-50 px-2 py-1 rounded-md">
                  {idea.targetMarket}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="lg:px-6 lg:py-4 p-2 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                {/* Founder Info */}
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={
                        idea.founderId?.profilePic ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      }
                      alt={idea.founderId?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {idea?.founderId?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Link to={`/detailIdea/${idea._id}`} className="flex items-center px-2 gap-2 bg-blue-900 hover:bg-blue-800 text-white lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm lg:font-medium transition-colors">
                    <Eye className="lg:w-4 lg:h-4" />
                    View Details
                  </Link>
                  {userRole === "investor" && (
                    <button
                      onClick={() => {
                        setIdeaId(idea._id);
                        openModal();
                      }}
                      className="flex items-center p-1 gap-2 cursor-pointer bg-blue-800 hover:bg-blue-700 text-white lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm lg:font-medium transition-colors"
                    >
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      Meet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request meeting modal */}
      <RequestMeetingModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};
