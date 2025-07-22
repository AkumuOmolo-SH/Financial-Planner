"use client";
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

function GoalItem({ goal, onDeleteGoal, onUpdateGoal, onEditGoal }) {
  const [name, editName] = useState(goal.name);
  const [category, editCategory] = useState(goal.category);
  const [targetAmount, editTargetAmount] = useState(goal.targetAmount);
  const [deadline, editDeadline] = useState(goal.deadline);
  const [isEditing, setIsEditing] = useState(false);
  
  const [deadlineStatus, setDeadlineStatus] = useState("");

const createdDate = new Date(goal.createdAt);

   const deadlineDate = new Date(deadline);
const marginMs = deadlineDate - createdDate;
  const marginDays = Math.floor(marginMs / (1000 * 60 * 60 * 24));

  
 useEffect(() => {
 

  if (marginDays < 0) {
    setDeadlineStatus("Overdue");
  } else if (marginDays === 30) {
    setDeadlineStatus("30 Days to left");
  } else {
    setDeadlineStatus("Ongoing");
  }
}, [deadline, goal.createdAt]);

  function handleEditClick() {
    setIsEditing(true);
  }

   function handleEditSave() {
    const updatedGoal = {
      ...goal,
      name,
      category,
      targetAmount,
      deadline,
    };

    fetch(`https://backend-financial-planner.onrender.com/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((r) => r.json())
      .then((editedGoal) => {
        onUpdateGoal(editedGoal);
        setIsEditing(false);
      });
  }

  function handleDeleteClick() {
    fetch(`https://backend-financial-planner.onrender.com/goals/${goal.id}`, {
      method: "DELETE",
    }).then(() => onDeleteGoal(goal));
  }

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => editName(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => editCategory(e.target.value)}
          >
            <option value="Leisure">Leisure</option>
            <option value="Home">Home</option>
            <option value="Education">Education</option>
            <option value="Electronics">Electronics</option>
            <option value="Emergency">Emergency</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Real-Estate">RealEstate</option>
          </select>

          <input
            type="number"
            value={targetAmount}
            onChange={(e) => editTargetAmount(e.target.value)}
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => editDeadline(e.target.value)}
          />
          <button onClick={handleEditSave}>Save</button>
        </div>
      ) : (
        <div>
          <h4>{goal.name}</h4>
          <h3>Current: {goal.savedAmount}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: {goal.targetAmount}</p>
          <span>
            Deadline: {goal.deadline} - {deadlineStatus}
          </span>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      <p>Status: {deadlineStatus} </p>
      <p>Days remaining: {marginDays}</p>
      
      <ProgressBar
        savedAmount={Number(goal.savedAmount)}
        targetAmount={Number(goal.targetAmount)}
      />
    </li>
  );
}

export default GoalItem;
