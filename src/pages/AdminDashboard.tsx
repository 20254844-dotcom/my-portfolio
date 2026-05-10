import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("http://localhost:5000/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id: string) {
    const confirm = window.confirm("Delete this message?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:5000/messages/${id}`, { method: "DELETE" });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (err) {
      alert("Failed to delete message.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[88vh]">
        <p className="text-gray-400">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[88vh]">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">{messages.length} message{messages.length !== 1 ? "s" : ""} received</p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No messages yet.</div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{msg.name}</p>
                  <p className="text-blue-400 text-sm">{msg.email}</p>
                </div>
                <p className="text-gray-500 text-xs">{new Date(msg.date).toLocaleString()}</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{msg.message}</p>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-red-400 hover:text-red-300 text-sm transition"
              >
                Delete →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;