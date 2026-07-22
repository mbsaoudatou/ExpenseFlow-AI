import { useEffect, useState } from "react";
import Home from "./Home";
import Accounting from "./Accounting";
function App() {
  const [totalExpenses, setTotalExpenses] = useState(0);
const [totalTransactions, setTotalTransactions] = useState(0);
const [mode, setMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [expenses, setExpenses] = useState([]);
const [search, setSearch] = useState("");
const [sortOption, setSortOption] = useState("");
const [searchVendor, setSearchVendor] = useState("");
const [searchCategory, setSearchCategory] = useState("");
const [searchAmount, setSearchAmount] = useState("");
const [searchDate, setSearchDate] = useState("");
const [categorySummary, setCategorySummary] = useState([]);
const [monthlyReport, setMonthlyReport] = useState([]);
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [vendor, setVendor] = useState("");
const [date, setDate] = useState("");
const [notes, setNotes] = useState("");
const [editingId, setEditingId] = useState(null);

function loadDashboard() {
  fetch("https://expenseflow-ai.onrender.com/dashboard")
    .then((res) => res.json())
    .then((data) => {
      setTotalExpenses(data.totalExpenses);
      setTotalTransactions(data.totalTransactions);
    })
    .catch((err) => console.log(err));
}

function loadCategorySummary() {
fetch("https://expenseflow-ai.onrender.com/category-summary")
    .then((res) => res.json())
    .then((data) => {
      setCategorySummary(data);
    })
    .catch((err) => console.log(err));
}
function loadMonthlyReport() {
 fetch("https://expenseflow-ai.onrender.com/monthly-report")
    .then((res) => res.json())
    .then((data) => {
      setMonthlyReport(data);
    })
    .catch((err) => console.log(err));
}

function loadExpenses() {
 fetch("https://expenseflow-ai.onrender.com/expenses")
    .then((res) => res.json())
    .then((data) => {
      setExpenses(data);
    })
    .catch((err) => console.log(err));
}

function deleteExpense(id) {
  fetch(`https://expenseflow-ai.onrender.com/expenses/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      loadExpenses();
      loadDashboard();
loadCategorySummary();
loadMonthlyReport();

    })
    .catch((err) => console.log(err));
}
function exportCSV() {
  const headers = [
    "Date",
    "Vendor",
    "Category",
    "Amount",
    "Notes"
  ];

  const rows = expenses.map((expense) => [
    expense.date,
    expense.vendor,
    expense.category,
    expense.amount,
    expense.notes
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ExpenseFlow_Expenses.csv";

  link.click();

  URL.revokeObjectURL(url);
}
function editExpense(expense) {
  setEditingId(expense.id);
  setAmount(expense.amount);
  setCategory(expense.category);
  setVendor(expense.vendor);
  setDate(expense.date);
  setNotes(expense.notes);

  setShowModal(true);
}

function saveExpense() {

  const expenseData = {
    amount,
    category,
    vendor,
    date,
    notes,
  };


  if (editingId) {

    fetch(`https://expenseflow-ai.onrender.com/expenses/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((res) => res.json())
  .then(() => {
  loadExpenses();
  loadDashboard();
  loadCategorySummary();
  loadMonthlyReport();

  setShowModal(false);
  setEditingId(null);
})
      .catch((err) => console.log(err));


  } else {

    fetch("https://expenseflow-ai.onrender.com/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })
      .then((res) => res.json())
      .then(() => {
        loadExpenses();
        loadDashboard();
  loadCategorySummary();
  loadMonthlyReport();

        setShowModal(false);
      })
      .catch((err) => console.log(err));

  }

}


function loadDashboard() {
 fetch("https://expenseflow-ai.onrender.com/dashboard")
    .then((res) => res.json())
    .then((data) => {
      setTotalExpenses(data.totalExpenses);
    })
    .catch((err) => console.log(err));
}
useEffect(() => {
  loadDashboard();
  loadExpenses();
  loadCategorySummary();
  loadMonthlyReport();
}, []);

if (mode === null) {
  return <Home setMode={setMode} />;
}
if (mode === "accounting") {
  return <Accounting />;
}

return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1a237e" }}>
        ExpenseFlow AI 🚀
      </h1>

      <p style={{ color: "#555" }}>
        Smart financial management for your business
      </p>

<button
  onClick={exportCSV}
  style={{
    marginTop: "20px",
    padding: "10px 20px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Export Expenses CSV
</button>
      <div
        style={{
          marginTop: "30px",
          width: "300px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Total Expenses</h3>

        <h1 style={{ color: "#1976d2" }}>
          ${totalExpenses.toLocaleString()}
        </h1>
      </div>

<p style={{ color: "#555" }}>
  Test: {totalTransactions}
</p>

<h2 style={{ marginTop: "30px" }}>
  Category Summary
</h2>

<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
  {categorySummary.map((item) => (
    <div
      key={item.category}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "180px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{item.category}</h3>

      <p>
        ${item.total.toLocaleString()}
      </p>
    </div>
  ))}
</div>


<h2 style={{ marginTop: "30px" }}>
  Monthly Report
</h2>

<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
  {monthlyReport.map((item) => (
    <div
      key={item.month}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "180px",
        boxShadow: "0 3vpx 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{item.month}</h3>

      <p>
        ${item.total.toLocaleString()}
      </p>
    </div>
  ))}
</div>

<h2 style={{ marginTop: "40px" }}>
  Expenses
</h2>
<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
<select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
  style={{ padding: "8px" }}
>
  <option value="">Sort By</option>
  <option value="newest">Newest Date</option>
  <option value="oldest">Oldest Date</option>
  <option value="high">Highest Amount</option>
  <option value="low">Lowest Amount</option>
</select>
  <input
    placeholder="Search Date"
    value={searchDate}
    onChange={(e) => setSearchDate(e.target.value)}
    style={{ padding: "8px" }}
  />

  <input
    placeholder="Search Vendor"
    value={searchVendor}
    onChange={(e) => setSearchVendor(e.target.value)}
    style={{ padding: "8px" }}
  />

  <input
    placeholder="Search Category"
    value={searchCategory}
    onChange={(e) => setSearchCategory(e.target.value)}
    style={{ padding: "8px" }}
  />

  <input
    placeholder="Search Amount"
    value={searchAmount}
    onChange={(e) => setSearchAmount(e.target.value)}
    style={{ padding: "8px" }}
  />

</div>
<input
  type="text"
  placeholder="Search expenses..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "300px",
    padding: "10px",
    marginBottom: "20px",
  }}
/>
<table
  style={{
    width: "100%",
    background: "White",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead>
    <tr>
    <th style={{ border: "1px solid #ddd", padding: "10px" }}>Date</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Vendor</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Category</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Amount</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Notes</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Action</th>
    </tr>
  </thead>

<tbody>
{expenses
  .filter((expense) =>
    expense.date.toLowerCase().includes(searchDate.toLowerCase()) &&
    expense.vendor.toLowerCase().includes(searchVendor.toLowerCase()) &&
    expense.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
    expense.amount.toString().includes(searchAmount)
  )
  .sort((a, b) => {
    if (sortOption === "high") {
      return b.amount - a.amount;
    }

    if (sortOption === "low") {
      return a.amount - b.amount;
    }

    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    return 0;
  })
  .map((expense) => (
    <tr key={expense.id}>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {expense.date}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {expense.vendor || "N/A"}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {expense.category}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        ${expense.amount.toLocaleString()}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
        {expense.notes}
      </td>

      <td style={{ border: "1px solid #ddd", padding: "10px" }}>

        <button onClick={() => editExpense(expense)}>
          Edit
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>

      </td>

    </tr>
  ))}
</tbody>
</table>

 <button
  onClick={() => {
    setEditingId(null);
    setAmount("");
    setCategory("");
    setVendor("");
    setDate("");
    setNotes("");
    setShowModal(true);
  }}
  style={{
    marginTop: "30px",
    padding: "12px 25px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  
  + Add Expense
</button>

{showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "350px",
      }}
    >
      <h2>Add Expense</h2>

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

<input
  placeholder="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{ width: "100%", marginBottom: "10px" }}
/>

<input
  placeholder="Vendor"
  value={vendor}
  onChange={(e) => setVendor(e.target.value)}
  style={{ width: "100%", marginBottom: "10px" }}
/>

<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  style={{ width: "100%", marginBottom: "10px" }}
/>

<textarea
  placeholder="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  style={{ width: "100%", marginBottom: "10px" }}
/>

<button onClick={saveExpense}>
  {editingId ? "Save Changes" : "Save Expense"}
</button>
            
            

            <button
              onClick={() => setShowModal(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default App;