import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import axios from "axios";
import { useContext } from "react";
import API_BASE_URL from "./api";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log(form);
    try {
      const res = await axios.post(`${API_BASE_URL}/user/register`, form);
      console.log(res);
      // Dynamically choose toast type
      if (res.request.status == 201) {
        toast.success(res.data.message || "Success");
        setForm({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else if (res.request.status == 400) {
        toast.info(res.data.message);
      } else if (res.request.status == 409) {
        toast.error(res.data.message);
      } else {
        toast.warn(res.data.message || "Something unexpected happened");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast.error(message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 pt-28 pb-16">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-slate-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700"
      >
        <ToastContainer />
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Your <span className="text-sky-400">Expenso</span> Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="bg-slate-800 text-white p-3 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
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
            className="mt-4 bg-sky-400 hover:bg-sky-300 text-slate-900 font-semibold py-3 rounded-md transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-slate-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
