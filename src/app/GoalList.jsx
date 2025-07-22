"use client";

import React, { useEffect, useState } from "react";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";


function GoalsList() {
  const [goals, setGoals] = useState([]);
  const [completedGoal, setCompletedGoal] = useState(false);
  const [progress, setProgress] = useState("30%");
  const[sum, setSum] = useState("0");

  const [editId, setEditId] = useState("");

 

  useEffect(() => {
    fetch("https://backend-financial-planner.onrender.com/goals")
      .then((r) => r.json())
      .then((data) => setGoals(data));
  }, []);

    useEffect(() =>{
  const total = goals.reduce((acc, goal) => acc + Number(goal.savedAmount || 0), 0);
setSum(total);


 }, [goals]);



  function handleAddNewGoal(newGoal) {
    setGoals([...goals, newGoal])
  }

  function handleDeleteGoal(deletedGoal) {
    const updatedGoals = goals.filter((goal) => goal.id !== deletedGoal.id);
    setGoals(updatedGoals);
  }
    
 function handleUpdateGoal(updatedGoal) {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal: goal
    );

    setGoals(updatedGoals);
  }

  function handleCompletedGoals () {
    setCompletedGoal(!completedGoal);
  }

  const displayGoalsCompleted = completedGoal? goals.filter((goal) =>
      Number(goal.savedAmount) >= Number(goal.targetAmount)
    )
  : goals;

 function handleProgressBar(goal) {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  setProgress(progress + "%");
}


    return (
    <div>
      <button onClick={handleCompletedGoals}>
        {completedGoal? "Show All Goals" : "Show Completed Goals"}
      </button>
      <h4>Your Goals: {goals.length}</h4>
      <h3>Total Savings(KSh): {sum}</h3>
      

        <ul> 
          {displayGoalsCompleted.map((goal) => (
            <GoalItem 
            key={goal.id}
            goal={goal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            />
        ))}
      
      </ul>
        

        <ul>
          {displayGoalsCompleted.map((goal) => (
            <GoalItem 
            key={goal.id}
            goal={goal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            />
          ))}
        </ul>
        </div> 
    );
}

export default GoalsList;

