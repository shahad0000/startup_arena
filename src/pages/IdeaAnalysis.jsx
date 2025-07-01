import React from "react"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { GoArrowUp } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { useParams, useNavigate, Link } from "react-router"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"]

const analysisData = {
  1: {
    title: "EcoTrack - Carbon Footprint App",
    description: "A tool to track and reduce your carbon footprint.",
    votes: 113,
    likes: 98,
    dislikes: 7,
    tag: "Featured",
    impact: "High potential for global environmental impact.",
    growth: "Steady user growth over 6 months",
    metrics: {
      users: 1500,
      retention: "82%",
      regions: ["USA", "Germany", "UAE"],
    },

    demographicData: {
      ageGroups: [
        { name: "18-24", value: 300 },
        { name: "25-34", value: 600 },
        { name: "35-44", value: 400 },
        { name: "45+", value: 200 },
      ],
      gender: [
        { name: "Male", value: 800 },
        { name: "Female", value: 650 },
      ],
  vote: [ 
    { name: "Up vote", value: 345 },
    { name: "Down vote", value: 233 },
  ],

      countries: [
        { name: "Saudi Arabia", value: 700 },
        { name: "Qatar", value: 400 },
        { name: "UAE", value: 400 },
      ],
      cities: [
        { name: "Riyadh", value: 300 },
        { name: "Jeddah", value: 250 },
        { name: "Dubai", value: 200 },
        { name: "Doha", value: 150 },
        { name: "Alkharj", value: 100 },
      ],
    },
  },
}

export default function IdeaAnalysisPage() {
  const { id } = useParams()
  const idea = analysisData[parseInt(id)]
  const navigate = useNavigate()

  if (!idea) return <p className="p-6">Idea not found.</p>

  return (
    <>
<Link 
  to="/MyIdeas" 
  className="flex items-center  gap-1 text-blue-600 hover:text-blue-800"
>
  <IoIosArrowBack />
  Back
</Link>
<div className=" mx-auto px-4 md:px-10 py-10 text-[#333]">
  <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-semibold">{idea.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            {idea.tag}
          </span>
        </div>
      </div>
    </div>

    <div className="border-t pt-6">
      <h3 className="text-md font-semibold mb-4">Demographic Breakdown</h3>
      <div className="grid md:grid-cols-3 gap-8">

        {/* Age Groups */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium mb-2">Age Groups</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={idea.demographicData.ageGroups}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {idea.demographicData.ageGroups.map((entry, index) => (
                    <Cell key={`cell-age-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vote */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium mb-2">vote</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={idea.demographicData.vote}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#ffc658"
                  label
                >
                  {idea.demographicData.vote.map((entry, index) => (
                    <Cell key={`cell-vote-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium mb-2">Gender</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={idea.demographicData.gender}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {idea.demographicData.gender.map((entry, index) => (
                    <Cell key={`cell-gender-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium mb-2">Country</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={idea.demographicData.countries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City */}
        <div className="flex flex-col">
          <h4 className="text-sm font-medium mb-2">City</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={idea.demographicData.cities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ff7f50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  </div>
</div></>
  )
}
