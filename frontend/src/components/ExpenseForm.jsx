import React, { useState, useEffect } from "react";
import { PlusCircle, Tag, DollarSign, Calendar, CreditCard } from "lucide-react";
import "./ExpenseForm.css";

export default function ExpenseForm() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("$");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const predefinedCategories = ["Food", "Shopping", "Travel", "Entertainment", "Bills"];
  const predefinedPayments = ["Cash", "UPI", "Card", "Net Banking"];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const saveExpense = async () => {
    if (!expense || !amount || !category || !date || !paymentType) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          expense: expense,
          amount: amount,
          // You could pass currency here if your backend supported it: currency: currency,
          category: category,
          date: date,
          paymentType: paymentType
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Expense saved!");
        setExpense("");
        setAmount("");
        setCategory("");
        setPaymentType("");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error occurred");
    }
  };

  return (
    <div className="expense-card animate-fade-in">
      <h2 className="card-title">New Entry</h2>

      <div className="form-group">
        <label className="form-label">
          <Tag size={16} /> Expense Name
        </label>
        <input
          className="form-input"
          placeholder="e.g., Porsche Lease"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <DollarSign size={16} /> Amount
        </label>
        <div className="amount-input-wrapper">
          <select 
            className="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
            <option value="₹">INR (₹)</option>
            <option value="¥">JPY (¥)</option>
          </select>
          <input
            type="number"
            className="form-input amount-input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <Tag size={16} /> Category
          </label>
          <input
            className="form-input"
            placeholder="Type or select below"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="badge-container">
            {predefinedCategories.map(cat => (
              <span 
                key={cat} 
                className={`badge ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <CreditCard size={16} /> Payment Method
          </label>
          <input
            className="form-input"
            placeholder="Type or select below"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <div className="badge-container">
            {predefinedPayments.map(pay => (
              <span 
                key={pay} 
                className={`badge ${paymentType === pay ? 'active' : ''}`}
                onClick={() => setPaymentType(pay)}
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <Calendar size={16} /> Date
        </label>
        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button className="btn-submit" onClick={saveExpense}>
        <PlusCircle size={18} /> Add Record
      </button>
    </div>
  );
}