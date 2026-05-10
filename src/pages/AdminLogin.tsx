import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      sessionStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");

    } catch (err) {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[88vh]">
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-80">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 transition"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;