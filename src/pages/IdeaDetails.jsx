import React, { useState } from "react"
import { GoArrowUp, GoLinkExternal } from "react-icons/go"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { useParams, useNavigate, Link } from "react-router"
import { CiCalendar } from "react-icons/ci"
import { FaChevronCircleUp } from "react-icons/fa"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { RiSendPlaneFill } from "react-icons/ri"
import { IoIosArrowBack } from "react-icons/io"

const ideaData = {
  1: {
    title: "AI-Powered Personal Finance Assistant",
    date: "Dec 15, 2024",
    author: "Sarah Chen",
    tag: "Technology",
    description:
      "Our AI-powered personal finance assistant revolutionizes how individuals manage their money. Using advanced machine learning algorithms, the platform analyzes spending patterns, predicts financial trends, and provides personalized recommendations to help users achieve their financial goals.\n\nKey features include automated expense categorization, smart budgeting with real-time alerts, investment portfolio optimization, and bill payment reminders. The AI learns from user behavior to provide increasingly accurate financial advice over time.\n\nWith seamless integration across banking platforms and a user-friendly mobile interface, our solution makes financial management accessible to everyone, regardless of their financial literacy level.",
    votes: 247,
    likes: 150,
    dislikes: 10,
    comments: [
      {
        author: "Emily Rodriguez",
        content:
          "This is exactly what I’ve been looking for! The AI recommendations feature sounds incredibly useful. Have you considered adding cryptocurrency tracking?",
        time: "2 hours ago",
        likes: 20,
      },
      {
        author: "Michael Thompson",
        content:
          "Great concept! I’m curious about the data privacy measures. How do you ensure user financial data remains secure?",
        time: "5 hours ago",
        likes: 20,
      },
    ],
  },
}

export default function IdeaDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const idea = ideaData[id]

  const [likes, setLikes] = useState(idea.likes)
  const [dislikes, setDislikes] = useState(idea.dislikes)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(idea.comments)
  const [voteStatus, setVoteStatus] = useState(null)

  const handleLike = () => {
    if (voteStatus === "up") {
      setLikes((prev) => prev - 1)
      setVoteStatus(null)
    } else if (voteStatus === "down") {
      setLikes((prev) => prev + 2)
      setVoteStatus("up")
    } else {
      setLikes((prev) => prev + 1)
      setVoteStatus("up")
    }
  }

  const handleDislike = () => {
    if (voteStatus === "down") {
      setLikes((prev) => prev + 1)
      setVoteStatus(null)
    } else if (voteStatus === "up") {
      setLikes((prev) => prev - 2)
      setVoteStatus("down")
    } else {
      setLikes((prev) => prev - 1)
      setVoteStatus("down")
    }
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return
    const comment = {
      author: "You",
      content: newComment,
      time: "Just now",
      likes: 0,
    }
    setComments([comment, ...comments])
    setNewComment("")
  }

  if (!idea) return <p className="p-6">Idea not found.</p>

  return (
    <>
    <Link 
      to="/AllIdeas" 
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
    >
      <IoIosArrowBack />
      Back
    </Link> 

    <div className=" mx-auto px-4 py-10 space-y-6">
      {/* Idea Card */}
      <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold">{idea.title}</h1>
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mt-1">
            <p>{idea.author}</p>
            <p className="flex gap-1 items-center">
              <CiCalendar className="mt-0.5" /> {idea.date}
            </p>
          </div>
          <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
            {idea.tag}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="border border-gray-100 rounded p-4 text-sm text-gray-700 flex-1 whitespace-pre-line">
            {idea.description}
            <p className="mt-2 text-blue-800 ">
              <Link className="flex gap-1">
                <GoLinkExternal className="mt-1" /> MVP Document
              </Link>
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full ${
                voteStatus === "up"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-green-600 hover:bg-green-50"
              }`}
              aria-label="Upvote"
            >
              <FaChevronUp size={20} />
            </button>

            <span className="font-medium my-1 min-w-[20px] text-center">
              {likes}
            </span>

            <button
              onClick={handleDislike}
              className={`p-2 rounded-full ${
                voteStatus === "down"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-red-600 hover:bg-red-50"
              }`}
              aria-label="Downvote"
            >
              <FaChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>

        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          placeholder="Add comment ..."
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
        {comments.map((comment, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded p-3 text-sm text-gray-700 space-y-2"
          >
            <div className="flex justify-between">
              <strong>{comment.author}</strong>
              <span className="text-xs text-gray-400">{comment.time}</span>
            </div>
            <p>{comment.content}</p>

            {/* Comment Voting Buttons */}
            <div className="flex gap-1 justify-end items-center">
              <button
                onClick={handleLike}
                className={`p-1.5 rounded-full ${
                  voteStatus === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-green-600 hover:bg-green-50"
                }`}
                aria-label="Like"
              >
                <FaChevronUp size={16} />
              </button>

              <span className="font-medium text-sm">{comment.likes}</span>

              <button
                onClick={handleDislike}
                className={`p-1.5 rounded-full ${
                  voteStatus === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-red-600 hover:bg-red-50"
                }`}
                aria-label="Dislike"
              >
                <FaChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div></>
  )
}
