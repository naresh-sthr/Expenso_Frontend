import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import axios from "axios";
import API_BASE_URL from "../components/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const Analytics = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const incomeRes = await axios.get(`${API_BASE_URL}/api/income`, { headers });
        const expenseRes = await axios.get(`${API_BASE_URL}/api/expenses`, { headers });

        setIncome(incomeRes.data.incomes);
        setExpenses(expenseRes.data.expenses);
        // console.log(incomeRes,expenseRes)
      } catch (err) {
        console.error("Failed to load analytics data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Loading analytics...</p>;

  // Total calculations
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Pie chart data
  const categoryData = Object.values(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = { name: curr.category, value: 0 };
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  // Monthly data
  const monthlyData = {};

  [...income, ...expenses].forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", { month: "short", year: "numeric" });
    if (!monthlyData[month]) monthlyData[month] = { month, income: 0, expenses: 0 };
    if (item.type === "income") monthlyData[month].income += item.amount;
    else monthlyData[month].expenses += item.amount;
  });

  const monthlyChartData = Object.values(monthlyData).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Analytics</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl font-bold text-green-400">₹ {totalIncome}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-400">₹ {totalExpenses}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-300" : "text-red-300"}`}>
            ₹ {balance}
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-slate-800 p-4 rounded-lg mb-10">
        <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Monthly Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expenses" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
