import React, { useState, useEffect } from "react";

export default function ExpenseForm() {

  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const saveExpense = async () => {

    if (!expense || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

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
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error occurred");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <input
        placeholder="Expense name"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
      </select>

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <select
  value={paymentType}
  onChange={(e) => setPaymentType(e.target.value)}
>
  <option value="">Select payment type</option>
  <option value="Cash">Cash</option>
  <option value="UPI">UPI</option>
  <option value="Card">Card</option>
</select>

      <button onClick={saveExpense}>Save Expense</button>
    </div>
  );
}