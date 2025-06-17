import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Plus, Smile, X, Edit2, Trash2 } from "lucide-react";
import API_BASE_URL from "../components/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [emoji, setEmoji] = useState("");
  const [editId, setEditId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      setExpenses(data.expenses);
    } catch (err) {
      setError(err.message || "Error fetching expenses");
      toast.error(err.message || "Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const openAddModal = () => {
    setEditId(null);
    setCategory("");
    setAmount("");
    setNote("");
    setDate("");
    setEmoji("");
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditId(exp._id);
    setCategory(exp.category);
    setAmount(exp.amount.toString());
    setNote(exp.note || "");
    setDate(exp.date ? exp.date.slice(0, 10) : "");
    setEmoji(exp.emoji || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      toast.success("Expense deleted successfully");
      fetchExpenses();
    } catch (err) {
      toast.error(err.message || "Error deleting expense");
    }
  };

  const handleSaveExpense = async () => {
    if (!category || !amount) {
      setError("Category and amount are required");
      toast.error("Category and amount are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE_URL}/api/expenses/${editId}`
        : `${API_BASE_URL}/api/expenses`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category,
          amount: Number(amount),
          note,
          date: date || new Date().toISOString(),
          emoji,
        }),
      });

      if (!res.ok) throw new Error(editId ? "Failed to update expense" : "Failed to add expense");

      toast.success(editId ? "Expense updated!" : "Expense added!");
      setCategory("");
      setAmount("");
      setNote("");
      setDate("");
      setEmoji("");
      setEditId(null);
      setIsModalOpen(false);

      fetchExpenses();
    } catch (err) {
      toast.error(err.message || "Error saving expense");
    }
  };

  return (
    <div className="p-6 text-white">
      <ToastContainer position="top-right" />
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>
      <p className="text-slate-300 mb-6">Track your expenses here.</p>

      {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl">
        <div
          onClick={openAddModal}
          className="cursor-pointer border border-dashed border-sky-400 rounded-lg p-8 flex items-center justify-center text-sky-400 hover:bg-sky-900 transition w-64 h-40"
        >
          <Plus className="mr-2" /> Add Expense
        </div>

        {loading ? (
          <div className="flex justify-center items-center col-span-full h-60">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : expenses.length === 0 ? (
          <p className="text-slate-400 col-span-full">No expenses found.</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp._id}
              className="relative border border-slate-600 rounded-lg p-6 flex flex-col justify-between bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{exp.emoji || "💸"}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">{exp.category}</p>
                  <p className="text-slate-400 text-sm truncate">{exp.note || "No note"}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {new Date(exp.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-green-400 font-bold text-xl">₹{exp.amount.toFixed(2)}</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-1 rounded hover:bg-slate-700 transition"
                  >
                    <Edit2 size={20} className="text-sky-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-1 rounded hover:bg-red-700 transition"
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div
            className="relative bg-slate-900 rounded-xl p-6 w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              {editId ? "Update Expense" : "Add New Expense"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-800 text-white p-2 rounded border border-slate-600"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-800 text-white p-2 rounded border border-slate-600"
              />
              <input
                type="text"
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-slate-800 text-white p-2 rounded border border-slate-600"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-slate-800 text-white p-2 rounded border border-slate-600"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-1 px-3 py-2 bg-slate-700 rounded text-white hover:bg-slate-600"
                >
                  <Smile size={16} />
                  {emoji || "Pick Emoji"}
                </button>
              </div>

              {showEmojiPicker && (
                <div className="z-50 mt-2">
                  <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
              )}

              <button
                onClick={handleSaveExpense}
                className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
              >
                {editId ? "Update" : "Add"} Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
