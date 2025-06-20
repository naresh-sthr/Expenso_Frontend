import React, { useState, useEffect } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../components/api";

const Income = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false); // For disabling button while saving

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/income`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch incomes");
      const data = await res.json();
      setIncomes(data.incomes);
    } catch (err) {
      setError(err.message || "Error fetching incomes");
      toast.error(err.message || "Error fetching incomes");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setSource("");
    setAmount("");
    setNote("");
    setDate("");
    setIsModalOpen(true);
    setError("");
  };

  const openEditModal = (inc) => {
    setEditId(inc._id);
    setSource(inc.source);
    setAmount(inc.amount.toString());
    setNote(inc.note || "");
    setDate(inc.date ? inc.date.slice(0, 10) : "");
    setIsModalOpen(true);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/income/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete income");
      toast.success("Income deleted successfully");
      fetchIncomes();
    } catch (err) {
      toast.error(err.message || "Error deleting income");
    }
  };

  const handleSaveIncome = async () => {
    if (!source || !amount) {
      setError("Source and amount are required");
      toast.error("Source and amount are required");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE_URL}/api/income/${editId}`
        : `${API_BASE_URL}/api/income`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          source,
          amount: Number(amount),
          note,
          date: date || new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error(editId ? "Failed to update income" : "Failed to add income");

      toast.success(editId ? "Income updated successfully" : "Income added successfully");

      setSource("");
      setAmount("");
      setNote("");
      setDate("");
      setEditId(null);
      setIsModalOpen(false);

      fetchIncomes();
    } catch (err) {
      setError(err.message || "Error saving income");
      toast.error(err.message || "Error saving income");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 text-white mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">Income</h1>
      <p className="text-slate-300 mb-6">Track and manage your income sources here.</p>

      {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Add Income Card */}
        <div
          onClick={openAddModal}
          className="cursor-pointer border border-dashed border-green-400 rounded-lg p-8 flex items-center justify-center text-green-400 hover:bg-green-900 transition w-80 h-44"
        >
          <Plus className="mr-2" /> Add Income
        </div>

        {/* Loading skeleton cards */}
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg p-6 bg-slate-700/40 backdrop-blur-sm border border-slate-600 animate-pulse w-80 h-44"
            />
          ))}

        {/* Income Cards */}
        {!loading && incomes.length === 0 && (
          <p className="text-slate-400 col-span-full">No income records found.</p>
        )}

        {!loading &&
          incomes.map((inc) => (
            <div
              key={inc._id}
              className="relative border border-slate-600 rounded-lg p-6 flex flex-col justify-between bg-slate-800/70 backdrop-blur-sm shadow-md hover:shadow-lg transition w-80 h-44"
            >
              <div>
                <p className="font-semibold text-white text-lg truncate">{inc.source}</p>
                <p className="text-slate-400 text-sm truncate">{inc.note || "No note"}</p>
                <p className="text-slate-500 text-xs mt-1">
                  {new Date(inc.date).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-green-400 font-bold text-xl">₹{inc.amount.toFixed(2)}</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModal(inc)}
                    title="Edit income"
                    className="p-1 rounded hover:bg-slate-700 transition"
                  >
                    <Edit2 size={20} className="text-green-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(inc._id)}
                    title="Delete income"
                    className="p-1 rounded hover:bg-red-700 transition"
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => !saving && setIsModalOpen(false)} // prevent closing when saving
        >
          <div
            className="relative bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !saving && setIsModalOpen(false)} // prevent closing when saving
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              disabled={saving}
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              {editId ? "Update Income" : "Add New Income"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Source"
                className="p-3 rounded bg-slate-800 text-white"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={saving}
              />
              <input
                type="number"
                placeholder="Amount"
                className="p-3 rounded bg-slate-800 text-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={saving}
              />
              <input
                type="text"
                placeholder="Note (optional)"
                className="p-3 rounded bg-slate-800 text-white"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={saving}
              />
              <input
                type="date"
                className="p-3 rounded bg-slate-800 text-white cursor-pointer"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={saving}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => !saving && setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIncome}
                className={`px-4 py-2 rounded text-white ${
                  saving ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-400"
                }`}
                disabled={saving}
              >
                {saving ? (editId ? "Updating..." : "Adding...") : editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    <ToastContainer/>
    </div>
  );
};

export default Income;
