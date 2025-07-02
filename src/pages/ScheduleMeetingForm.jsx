import { useState } from "react";
import { scheduleMeeting } from "../services/zoom.service";

export default function ScheduleMeetingForm() {
  const [formData, setFormData] = useState({
    topic: "",
    type: "2",
    start_time: "",
    duration: 30,
    
  });

  const [meetingInfo, setMeetingInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { ...formData };
      if (payload.type === "1") delete payload.start_time;
      payload.userId = "me";

      const meeting = await scheduleMeeting(payload);
      setMeetingInfo(meeting);
    } catch (err) {
      setError("Failed to schedule meeting");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Schedule a Zoom Meeting
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="topic"
          placeholder="Meeting Topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />

        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />

        <input
          type="number"
          name="duration"
          min="15"
          max="240"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Schedule Meeting
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {meetingInfo && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold mb-2">Meeting Created!</h3>
          <p>
            <strong>Topic:</strong> {meetingInfo.topic}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(meetingInfo.start_time).toLocaleString()}
          </p>
          <p>
            <strong>Join URL:</strong>{" "}
            <a
              href={meetingInfo.join_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {meetingInfo.join_url}
            </a>
          </p>
          {/* <p>
            <strong>Start URL (host):</strong>{" "}
            <a
              href={meetingInfo.start_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {meetingInfo.start_url}
            </a>
          </p> */}
        </div>
      )}
    </div>
  );
}
