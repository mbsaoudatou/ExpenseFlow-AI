const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("./expenses.db");

// Create table
db.run(`
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
  const { amount, category, vendor, date, notes } = req.body;

  db.run(
    "INSERT INTO expenses (amount, category, vendor, date, notes) VALUES (?, ?, ?, ?, ?)",
    [amount, category, vendor, date, notes],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// Get expenses
app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Delete expense
app.delete("/expenses/:id", (req, res) => {
  db.run("DELETE FROM expenses WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: true });
  });
});
// Update expense
app.put("/expenses/:id", (req, res) => {
  const { amount, category, vendor, date, notes } = req.body;

  db.run(
    `UPDATE expenses 
     SET amount = ?, category = ?, vendor = ?, date = ?, notes = ?
     WHERE id = ?`,
    [amount, category, vendor, date, notes, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ updated: true });
    }
  );
});

// Dashboard
app.get("/dashboard", (req, res) => {
  db.get(
    `
    SELECT 
      SUM(amount) AS totalExpenses,
      COUNT(*) AS totalTransactions
    FROM expenses
    `,
    [],
    (err, row) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        totalExpenses: row.totalExpenses || 0,
        totalTransactions: row.totalTransactions || 0
      });
    }
  );
});
// Category Summary
app.get("/category-summary", (req, res) => {
  db.all(
    "SELECT category, SUM(amount) AS total FROM expenses GROUP BY category",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});
// Monthly Report
app.get("/monthly-report", (req, res) => {
  db.all(
    `
    SELECT 
      strftime('%Y-%m', date) AS month,
      SUM(amount) AS total
    FROM expenses
    GROUP BY month
    ORDER BY month DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});