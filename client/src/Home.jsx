import React from "react";

function Home({ setMode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#1a237e" }}>
        ExpenseFlow AI 🚀
      </h1>

      <p style={{ color: "#555" }}>
        Choose your workspace
      </p>

      <button
        onClick={() => setMode("expense")}
        style={{
          margin: "15px",
          padding: "15px 40px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Expense Tracker
      </button>

      <button
        onClick={() => setMode("accounting")}
        style={{
          margin: "15px",
          padding: "15px 40px",
          background: "#2e7d32",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Accounting System
      </button>

    </div>
  );
}

export default Home;