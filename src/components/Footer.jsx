import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-6 mt-auto border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-2">Expenso</h2>
          <p className="text-sm">
            Simplifying personal finance. Track your expenses, visualize your goals, and stay in control.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@expenso.com" className="hover:text-white">naresh.suthar.dev@gmail.com</a></li>
            <li>GitHub: <a href="#" className="hover:text-white">github.com/expenso</a></li>
            <li>Location: Sirohi</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-slate-500 mt-10 border-t border-slate-800 pt-6">
        &copy; {new Date().getFullYear()} Expenso. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
