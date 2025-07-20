"use client";
import { useState } from "react";

function GoalForm({ onAddNewGoal }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Leisure");
  const [targetAmount, setTargetAmount] = useState("0");
  const [savedAmount, setSavedAmount] = useState("0");
  const [deadline, setDeadline] = useState("2025-07-19");
  const [createdAt, setCreatedAt] = useState("2025-07-19");

  function handleOnSubmit(e) {
    e.preventDefault();

    const goalsData = {
      name: name,
      category: category,
      targetAmount: Number(targetAmount),
      savedAmount: Number(savedAmount),
      deadline: deadline,
      createdAt: createdAt,
      isCompleted: false,
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalsData),
    })
       .then((r) => r.json())
       .then((newGoal) => {
        onAddNewGoal(newGoal);
        setName("");
        setCategory("Leisure");
        setTargetAmount("30000");
        setSavedAmount("10000");
        setDeadline("2025-07-19");
        setCreatedAt("2025-07-19");
      });
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Leisure">Leisure</option>
          <option value="Home">Home</option>
          <option value="Education">Education</option>
          <option value="Electronics">Electronics</option>
          <option value="Emergency">Emergency</option>
          <option value="Vehicle">Vehicle</option>
        </select>
      </label>

      <label>
        Target (Ksh):
        <input
          type="text"
          name="target"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
      </label>

      <label>
        Saved(Ksh):
        <input
          type="text"
          name="saved"
          value={savedAmount}
          onChange={(e) => setSavedAmount(e.target.value)}
        />
      </label>

      <label>
        Deadline:
        <input
          type="date"
          name="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <label>
        Created On:
        <input
          type="date"
          name="createdAt"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </label>

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
