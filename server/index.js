const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();

app.use(cors());
app.use(express.json());

// Database
const db = new Database("./expenses.db");

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    category TEXT,
    vendor TEXT,
    date TEXT,
    notes TEXT
  )
`);

// Add expense
app.post("/expenses", (req, res) => {
  try {
    const { amount, category, vendor, date, notes } = req.body;

    const stmt = db.prepare(
      "INSERT INTO expenses (amount, category, vendor, date, notes) VALUES (?, ?, ?, ?, ?)"
    );

    const result = stmt.run(
      amount,
      category,
      vendor,
      date,
      notes
    );

    res.json({ id: result.lastInsertRowid });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get expenses
app.get("/expenses", (req, res) => {
  try {
    const rows = db
      .prepare("SELECT * FROM expenses ORDER BY date DESC")
      .all();

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete expense
app.delete("/expenses/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM expenses WHERE id = ?")
      .run(req.params.id);

    res.json({ deleted: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Update expense
app.put("/expenses/:id", (req, res) => {
  try {
    const { amount, category, vendor, date, notes } = req.body;

    db.prepare(`
      UPDATE expenses
      SET amount = ?, category = ?, vendor = ?, date = ?, notes = ?
      WHERE id = ?
    `).run(
      amount,
      category,
      vendor,
      date,
      notes,
      req.params.id
    );

    res.json({ updated: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard
app.get("/dashboard", (req, res) => {
  try {
    const row = db.prepare(`
      SELECT
        SUM(amount) AS totalExpenses,
        COUNT(*) AS totalTransactions
      FROM expenses
    `).get();

    res.json({
      totalExpenses: row.totalExpenses || 0,
      totalTransactions: row.totalTransactions || 0
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Category Summary
app.get("/category-summary", (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT category, SUM(amount) AS total
      FROM expenses
      GROUP BY category
    `).all();

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Monthly Report
app.get("/monthly-report", (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT
        strftime('%Y-%m', date) AS month,
        SUM(amount) AS total
      FROM expenses
      GROUP BY month
      ORDER BY month DESC
    `).all();

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});