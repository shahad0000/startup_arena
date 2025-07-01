import React from "react";
import { FaChevronDown } from "react-icons/fa";
function Nav() {
  return (
    <div className="h-15 bg-white border-b">
      <nav className="flex justify-between items-center h-full">
        <div className="w-70 flex justify-center items-center">
          <p className="text-2xl font-bold">Startup Arena Logo</p>
          {/* <img src="" alt="" /> */}
        </div>
        <ul className="flex justify-center items-center gap-10">
          <li>Home</li>
          <li>Explore</li>
          <li>Dashboard</li>
          <li>Watch Meetings</li>
        </ul>
        <div className="w-70 flex justify-center items-center gap-3">
          <div className="py-1 px-3 bg-blue-950/70 text-white rounded-full">
            <p>A</p>
          </div>
          <FaChevronDown />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
