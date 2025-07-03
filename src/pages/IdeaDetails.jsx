import React, { useEffect, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { useParams, Link } from "react-router";
import { CiCalendar } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { fetchIdeaById } from "../services/ideas.service";

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [voteStatus, setVoteStatus] = useState(null);

  useEffect(() => {
    const loadIdea = async () => {
      try {
        const data = await fetchIdeaById(id);
        setIdea(data.data);
        setUpvote(data.data.totalUpvotes || 0);
        setDownvote(data.data.totalDownvotes || 0);
        setComments(data.comments || []);
      } catch (err) {
        console.error("Error fetching idea:", err);
        setError("Idea not found");
      } finally {
        setLoading(false);
      }
    };

    loadIdea();
  }, [id]);

  const handleUpvote = () => {
    if (voteStatus === "up") {
      setUpvote((prev) => prev - 1);
      setVoteStatus(null);
    } else if (voteStatus === "down") {
      setUpvote((prev) => prev + 2);
      setDownvote((prev) => prev - 1);
      setVoteStatus("up");
    } else {
      setUpvote((prev) => prev + 1);
      setVoteStatus("up");
    }
  };

  const handleDownvote = () => {
    if (voteStatus === "down") {
      setDownvote((prev) => prev - 1);
      setVoteStatus(null);
    } else if (voteStatus === "up") {
      setDownvote((prev) => prev + 2);
      setUpvote((prev) => prev - 1);
      setVoteStatus("down");
    } else {
      setDownvote((prev) => prev + 1);
      setVoteStatus("down");
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const comment = {
      author: "You",
      content: newComment,
      time: "Just now",
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  if (loading) return <p className="p-6">Loading idea...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!idea) return <p className="p-6">Idea not found.</p>;
  console.log(idea);
  return (
    <>
      <Link
        to="/AllIdeas"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
      >
        <IoIosArrowBack /> Back
      </Link>

      <div className="mx-auto px-4 py-10 space-y-6">
        {/* Idea Card */}
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold">{idea.title}</h1>
            <div className="flex gap-3 items-center">
              <p>{idea.founderId?.name}</p>
              <p className="flex gap-1 items-center">
                <CiCalendar className="mt-0.5" />
                {new Date(idea.createdAt).toLocaleDateString()}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {idea.category}
              </span>
            </div>
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
                onClick={handleUpvote}
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
                {upvote}
              </span>

              <button
                onClick={handleDownvote}
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
          <h2 className="text-lg font-semibold">
            Comments ({comments.length})
          </h2>

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
                  className="p-1.5 rounded-full bg-gray-100 text-green-600 hover:bg-green-50"
                  aria-label="Like"
                >
                  <FaChevronUp size={16} />
                </button>

                <span className="font-medium text-sm">{comment.likes}</span>

                <button
                  className="p-1.5 rounded-full bg-gray-100 text-red-600 hover:bg-red-50"
                  aria-label="Dislike"
                >
                  <FaChevronDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
