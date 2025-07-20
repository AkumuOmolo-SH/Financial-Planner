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

  // const {
  // id, name, category, savedAmount, targetAmount, deadline, createdAt
  // } = newGoal;


  // function handleEditGoal(goals) {
  
  //    fetch(http://localhost:3001/${goal.id}, 
  //     method: "PATCH",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify ({
  //       name,
  //       category,
  //       savedAmount,
  //       targetAmount,
  //       deadline,
  //       createdAt
  //     }),
  //     .then((r) => resizeBy.json())
  //     .then(editedGoal => {

  //     })
  //   )
  // }

  useEffect(() => {
    fetch("http://localhost:3001/goals")
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
        <GoalForm onAddNewGoal={handleAddNewGoal}/> 

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

// Here's my form:
// "use client";
// import { useState } from "react";

// function GoalForm( {onAddNewGoal} ) {
//     const [name, setName] = useState("");
//     const [category, setCategory] = useState("Leisure");
//     const [target, setTargetAmount] = useState("0");
//     const [deadline, setDeadline] = useState("2025-07-19");
//     const [savedAmount, setSavedAmount] = useState("0");
//     const [createdAt, setCreatedAt] = useState("2025-07-19");

//     function handleOnSubmit(e) {
//         e.preventDefault();
       
//         const goalsData = {
//             name: name,
//             category: category,
//             targetAmount: Number(target),
//             savedAmount: Number(savedAmount),
//             deadline: deadline,
//             isCompleted: false
//         }

//         fetch ("http://localhost:3001/goals", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(goalsData),
//         })
//         .then((r) => r.json())
//         .then((newGoal) => {
//             onAddNewGoal(newGoal);
//             setName("");
//             setCategory("Leisure");
//             setTarget("30000");
//             setSavedAmount("10000");
//             setDeadline("2025-07-19");
//         })
//     }

//     return (
//         <form onSubmit = {handleOnSubmit}>
//             <label>
//                 Name:
//             <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        
//             </label>
            
//            <label>
//             Category:
//             <select
//             name="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             >
//             <option value="Leisure">Leisure</option>
//             <option value="Home">Home</option>
//             <option value="Education">Education</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Emergency">Emergency</option>
//             <option value="Vehicle">Vehicle</option>
//             </select>
//            </label>

//            <label>
//             Target(Ksh):
//             <input
//             type="text"
//             name="target"
//             value={target}
//             onChange={(e) => setTargetAmount(e.target.value)}
//             />

//            </label>

//            <label>
//             Saved(Ksh):
//             <input
//             type="text"
//             name="saved"
//             value={savedAmount}
//             onChange={(e) => setSavedAmount(e.target.value)}
//             />

//            </label>

//             <label>
//                 Deadline:
//             <input type="date" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                        
//             </label>


//               <label>
//                 Created On:
//             <input type="date" name="createdAt" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)}/>
                        
//             </label>

//            <button type="submit">Add</button>
        
//         </form>

//     );
// }

// export default GoalForm;


