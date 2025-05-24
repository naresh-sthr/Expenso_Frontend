// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
