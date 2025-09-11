// Import packages
const express = require("express");
const mysql = require("mysql2");

// App setup
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL connection (XAMPP)
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // XAMPP default
  password: "", // by default empty hota hai
  database: "userdb",
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

// -------------------------------
// CRUD Routes (sab yahan hi rahenge)
// -------------------------------

// 1. Get all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users WHERE 1";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2. Get specific fields
app.get("/users/fields", (req, res) => {
  const sql = "SELECT id, name, email, age FROM users WHERE 1";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. Get user by ID ✅ (missing route added)
app.get("/users/:id", (req, res) => {
  const sql = "SELECT id, name, email, age FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

// 4. Insert new user
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(400).json({ error: "name, email, age required" });

  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, email, age });
  });
});

// 5. Update user
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age)
    return res.status(400).json({ error: "name, email, age required" });

  const sql = "UPDATE users SET name=?, email=?, age=? WHERE id=?";
  db.query(sql, [name, email, age, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ id: Number(req.params.id), name, email, age });
  });
});

// 6. Delete user
app.delete("/users/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});

// -------------------------------
// Start server
// -------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
