import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import { Moon, Sun } from "lucide-react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <button 
          className="theme-toggle" 
          onClick={() => setIsDark(!isDark)}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <h1 className="app-title">Expense Tracker</h1>
        <p className="app-subtitle">Track your spending effortlessly</p>
      </header>
      <main className="main-content">
        <ExpenseForm />
      </main>
    </div>
  );
}

export default App;