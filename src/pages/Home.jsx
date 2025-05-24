import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px]">
          <div></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-bold mb-4"
        >
          Take Control of Your <span className="text-sky-400">Finances</span>
        </motion.h1>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-slate-300 max-w-2xl mx-auto text-lg"
        >
          Expenso is your personal finance dashboard — track expenses, income,
          and view beautiful graphs to understand where your money goes.
        </motion.p>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link to="/dashboard">
            <button className="bg-sky-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-300">
              Get Started
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-lg text-white hover:bg-slate-700">
              Learn More
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "💸 Expense Tracker",
            desc: "Categorize and monitor where your money goes daily, weekly, or monthly.",
          },
          {
            title: "💰 Income Manager",
            desc: "Log your income sources and maintain a clear view of your total earnings.",
          },
          {
            title: "📊 Dashboard & Graphs",
            desc: "Visualize data with dynamic charts to understand your financial trends.",
          },
          {
            title: "🔔 Smart Alerts",
            desc: "Set custom spending limits and get notified when you’re nearing them.",
          },
          {
            title: "🔐 Secure & Private",
            desc: "Your data is encrypted and protected using modern MERN best practices.",
          },
          {
            title: "📱 Mobile Friendly",
            desc: "Use Expenso easily on any device — from mobile to desktop.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700
                       hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <h3 className="text-lg font-semibold text-sky-400 mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="relative z-10 text-center py-16 px-6">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to track your spending like a pro?
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.2 }}
          className="text-slate-400 mb-6"
        >
          Create an account and start taking control of your financial future
          today.
        </motion.p>
        <Link to="/signup">
          <button className="bg-sky-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-sky-300">
            Sign Up Free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
