import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../components/api";

const Account = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token");

        const res = await axios.get(`${API_BASE_URL}/api/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming res.data has username and email; don't fetch password for security
        setUser({ username: res.data.username, email: res.data.email, password: "" });
      } catch (error) {
        console.error("Error fetching user:", error);
        setMessage({ type: "error", text: "Failed to load user data" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      const updateData = {
        username: user.username,
        email: user.email,
      };

      if (user.password.trim()) {
        updateData.password = user.password;
      }

      await axios.put(`${API_BASE_URL}/api/account`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage({ type: "success", text: "Profile updated successfully" });
      setUser((prev) => ({ ...prev, password: "" })); // clear password field
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || "Failed to update profile";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading your profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-lg text-white">
      <h1 className="text-2xl mb-6 font-bold">Your Account</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
          />
        </div>

        <div>
          <label className="block mb-1">New Password (leave blank to keep unchanged)</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Account;
