import React, { useEffect, useRef, useState } from "react"
import { BsGenderMale } from "react-icons/bs"
import { CiLogout } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineGlobe } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import { PiGenderFemale } from "react-icons/pi"
import { TbUpload } from "react-icons/tb";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Shouq Alkanhal");
  const [email, setEmail] = useState("shouq@gmail.com");
  const [gender, setGender] = useState("Female");
  const [country, setCountry] = useState("Saudi Arabia");
  const [city, setCity] = useState("Riyadh");
  const [avatar, setAvatar] = useState(
    "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
  );
  const fileInputRef = useRef();
 useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileData"));
    if (savedData) {
      setName(savedData.name || name);
      setEmail(savedData.email || email);
      setGender(savedData.gender || gender);
      setCountry(savedData.country || country);
      setCity(savedData.city || city);
      setAvatar(savedData.avatar || avatar);
    }
  }, []);

  const handleSave = () => {
    const data = {
      name,
      email,
      gender,
      country,
      city,
      avatar,
    };
    localStorage.setItem("profileData", JSON.stringify(data));
    setIsEditing(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className=" mx-auto bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden p-10 space-y-6 border border-gray-200">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="relative cursor-pointer"
          onClick={() => isEditing && fileInputRef.current.click()}
        >
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-200 shadow-md"
          />
          {isEditing && (
            <div className="absolute bottom-0 right-0 bg-blue-700 p-1.5 rounded-full">
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
      <div className="text-center space-y-1">
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center text-gray-800 border-b-2 border-blue-400 focus:outline-none"
            />
           
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2></>)}
            <p className="text-gray-400 text-sm cursor-not-allowed select-none">{email}</p>
          
        
      </div>

      {/* Details */}
      <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 space-y-2 shadow-inner">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Gender:</span>
      
            <span className="text-gray-800 font-semibold">{gender}</span>
         
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Country:</span>
  
            <span className="text-gray-800 font-semibold">{country}</span>
          
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">City:</span>
     
            <span className="text-gray-800 font-semibold">{city}</span>
        
        </div>
      </div>

      {/* Button */}
      <button
        onClick={toggleEdit}
        className="w-full py-2 mb-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition duration-200 shadow-md"
      >
        {isEditing ? "Save Profile" : "Edit Profile"}
      </button>

      {/* Save Button */}
      <button className="flex gap-1  justify-center w-full py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white  px-4 border border-red-500 hover:border-transparent rounded-full">
        <FiLogOut className="mt-1" /> LogOut
      </button>
    </div>


  )
}

export default UserProfile
