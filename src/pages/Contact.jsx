import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-slate-400 text-center mb-10"
        >
          Have questions, suggestions, or feedback? Fill out the form below and we’ll get back to you soon.
        </motion.p>

        <motion.form
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-slate-800 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">Message</label>
            <textarea
              rows="5"
              className="w-full px-4 py-2 rounded bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-sky-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-300 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
