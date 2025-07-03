import { useState } from "react";

const users = [
  { name: "John Doe", email: "john@example.com", role: "Investor" },
  { name: "Jane Smith", email: "jane@example.com", role: "Critic" },
  { name: "Mark Johnson", email: "mark@example.com", role: "Founder" },
  { name: "Lucy Brown", email: "lucy@example.com", role: "Critic" },
  { name: "Mike Davis", email: "mike@example.com", role: "Critic" },
];

const roleColors = {
  Investor: "bg-blue-200 text-blue-800",
  Critic: "bg-gray-300 text-gray-800",
  Founder: "bg-yellow-200 text-yellow-800",
};

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Dashboard Header */}
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Overview of platform metrics and user management</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" count="1,250" />
        <StatCard title="Total Critic" count="750" />
        <StatCard title="Total Investor" count="150" />
        <StatCard title="Total Founder" count="350" />
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Registered Users</h2>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-400">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2 text-gray-600">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${roleColors[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
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
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
