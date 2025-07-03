import { useState } from "react";

const comments = [
  {
    user: "John Doe",
    email: "john@example.com",
    comment:
      "This is a longer comment that needs to be truncated for display purposes.",
    ideaTitle: "Idea Title 1",
    date: "Jun 27, 2025 - 14:22",
  },
  {
    user: "Jane Smith",
    email: "jane@example.com",
    comment:
      "Another comment that is quite interesting but needs truncation for better view.",
    ideaTitle: "Idea Title 2",
    date: "Jun 26, 2025 - 12:15",
  },
  {
    user: "Mark Johnson",
    email: "mark@example.com",
    comment: "This comment has been reported due to inappropriate content.",
    ideaTitle: "Idea Title 3",
    date: "Jun 25, 2025 - 10:30",
  },
];

export default function ManageComments() {
  const [search, setSearch] = useState("");

  const filtered = comments.filter(
    (item) =>
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()) ||
      item.ideaTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-1">Manage Comments</h1>
      <p className="text-gray-600 mb-6">
        View, moderate, and delete user comments
      </p>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by user, content, or idea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>All</option>
            <option>Reported</option>
            <option>Flagged</option>
          </select>
          <input
            type="date"
            className="text-sm border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Idea Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">
                  <p className="font-medium">{item.user}</p>
                  <p className="text-gray-500 text-xs">{item.email}</p>
                </td>
                <td className="px-4 py-2 text-gray-700 max-w-xs truncate">
                  {item.comment}
                </td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                  {item.ideaTitle}
                </td>
                <td className="px-4 py-2 text-gray-600">{item.date}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
