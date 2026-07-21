import React from "react";

function Accounting() {
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
        ExpenseFlow AI - Accounting System 🚀
      </h1>

      <p style={{ color: "#555" }}>
        Professional double-entry accounting
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "220px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Assets</h3>
          <h2>$0</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "220px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Revenue</h3>
          <h2>$0</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "220px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Expenses</h3>
          <h2>$0</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            width: "220px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Profit</h3>
          <h2>$0</h2>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        General Journal
      </h2>

      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>--</td>
            <td>--</td>
            <td>No transactions yet</td>
            <td>$0</td>
            <td>$0</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}

export default Accounting;