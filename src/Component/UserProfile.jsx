import React, { useEffect, useRef, useState } from "react";
import { FiLogOut, FiEdit, FiSave } from "react-icons/fi";
import { TbUpload } from "react-icons/tb";
import {
  getCurrentUser,
  logOut,
  updateProfile,
} from "../services/auth.service";
import { useNavigate } from "react-router";

function UserProfile({ onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
  );
  const fileInputRef = useRef();
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        setName(data.name || name);
        setEmail(data.email || email);
        setGender(data.gender || gender);
        setCountry(data.country || country);
        setCity(data.city || city);
        setAvatar(data.profilePic || avatar);
        setRole(data.role || role);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    const data = {
      name,
      email,
      gender,
      role,
      country,
      city,
      avatar,
    };
    try {
      const updated = await updateProfile(avatar);
      if (updated?.profilePic) {
        setAvatar(updated.profilePic);
      }
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("profileData");
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const gccCountries = [
    "Saudi Arabia",
    "Kuwait",
    "The United Arab Emirates",
    "Qatar",
    "Bahrain",
    "Oman",
  ];

  return (
    <div className="mx-auto bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden p-5 space-y-6 border border-gray-200  w-100">
      <div className="bg-[#1E40AF] py-5 flex flex-col gap-3 rounded-t-3xl shadow-b shadow-2xl">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-2 ">
          <div
            className="relative cursor-pointer"
            onClick={() => isEditing && fileInputRef.current.click()}
          >
            <img
              src={avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-[#1E40AF] shadow-md"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-[#1E40AF] p-1.5 rounded-full">
                <TbUpload className="text-white" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center space-y-1 bg-[#1E40AF] text-white">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center  border p-1 border-white focus:outline-none bg-transparent w-fit rounded-md"
              placeholder="Your name"
            />
          ) : (
            <h2 className="text-xl font-bold text-center p-1  focus:outline-none">
              {name}
            </h2>
          )}
          <p className=" text-sm cursor-not-allowed select-none">{email}</p>
        </div>
      </div>

      {/* Details */}
      <div className=" rounded-xl px-4 py-3 text-sm text-gray-700 space-y-3">
        {/* Gender Field */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Gender:</label>
          {isEditing ? (
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-800 w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="border border-gray-400  p-2 rounded-md text-gray-800 font-medium">
              {gender || "Not specified"}
            </span>
          )}
        </div>

        {/* Country Field */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Country:</label>
          {isEditing ? (
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-800 w-full"
            >
              <option value="">Select country</option>
              {gccCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-gray-800 border border-gray-400 rounded-md font-medium p-2">
              {country || "Not specified"}
            </span>
          )}
        </div>

        {/* City Field */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">City:</label>
          {isEditing ? (
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-800 w-full"
              placeholder="Enter your city"
            />
          ) : (
            <span className="text-gray-800 border border-gray-400 rounded-md font-medium p-2">
              {city || "Not specified"}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className={`w-full py-3 text-white font-semibold rounded-full transition duration-200 shadow-md flex items-center justify-center gap-2 ${
            isEditing
              ? "bg-[#1E40AF] hover:bg-[#1E40AF]"
              : "bg-[#1E40AF] hover:bg-[#1E40AF]"
          }`}
        >
          {isEditing ? <FiSave size={18} /> : <FiEdit size={18} />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>

        <button
          onClick={handleLogout}
          className="flex gap-2 justify-center items-center w-full py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded-full"
        >
          <FiLogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
