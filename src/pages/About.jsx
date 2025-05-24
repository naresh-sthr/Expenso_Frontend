import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4"
        >
          About <span className="text-sky-400">Expenso</span>
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-slate-400 text-center mb-10"
        >
          Expenso is a modern personal finance manager designed to help you track your expenses and income with ease. Whether you're budgeting monthly bills, keeping an eye on your daily spendings, or visualizing financial trends, Expenso gives you the tools you need.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-8">
          {[
            {
              title: "📊 Interactive Dashboard",
              desc: "Get a clear overview of your finances with charts, graphs, and summary insights updated in real time.",
            },
            {
              title: "💸 Expense Tracking",
              desc: "Log your daily expenses, categorize them, and understand your spending habits.",
            },
            {
              title: "💰 Income Management",
              desc: "Keep track of your income sources and calculate monthly surpluses or shortfalls.",
            },
            {
              title: "🔐 Data Privacy First",
              desc: "Built with secure MERN stack principles — your data stays yours, encrypted and safe.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-sky-400 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 1.2 }}
          className="text-center mt-14"
        >
          <h2 className="text-xl font-semibold text-white mb-3">
            Built with ❤️ using the MERN Stack
          </h2>
          <p className="text-slate-400 text-sm">
            MongoDB, Express, React, Node.js — delivering performance, scalability, and great UX.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
