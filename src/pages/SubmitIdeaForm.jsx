import { useState } from "react";
import { SubmitIdea } from "../public/ExporImage";
import { useNavigate } from "react-router";
import { submitIdea } from "../services/ideas.service";

export default function SubmitIdeaForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mvpLink: "",
    category: "",
    country: "",
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
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        <div className="flex flex-col justify-center items-center p-3 rounded-lg w-250 ">
          <div className="flex flex-col h-25 justify-center items-center">
            <p className="text-2xl font-bold">Draw Your Startup Idea</p>
            <p className="text-sm font-medium text-gray-600">
              Share your innovative idea with our community and get valuable
              feedback from potential investors.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center justify-center  w-full gap-5">
            <div>
              <img src={SubmitIdea} alt="" className=" w-200" />
            </div>
            {/* idea title */}
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Idea Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm h-8 pl-1"
                />
                <span className="text-xs text-gray-600">
                  Enter your idea title
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-sm h-20 p-1"
                  maxLength="1000"
                ></textarea>
                <span className="text-xs text-gray-600">
                  Minimum 1000F characters
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">MVP/Demo Link</label>
                <input
                  name="mvpLink"
                  value={formData.mvpLink}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-400 rounded-sm h-8 pl-1"
                  placeholder="https://your-demo-link.com"
                />
                <span className="text-xs text-gray-600">
                  Optional: Share a link to your prototype or demo
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Industry</label>
                <select
                
                  name="category"
                  value={formData.category}
                  onChange={handleChange}

                className="border border-gray-400 rounded-sm h-8 pl-1">
                  <option value="">------</option>
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className=" font-medium">Country*</label>
                <select 
                
                  name="country"
                  value={formData.country}
                  onChange={handleChange}

                className="border border-gray-400 rounded-sm h-8 pl-1">
                  <option>-----</option>
                  <option>Saudi Arabia</option>
                  <option>Kuwait</option>
                  <option>The United Arab Emirates</option>
                  <option>Qatar</option>
                  <option>Bahrain</option>
                  <option>Oman</option>
                </select>
              </div>
              <div className="py-3">
                <button type="submit" className="font-medium py-2 w-full rounded-sm text-white bg-[#1E40AF]">
                  Submit Idea
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
