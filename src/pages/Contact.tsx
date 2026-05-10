import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save message");
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-2">Message Sent!</h1>
          <p className="text-gray-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-blue-400 hover:text-blue-300 text-sm transition"
          >
            Send another message →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-2">Contact Me</h1>
      <p className="text-gray-400 mb-8">Have something to say? I'd love to hear from you.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        <input
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your message..."
          value={form.message}
          onChange={handleChange}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
