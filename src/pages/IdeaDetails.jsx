import { useEffect, useState } from "react";
import RequestMeetingModal from "../Component/RequestMeetingModal";
import { useParams } from "react-router";
import { Lightbulb } from "lucide-react";
import { Link } from "react-router";
import { IoIosArrowBack } from "react-icons/io";

// Services
import { fetchIdeaById } from "../services/ideas.service";
import { fetchUserVote } from "../services/ideas.service";
import { voteIdea } from "../services/ideas.service";
import {
  fetchCommentsByIdeaId,
  postComment,
  reportComment,
} from "../services/comments.service";
import { voteOnComment } from "../services/comments.service";
import { getCurrentUser } from "../services/auth.service";
import { scheduleMeeting } from "../services/zoom.service";
import { getUserById } from "../services/users.service";

// Icons
import { GoLinkExternal } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Swal from "sweetalert2";

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [voteStatus, setVoteStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [netVotes, setNetVotes] = useState(0);
  const [showReport, setShowReport] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetType, setTargetType] = useState("comment");
  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    isPrivate: false,
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmitMeeting = async (e) => {
    e.preventDefault();
    if (!formData.topic || !formData.start_time) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const payload = {
        ...formData,
        userId: currentUser.id,
        targetType,
        targetId,
      };
      const meeting = await scheduleMeeting(payload);
      console.log("Meeting created:", meeting);
      setShowModal(false);
      setFormData({
        topic: "",
        start_time: "",
        duration: 30,
        isPrivate: false,
      });
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        setUserRole(user?.role || null);

        const ideaData = await fetchIdeaById(id);
        setIdea(ideaData.data);
        setNetVotes(ideaData.data.totalUpvotes - ideaData.data.totalDownvotes);

        const commentsData = await fetchCommentsByIdeaId(id);
        const commentsWithScores = await Promise.all(
          commentsData.map(async (c) => {
            let userScore = c.userId?.score;
            if (userScore === undefined) {
              try {
                const userId = c.userId?._id || c.userId;
                if (userId) {
                  const userInfo = await getUserById(userId.id);
                  userScore = userInfo?.score;
                }
              } catch (err) {
                console.error("Failed to load user score", err);
              }
            }
            return {
              id: c._id,
              author: c.userId?.name || "Unknown",
              content: c.text,
              time: new Date(c.createdAt).toLocaleString(),
              upvotes: c.totalUpvotes,
              downvotes: c.totalDownvotes,
              score: typeof userScore === "number" ? userScore : 0,
            };
          })
        );
        setComments(commentsWithScores);

        if (user?.id) {
          const vote = await fetchUserVote(user.id, id);
          setVoteStatus(vote === 1 ? "up" : vote === -1 ? "down" : null);
        }
      } catch (err) {
        setError("Idea not found");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  const handleUpvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "up" ? 0 : 1);
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes;
      setNetVotes(totalUpvotes - totalDownvotes);
      setVoteStatus(voteStatus === "up" ? null : "up");
    } catch (err) {
      console.error("Error voting up:", err);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "down" ? 0 : -1);
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes;
      setNetVotes(totalUpvotes - totalDownvotes);
      setVoteStatus(voteStatus === "down" ? null : "down");
    } catch (err) {
      console.error("Error voting down:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const createdComment = await postComment(id, newComment);
      setComments([
        {
          id: createdComment._id,
          author: createdComment.userId?.name || "You",
          content: createdComment.text.trim(),
          time: new Date(createdComment.createdAt).toLocaleString(),
          upvotes: createdComment.totalUpvotes || 0,
          downvotes: createdComment.totalDownvotes || 0,
          score: currentUser?.score || 0,
        },
        ...comments,
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleCommentVote = async (commentId, voteValue) => {
    try {
      const result = await voteOnComment({
        commentId,
        ideaId: idea._id,
        vote: voteValue,
      });
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                upvotes: result.data.upvotes,
                downvotes: result.data.downvotes,
              }
            : c
        )
      );
    } catch (err) {
      console.error("Error voting on comment:", err);
    }
  };

  const handleReport = async (commentId) => {
    try {
      await reportComment(commentId);
      setShowReport(null);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Report submitted!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Failed to report comment:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 text-[#333] font-sans">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="w-full px-4  lg:px-34 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Idea Details
              </h1>
              <p className="text-gray-600 text-xs">
                Full view of your startup idea
              </p>
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/AllIdeas"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <IoIosArrowBack className="text-base" />
            Back
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-2">
        {/* Profile and Meeting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-3 bg-white border border-gray-200 rounded-md p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <img
              src={
                idea.founderId?.profilePic ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="text-sm font-bold">{idea.founderId?.name}</p>
              <p className="text-xs text-gray-500 italic">
                {idea.founderId?.email}
              </p>
            </div>
          </div>
          {userRole === "investor" && (
            <button
              onClick={() => {
                setTargetId(idea._id);
                setTargetType("idea");
                openModal();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1E40AF] text-white px-4 py-2 text-sm font-medium rounded hover:bg-[#1e40afc6]"
            >
              <CiCalendar /> Request Meeting
            </button>
          )}
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold">{idea.title}</h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mt-1">
              <p>{idea.founderId?.name}</p>
              <p className="flex gap-1 items-center">
                <CiCalendar className="mt-0.5" />
                {new Date(idea.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              {idea.category}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-[100%]">
            <div className="flex flex-col md:flex-row w-full border border-gray-100 rounded p-4 text-sm text-gray-700">
              {/* Idea Content */}
              <div className="flex-1 w-full max-w-full">
                <div className="text-[16px] flex flex-wrap gap-2 font-semibold text-[#666666] mb-3">
                  <p className="text-black whitespace-nowrap">Target market:</p>
                  <p className="text-blue-800 break-words">
                    {idea.targetMarket}
                  </p>
                </div>

                <div className="text-[15px] break-words whitespace-pre-line mb-3 w-full">
                  {idea.description}
                </div>

                <p
                  className={`mt-2 text-blue-800 ${
                    !idea.mvpLink ? "hidden" : ""
                  }`}
                >
                  <a
                    href={idea.mvpLink || "#"}
                    target="_blank"
                    className="flex gap-1 text-blue-800 hover:underline"
                    rel="noopener noreferrer"
                  >
                    <GoLinkExternal className="mt-1" /> MVP Document
                  </a>
                </p>
              </div>

              {/* Voting Section */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-3 mt-4 md:mt-0 md:ml-6 bg-gray-50 rounded-md p-2">
                {/* Upvote */}
                <button
                  disabled={!currentUser}
                  onClick={handleUpvote}
                  className={`p-2 rounded-full transition-all duration-150 shadow-sm focus:outline-none ${
                    voteStatus === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-white text-gray-500 hover:bg-green-50 hover:text-green-600"
                  }`}
                  aria-label="Upvote"
                >
                  <FaChevronUp size={18} />
                </button>

                {/* Vote Count */}
                <span className="text-base font-semibold text-gray-700 px-1">
                  {netVotes}
                </span>

                {/* Downvote */}
                <button
                  disabled={!currentUser}
                  onClick={handleDownvote}
                  className={`p-2 rounded-full transition-all duration-150 shadow-sm focus:outline-none ${
                    voteStatus === "down"
                      ? "bg-red-100 text-red-700"
                      : "bg-white text-gray-500 hover:bg-red-50 hover:text-red-600"
                  }`}
                  aria-label="Downvote"
                >
                  <FaChevronDown size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>

          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-1.5 flex items-center gap-1 bg-blue-800 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              <RiSendPlaneFill /> Post
            </button>
          </div>

          {/* Comment List */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 rounded-lg bg-white p-4 sm:p-5 space-y-3 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <strong className="text-sm text-gray-800">
                    {comment.author}
                  </strong>

                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: comment.score }, (_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>
              {/* Comment Content */}
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {comment.content.trim()}
              </p>
              <div className="flex justify-between items-center flex-wrap gap-3 pt-2 border-t border-gray-100">
                {/* Voting */}
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-full bg-gray-100 text-green-600 hover:bg-green-200"
                    onClick={() => handleCommentVote(comment.id, 1)}
                    aria-label="Upvote"
                  >
                    <FaChevronUp size={16} />
                  </button>
                  <span className="text-green-700 font-semibold text-sm">
                    {comment.upvotes}
                  </span>

                  <button
                    className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-200"
                    onClick={() => handleCommentVote(comment.id, -1)}
                    aria-label="Downvote"
                  >
                    <FaChevronDown size={16} />
                  </button>
                  <span className="text-red-700 font-semibold text-sm">
                    {comment.downvotes}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 relative">
                  {currentUser?.id === idea.founderId?.id && (
                    <button
                      onClick={() => {
                        setTargetId(comment.id);
                        setTargetType("comment");
                        setShowModal(true);
                      }}
                      className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100"
                      title="Schedule meeting"
                    >
                      <IoCalendarOutline />
                    </button>
                  )}

                  {/* More*/}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowReport((prev) =>
                          prev === comment.id ? null : comment.id
                        )
                      }
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      aria-label="More options"
                    >
                      <BiDotsVerticalRounded size={18} />
                    </button>

                    {showReport === comment.id && (
                      <div className="absolute top-10 right-0 bg-white border border-gray-200 shadow-md rounded-md z-20 w-28">
                        <button
                          onClick={() => handleReport(comment.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <RequestMeetingModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleSubmitMeeting}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
