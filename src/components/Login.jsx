import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router"; // ✅ FIXED
import API_BASE_URL from "./api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router"; // ✅ FIXED
import "react-toastify/dist/ReactToastify.css";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, form);
      if (res.status === 200) {
        toast.success(res.data.message || "Login successful");
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500); // short delay to show toast
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 pt-28 pb-16">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700"
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login to <span className="text-sky-400">Expenso</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="bg-slate-800 text-white p-3 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-slate-800 text-white p-3 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-sky-400 hover:bg-sky-300 text-slate-900 font-semibold py-3 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="text-slate-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
