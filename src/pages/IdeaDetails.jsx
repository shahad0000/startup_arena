import { useEffect, useState } from "react"
import RequestMeetingModal from "../Component/RequestMeetingModal"
import { useParams } from "react-router"

// Services
import { fetchIdeaById } from "../services/ideas.service"
import { fetchUserVote } from "../services/ideas.service"
import { voteIdea } from "../services/ideas.service"
import {
  fetchCommentsByIdeaId,
  postComment,
  reportComment,
} from "../services/comments.service"
import { voteOnComment } from "../services/comments.service"
import { getCurrentUser } from "../services/auth.service"
import { scheduleMeeting } from "../services/zoom.service"
import { getUserById } from "../services/users.service"

// Icons
import { GoLinkExternal } from "react-icons/go"
import { CiCalendar } from "react-icons/ci"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { RiSendPlaneFill } from "react-icons/ri"
import { FaStar } from "react-icons/fa"
import { IoCalendarOutline } from "react-icons/io5"
import { BiDotsVerticalRounded } from "react-icons/bi"

export default function IdeaDetails() {
  const { id } = useParams()
  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const [voteStatus, setVoteStatus] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [netVotes, setNetVotes] = useState(0)
  const [showReport, setShowReport] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [targetId, setTargetId] = useState(null)
  const [targetType, setTargetType] = useState("comment")
  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    isPrivate: false,
  })

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleSubmitMeeting = async (e) => {
    e.preventDefault()
    if (!formData.topic || !formData.start_time) {
      alert("Please fill in all required fields.")
      return
    }
    try {
      const payload = {
        ...formData,
        userId: currentUser.id,
        targetType,
        targetId,
      }
      const meeting = await scheduleMeeting(payload)
      console.log("Meeting created:", meeting)
      setShowModal(false)
      setFormData({ topic: "", start_time: "", duration: 30, isPrivate: false })
    } catch (err) {
      console.error("Error creating meeting:", err)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)
        setUserRole(user?.role || null)

        const ideaData = await fetchIdeaById(id)
        setIdea(ideaData.data)
        setNetVotes(ideaData.data.totalUpvotes - ideaData.data.totalDownvotes)

        const commentsData = await fetchCommentsByIdeaId(id)
        const commentsWithScores = await Promise.all(
          commentsData.map(async (c) => {
            let userScore = c.userId?.score
            if (userScore === undefined) {
              try {
                const userId = c.userId?._id || c.userId
                if (userId) {
                  const userInfo = await getUserById(userId.id)
                  userScore = userInfo?.score
                }
              } catch (err) {
                console.error("Failed to load user score", err)
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
            }
          })
        )
        setComments(commentsWithScores)

        if (user?.id) {
          const vote = await fetchUserVote(user.id, id)
          setVoteStatus(vote === 1 ? "up" : vote === -1 ? "down" : null)
        }
      } catch (err) {
        setError("Idea not found")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [id])

  const handleUpvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "up" ? 0 : 1)
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes
      setNetVotes(totalUpvotes - totalDownvotes)
      setVoteStatus(voteStatus === "up" ? null : "up")
    } catch (err) {
      console.error("Error voting up:", err)
    }
  }

  const handleDownvote = async () => {
    try {
      const res = await voteIdea(id, voteStatus === "down" ? 0 : -1)
      const { totalUpvotes, totalDownvotes } = res.data.totalVotes
      setNetVotes(totalUpvotes - totalDownvotes)
      setVoteStatus(voteStatus === "down" ? null : "down")
    } catch (err) {
      console.error("Error voting down:", err)
    }
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    try {
      const createdComment = await postComment(id, newComment)
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
      ])
      setNewComment("")
    } catch (error) {
      console.error("Failed to post comment:", error)
    }
  }

  const handleCommentVote = async (commentId, voteValue) => {
    try {
      const result = await voteOnComment({
        commentId,
        ideaId: idea._id,
        vote: voteValue,
      })
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
      )
    } catch (err) {
      console.error("Error voting on comment:", err)
    }
  }

  const handleReport = async (commentId) => {
    try {
      await reportComment(commentId);
      setShowReport(null);
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
    )
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>

  return (
    <div className="mx-auto px-4 py-10 space-y-6">
      {/* Profile and Meeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-md p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <img
            src={idea.profilePic}
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
              setTargetId(idea._id)
              setTargetType("idea")
              openModal()
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

        {/* Content & Voting - All inside same box for better layout */}
        <div className="flex flex-col md:flex-row gap-4 w-[100%]">
          <div className="flex flex-col md:flex-row w-full border border-gray-100 rounded p-4 text-sm text-gray-700">
            {/* Idea Content */}
            <div className="flex-1 w-full max-w-full">
              <div className="text-[16px] flex flex-wrap gap-2 font-semibold text-[#666666] mb-3">
                <p className="text-black whitespace-nowrap">Target market:</p>
                <p className="text-blue-800 break-words">{idea.targetMarket}</p>
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
            <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-2 mt-4 md:mt-0 md:ml-6">
              <button
                disabled={!currentUser}
                onClick={handleUpvote}
                className={`p-2 rounded-full transition ${
                  voteStatus === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-green-600 hover:bg-green-200"
                }`}
                aria-label="Upvote"
              >
                <FaChevronUp size={20} />
              </button>

              <span className="font-medium text-center">{netVotes}</span>

              <button
                disabled={!currentUser}
                onClick={handleDownvote}
                className={`p-2 rounded-full transition ${
                  voteStatus === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-red-600 hover:bg-red-300"
                }`}
                aria-label="Downvote"
              >
                <FaChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>

        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
          placeholder="Add comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-1.5 flex items-center gap-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            <RiSendPlaneFill /> Post
          </button>
        </div>

        {/* Comment List */}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-300 rounded p-3 text-sm text-gray-700 space-y-2"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <strong>{comment.author}</strong>
                <p>
                  {comment.score >= 5 ? (
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                    </div>
                  ) : comment.score >= 4 ? (
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                    </div>
                  ) : comment.score >= 3 ? (
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                    </div>
                  ) : comment.score >= 2 ? (
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <FaStar className="text-amber-400" />
                    </div>
                  ) : comment.score >= 1 ? (
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <span className="text-xs text-gray-400">{comment.time}</span>
            </div>
            <p className="whitespace-pre-line">{comment.content.trim()}</p>

            <div className="flex  gap-2 justify-end items-center relative">
              {currentUser?.id === idea.founderId?.id && (
                <button
                  onClick={() => {
                    setTargetId(comment.id)
                    setTargetType("comment")
                    setShowModal(true)
                  }}
                  className="flex gap-1 items-center text-sm text-blue-600 rounded-full bg-gray-100  p-1.5"
                >
                  <IoCalendarOutline className="" />
                </button>
              )}

              {/* التصويت للأعلى */}
              <button
                className="p-1.5 rounded-full bg-gray-100 text-green-600 hover:bg-green-200"
                aria-label="upvote"
                onClick={() => handleCommentVote(comment.id, 1)}
              >
                <FaChevronUp size={16} />
              </button>
              <span className="text-green-600 text-sm font-medium">
                {comment.upvotes}
              </span>

              {/* التصويت للأسفل */}
              <button
                className="p-1.5 rounded-full bg-gray-100 text-red-600 hover:bg-red-200"
                aria-label="downvote"
                onClick={() => handleCommentVote(comment.id, -1)}
              >
                <FaChevronDown size={16} />
              </button>
              <span className="text-red-600 text-sm font-medium">
                {comment.downvotes}
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setShowReport((prev) =>
                      prev === comment.id ? null : comment.id
                    )
                  }
                  className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  aria-label="More options"
                >
                  <BiDotsVerticalRounded size={18} />
                </button>

                {showReport === comment.id && (
                  <div className="absolute top-8 right-0 bg-white border border-gray-200 shadow-lg rounded-md z-20 w-28">
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
  )
}
