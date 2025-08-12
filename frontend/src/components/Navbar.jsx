import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo / Title */}
      <Link to="/">
        <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          RESUMUP
        </p>
      </Link>

      {/* Upload Button */}
      <Link
        to="/upload"
        className="primary-button w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Upload
      </Link>
    </nav>
  );
}