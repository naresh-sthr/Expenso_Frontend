import React, { useState } from "react";
import { NavLink } from "react-router"; // Correct import
import { Menu, X } from "lucide-react"; // Icons
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block md:inline text-slate-300 hover:text-sky-400 transition ${
      isActive ? "text-sky-400 font-semibold" : ""
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
      <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
      <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
        <button className="w-full md:w-auto bg-sky-400 text-slate-900 hover:bg-sky-300 px-4 py-2 rounded font-semibold mt-2 md:mt-0">
          Sign Up
        </button>
      </NavLink>
      <NavLink to="/login" onClick={() => setMenuOpen(false)}>
        <button className="w-full md:w-auto border border-slate-700 bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded font-semibold mt-2 md:mt-0">
          Login
        </button>
      </NavLink>
    </>
  );

  return (
    <nav className="w-full fixed top-0 z-50 bg-slate-950/90 backdrop-blur-sm py-4 px-6 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h2 className="text-white text-xl font-bold">Expenso</h2>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">{navLinks}</div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pt-4 pb-6 flex flex-col gap-4 bg-slate-950 border-t border-slate-800"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
