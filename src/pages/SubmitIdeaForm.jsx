import { useState } from "react";
import { useNavigate } from "react-router";
import { submitIdea } from "../services/ideas.service";

export default function SubmitIdeaForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mvpLink: "",
    category: "",
    targetMarket: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await submitIdea(formData);
      navigate("/MyIdeas");
    } catch (err) {
      console.error("Failed to submit idea", err);
      setError("Failed to submit idea");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-8 bg-gray-50">
      <div className="w-full max-w-5xl p-6 ">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-3xl md:text-4xl font-bold mb-3">
            Draw Your Startup Idea
          </p>
          <p className="text-sm md:text-base font-medium text-gray-500">
            Share your innovative idea with our community and get valuable
            feedback from potential investors.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Submit Your Idea</h2>

          {/* Row 1: Idea Title + MVP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-sm mb-1">
                Idea Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter your idea title"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">
                MVP/Demo Link
              </label>
              <input
                type="text"
                name="mvpLink"
                value={formData.mvpLink}
                onChange={handleChange}
                placeholder="https://your-demo-link.com"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Category + Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-sm mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Industry --</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Fitness">Fitness</option>
                <option value="Agriculture">Agriculture</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Environment">Environment</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Social Impact">Social Impact</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Gaming">Gaming</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistics</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">
                Target Market <span className="text-red-500">*</span>
              </label>
              <select
                name="targetMarket"  
                value={formData.targetMarket}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a country...</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="Kuwait">Kuwait</option>
                <option value="Qatar">Qatar</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Oman">Oman</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="block font-semibold text-sm mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Minimum 1000 characters"
              minLength={800}
              maxLength={2500}
              required
              rows={6}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full md:w-auto bg-[#1E40AF] text-white font-medium py-2 px-6 rounded hover:bg-blue-800"
            >
              Submit Idea
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
