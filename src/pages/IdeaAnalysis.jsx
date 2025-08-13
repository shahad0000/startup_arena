import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, Link } from "react-router";
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
} from "recharts";
import { fetchIdeaAnalytics, fetchIdeaById } from "../services/ideas.service";
import { BarChart3 } from "lucide-react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

function aggregateAnalytics(votes) {
  const ageGroupsCount = {
    "18-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45+": 0,
  };
  const genderCount = {};
  const countryCount = {};
  const cityCount = {};
  let upVotes = 0;
  let downVotes = 0;

  const normalize = (value) => (value ? value.trim().toLowerCase() : null);

  const normalizeCity = (value) =>
    value ? value.trim().replace(/\s+/g, " ").toLowerCase() : null;

  const formatLabel = (type, key) => {
    if (!key) return "";
    return key
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  votes.forEach((v) => {
    if (v.value === 1) upVotes += 1;
    if (v.value === -1) downVotes += 1;
    if (!v.userId) return;

    const { age, gender, country, city } = v.userId;

    // Age groups
    if (typeof age === "number") {
      if (age < 25) ageGroupsCount["18-24"] += 1;
      else if (age < 35) ageGroupsCount["25-34"] += 1;
      else if (age < 45) ageGroupsCount["35-44"] += 1;
      else ageGroupsCount["45+"] += 1;
    }

    // Gender normalization
    const g = normalize(gender);
    if (g) genderCount[g] = (genderCount[g] || 0) + 1;

    // Country normalization
    const ctry = normalize(country);
    if (ctry) countryCount[ctry] = (countryCount[ctry] || 0) + 1;

    // City normalization
    const cty = normalizeCity(city);
    if (cty) cityCount[cty] = (cityCount[cty] || 0) + 1;
  });

  const mapToArray = (obj, type) =>
    Object.keys(obj).map((name) => ({
      name: formatLabel(type, name),
      value: obj[name],
    }));

  return {
    ageGroups: mapToArray(ageGroupsCount).filter((g) => g.value > 0),
    gender: mapToArray(genderCount, "gender"),
    countries: mapToArray(countryCount, "country"),
    cities: mapToArray(cityCount, "city"),
    vote: [
      { name: "Up vote", value: upVotes },
      { name: "Down vote", value: downVotes },
    ],
  };
}

export default function IdeaAnalysisPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [ideaRes, analyticsRes] = await Promise.all([
          fetchIdeaById(id),
          fetchIdeaAnalytics(id),
        ]);

        const votes = analyticsRes.data?.idea || analyticsRes.idea || [];
        const demographicData = aggregateAnalytics(votes);
        const ideaData = ideaRes.data || ideaRes;

        setIdea({ ...ideaData, demographicData });
      } catch (err) {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [id]);

  if (loading)
    return (
      <div class="flex justify-center items-center gap-2 min-h-screen max-w-screen bg-radial-[at_50%_75%] from-sky-200 via-blue-100 to-white to-90%">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!idea) return <p className="p-6">Idea not found.</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-slate-100 text-[#333] font-sans">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Idea Analysis
              </h1>
              <p className="text-gray-600 text-xs">
                Visualize demographic engagement
              </p>
            </div>
          </div>
          <Link
            to="/MyIdeas"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <IoIosArrowBack className="text-base" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl my-5 mx-auto">
        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
          {/* Idea Overview */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{idea.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {idea.category}
                </span>
              </div>
            </div>
          </div>

          {/* Demographics Section */}
          <div className="border-t pt-6">
            <h3 className="text-md font-semibold mb-4">
              Demographic Breakdown
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Age Groups */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={idea.demographicData?.ageGroups || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {(idea.demographicData?.ageGroups || []).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-age-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vote */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">Vote</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={idea.demographicData?.vote || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#ffc658"
                        label
                      >
                        {(idea.demographicData?.vote || []).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-vote-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
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
                        data={idea.demographicData?.gender || []}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                      >
                        {(idea.demographicData?.gender || []).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-gender-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
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
                    <BarChart data={idea.demographicData?.countries || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#ffc658"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <h4 className="text-sm font-medium mb-2">City</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={idea.demographicData?.cities || []}
                      margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-30}
                        textAnchor="end"
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#ff7f50"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
