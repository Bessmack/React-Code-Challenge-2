import React, { useEffect, useState } from "react";
import AddPlan from "./AddPlan";

function GoalPlanner(){
    const [goals, setGoals] = useState([])
    const baseUrl = "http://localhost:3000/goals";

    useEffect(() =>{
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => setGoals(data))
    }, [])

    function handleGoalAdded(newGoal){
        setGoals([...goals, newGoal])
    }
    
    return(
        <>
            <AddPlan onAddGoal={handleGoalAdded} />
                {goals.map((goal) =>{
                return(
                    <div key={goal.id}>
                        <h1>{goal.name}</h1>
                        <p>Target Amount: {goal.targetAmount}</p>
                        <p>Saved Amount: {goal.savedAmount}</p>
                        <p>Deadline: {goal.deadline}</p>
                        <p>Created: {goal.createdAt}</p>
                        <h3>Category: {goal.category}</h3>
                        <button>EDIT PLAN</button>
                        <hr />
                    </div>
                );
            }) }
        </>
    );
}

export default GoalPlanner;