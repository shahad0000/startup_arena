import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
   <footer className="bg-[#0B1841] text-white py-6 px-4 mt-1">
  <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-4">
    <p className="text-sm text-gray-300 text-center md:text-left">
      © {new Date().getFullYear()} Startup Arena. All rights reserved.
    </p>

    <p className="text-sm text-gray-300 text-center md:text-right">
      Need help?&nbsp;
      <Link to="/support" className="text-blue-400 hover:underline font-medium">
        Contact Support
      </Link>
    </p>
  </div>
</footer>

  );
}

export default Footer;
