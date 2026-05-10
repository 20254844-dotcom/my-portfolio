require('dotenv').config(); 
console.log('URI:', process.env.MONGODB_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema, "admin");

app.post("/contact", async (req, res) => {
  try {
    console.log("Contact form data:", req.body); // ← add this
    const msg = await Message.create(req.body);
    console.log("Saved message:", msg); // ← and this
    res.json({ message: "Message sent successfully!", data: msg });
  } catch (err) {
    console.log("Error saving message:", err.message); // ← and this
    res.status(500).json({ error: err.message });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/admin/setup", async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: req.body.username });
    if (existing) {
      return res.json({ message: "Admin already exists" });
    }
    const admin = await Admin.create(req.body);
    res.json({ message: "Admin created!", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt:", username, password);
    const admin = await Admin.findOne({ username, password });
    console.log("Found admin:", admin);

    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", token: admin._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));