import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import API_BASE_URL from "../components/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility to group expenses by category and sum amount
  const groupExpensesByCategory = (expenses) => {
    const grouped = {};
    expenses.forEach(({ category, amount }) => {
      grouped[category] = (grouped[category] || 0) + amount;
    });
    return Object.entries(grouped).map(([category, value]) => ({ category, value }));
  };

  // Utility to group income by month and sum amount
  const groupIncomeByMonth = (incomes) => {
    const grouped = {};
    incomes.forEach(({ date, amount }) => {
      const month = new Date(date).toLocaleString("default", { month: "short" });
      grouped[month] = (grouped[month] || 0) + amount;
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sortedData = Object.entries(grouped)
      .map(([month, income]) => ({ month, income }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    return sortedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [expenseRes, incomeRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/expenses`, { headers }),
          fetch(`${API_BASE_URL}/api/income`, { headers }),
        ]);

        if (!expenseRes.ok || !incomeRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const { expenses } = await expenseRes.json();
        const { incomes } = await incomeRes.json();

        setExpenseData(groupExpensesByCategory(expenses));
        setIncomeData(groupIncomeByMonth(incomes));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIncome = incomeData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="p-6 text-white min-h-screen bg-slate-900 flex justify-center items-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Format currency in INR with commas
  const formatINR = (value) =>
    value.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="p-6 text-white min-h-screen bg-slate-900">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Income Over Time - Line Chart */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Income Over Time</h2>
          {incomeData.length === 0 ? (
            <p className="text-slate-400">No income data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={incomeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis
                  stroke="#ccc"
                  tickFormatter={(value) =>
                    value.toLocaleString("en-IN", { maximumFractionDigits: 0 })
                  }
                />
                <Tooltip
                  formatter={(value) => formatINR(value)}
                  contentStyle={{ backgroundColor: "#333", borderRadius: "8px" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#00C49F"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Expense Breakdown - Pie Chart */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          {expenseData.length === 0 ? (
            <p className="text-slate-400">No expense data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ category, percent }) =>
                    `${category}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatINR(value)}
                  contentStyle={{ backgroundColor: "#333", borderRadius: "8px" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-10 bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-slate-300">
          You earned a total of{" "}
          <span className="font-bold">{formatINR(totalIncome)}</span> over your tracked period and spent{" "}
          <span className="font-bold">{formatINR(totalExpense)}</span> on various categories.
          Keep tracking your expenses and income to manage your finances better!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
