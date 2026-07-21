import React, { useState, useEffect } from "react";

function Accounting() {

 const [page, setPage] = useState("dashboard");
const [showJournalForm, setShowJournalForm] = useState(false);
const [journalEntries, setJournalEntries] = useState(() => {
  const saved = localStorage.getItem("journalEntries");
  return saved ? JSON.parse(saved) : [];
});

const totalDebit = journalEntries.reduce(
  (sum, item) => sum + Number(item.debitAmount),
  0
);

const totalCredit = journalEntries.reduce(
  (sum, item) => sum + Number(item.creditAmount),
  0
);
useEffect(() => {
  localStorage.setItem(
    "journalEntries",
    JSON.stringify(journalEntries)
  );
}, [journalEntries]);

const [entry, setEntry] = useState({
  date: "",
  debitAccount: "",
  debitDescription: "",
  debitAmount: "",
  creditAccount: "",
  creditDescription: "",
  creditAmount: "",
});

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "220px",
          background: "white",
          padding: "20px",
        }}
      >
        <h3>Accounting</h3>

     <p
  onClick={() => setPage("dashboard")}
  style={{ cursor: "pointer" }}
>
  📊 Dashboard
</p>
        <p onClick={() => setPage("accounts")} style={{ cursor: "pointer" }}>
  📒 Chart of Accounts
</p>
       <p onClick={() => setPage("journal")} style={{ cursor: "pointer" }}>
  📖 General Journal
</p>
      <p onClick={() => setPage("ledger")} style={{ cursor: "pointer" }}>
  📚 General Ledger
</p>
       <p onClick={() => setPage("trial")} style={{ cursor: "pointer" }}>
  ⚖️ Trial Balance
</p>
      <p onClick={() => setPage("profit")} style={{ cursor: "pointer" }}>
  📈 Profit & Loss
</p>
      <p onClick={() => setPage("balance")} style={{ cursor: "pointer" }}>
  🏦 Balance Sheet
</p>

      </div>


      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

      <h1 style={{ color: "#1a237e" }}>
  {page === "dashboard" && "Accounting Dashboard 🚀"}
  {page === "accounts" && "Chart of Accounts 📒"}
  {page === "journal" && "General Journal 📖"}
  {page === "ledger" && "General Ledger 📚"}
  {page === "trial" && "Trial Balance ⚖️"}
  {page === "profit" && "Profit & Loss 📈"}
  {page === "balance" && "Balance Sheet 🏦"}
</h1>

        <p>
          Professional double-entry accounting
        </p>


       {page === "accounts" && (
  <h2>
    Chart of Accounts
  </h2>
)}

{page === "accounts" && (

        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
          }}
        >

          <thead>
            <tr>
              <th>Account Name</th>
              <th>Type</th>
              <th>Balance</th>
            </tr>
          </thead>


          <tbody>

            <tr>
              <td>Cash</td>
              <td>Asset</td>
              <td>$0</td>
            </tr>

            <tr>
              <td>Bank Account</td>
              <td>Asset</td>
              <td>$0</td>
            </tr>

            <tr>
              <td>Sales Revenue</td>
              <td>Revenue</td>
              <td>$0</td>
            </tr>

            <tr>
              <td>Expense</td>
              <td>Expense</td>
              <td>$0</td>
            </tr>

          </tbody>

        </table>

)}
      {page === "journal" && (
  <h2 style={{ marginTop: "40px" }}>
    General Journal
  </h2>
)}


{page === "journal" && (
  <button
    onClick={() => setShowJournalForm(true)}
    style={{
      padding: "10px 20px",
      background: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "8px",
    }}
  >
    + Add Journal Entry
  </button>
)}

{page === "journal" && (
  <table
  style={{
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
  }}
>

    <thead>
      <tr>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Line</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Date</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Account</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Description</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Debit</th>
<th style={{ border: "1px solid #ddd", padding: "10px" }}>Credit</th>
      </tr>
    </thead>

<tbody>
  {journalEntries.map((item, index) => (
    <React.Fragment key={index}>
      <tr>
        <td>{index + 1}</td>
        <td>{item.date}</td>
        <td>{item.debitAccount}</td>
        <td>{item.debitDescription}</td>
        <td>${item.debitAmount}</td>
        <td></td>
      </tr>

      <tr>
        <td>{index + 1}.1</td>
        <td>{item.date}</td>
        <td>{item.creditAccount}</td>
        <td>{item.creditDescription}</td>
        <td></td>
        <td>${item.creditAmount}</td>
      </tr>
    </React.Fragment>
  ))}
</tbody>
 </table>
)}

{page === "journal" && (
  <div
    style={{
      marginTop: "20px",
      background: "white",
      padding: "15px",
      borderRadius: "8px",
      width: "300px",
    }}
  >
    <h3>Journal Totals</h3>

    <p>Total Debit: ${totalDebit}</p>

    <p>Total Credit: ${totalCredit}</p>

    <p>
      Balance: {totalDebit === totalCredit ? "✅ Balanced" : "❌ Not Balanced"}
    </p>
  </div>
)}

{showJournalForm && (
  <div
    style={{
      marginTop: "20px",
      background: "white",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <h3>
      New Journal Entry
    </h3>

  <input
  type="date"
  value={entry.date}
  onChange={(e) =>
    setEntry({ ...entry, date: e.target.value })
  }
/>
<br />

<h4>Debit</h4>

<input
  type="text"
  placeholder="Debit Account"
  value={entry.debitAccount}
  onChange={(e) =>
    setEntry({ ...entry, debitAccount: e.target.value })
  }
/>
<br />

<input
  type="text"
  placeholder="Debit Description"
  value={entry.debitDescription}
  onChange={(e) =>
    setEntry({ ...entry, debitDescription: e.target.value })
  }
/>

<br />

<input
  type="number"
  placeholder="Debit Amount"
  value={entry.debitAmount}
  onChange={(e) =>
    setEntry({ ...entry, debitAmount: e.target.value })
  }
/>

<br />
<br />

<h4>Credit</h4>

<input
  type="text"
  placeholder="Credit Account"
  value={entry.creditAccount}
  onChange={(e) =>
    setEntry({ ...entry, creditAccount: e.target.value })
  }
/>
<br />

<input
  type="text"
  placeholder="Credit Description"
  value={entry.creditDescription}
  onChange={(e) =>
    setEntry({ ...entry, creditDescription: e.target.value })
  }
/>
<br />

<input
  type="number"
  placeholder="Credit Amount"
  value={entry.creditAmount}
  onChange={(e) =>
    setEntry({ ...entry, creditAmount: e.target.value })
  }
/>


<br />


<button
  onClick={() => {

  if (
  !entry.debitAccount ||
  !entry.creditAccount ||
  !entry.debitAmount ||
  !entry.creditAmount
) {
  alert("Please complete Debit and Credit");
  return;
}

if (entry.debitAmount !== entry.creditAmount) {
  alert("Debit must equal Credit");
  return;
}

setJournalEntries([...journalEntries, entry]);

setEntry({
  date: "",
  debitAccount: "",
  debitDescription: "",
  debitAmount: "",
  creditAccount: "",
  creditDescription: "",
  creditAmount: "",
});
  }}
  style={{

    marginTop: "15px",
    padding: "10px 20px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "8px",
  }}
>
  Save Entry
</button>

  </div>
)}

      </div>

    </div>
  );
}



export default Accounting;