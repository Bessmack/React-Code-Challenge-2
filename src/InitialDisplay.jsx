import React, { useEffect, useState } from "react";
import AddPlan from "./AddPlan";

function InitialDisplay(){
    const [goals, setGoals] = useState([]);
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        targetAmount: "",
        savedAmount: "",
        category: "",
        deadline: ""
    });
    const baseUrl = "http://localhost:3000/goals";

    useEffect(() =>{
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => setGoals(data))
    }, [])

    function handleGoalAdded(newGoal){
        setGoals([...goals, newGoal])
    }

    function startEditing(goal){
        setEditingGoalId(goal.id)

        setEditForm({
            name: goal.name,
            targetAmount:goal.targetAmount,
            savedAmount:goal.savedAmount,
            category:goal.category,
            deadline:goal.deadline
        });
    }

    function handleEdit(e){
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        })
    }
    
    function saveEdit(goalId){
        fetch(`${baseUrl}/${goalId}`,{
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editForm)
        })
            .then(res => res.json())
            .then(updatedGoal => {
                setGoals(goals.map(goal => goal.id === goalId ? updatedGoal:goal))
                setEditingGoalId(null)
            } );
    }

    return(
        <>
            <AddPlan onAddGoal={handleGoalAdded} />
            {goals.map((goal) =>{
            return(
                <div key={goal.id}>
                    {editingGoalId === goal.id?(
                        <>
                            <input name="name" className="inputs" value={editForm.name} onChange={handleEdit} />
                            <input name="targetAmount" className="inputs" placeholder="Target Amount" value={editForm.targetAmount} onChange={handleEdit} />
                            <input name="savedAmount" className="inputs" placeholder="Initial Amount" value={editForm.savedAmount} onChange={handleEdit} />
                            <input name="category" className="inputs" placeholder="Category" value={editForm.category} onChange={handleEdit} />
                            <input name="deadline" className="inputs" placeholder="Deadline" value={editForm.deadline} onChange={handleEdit} />
                            <button onClick={() => saveEdit(goal.id)}>SAVE</button>
                        </>
                    ):(
                        <>
                            <h1>{goal.name}</h1>
                            <h3>~{goal.category}~</h3>
                            <p>Target Amount: {goal.targetAmount}</p>
                            <p>Saved Amount: {goal.targetAmount-goal.savedAmount}</p>
                            <p>Remaining Amount: {goal.savedAmount}</p>
                            <p>Deadline: {goal.deadline}</p>
                            <p>Created: {goal.createdAt}</p>
                            <button onClick={()=> startEditing(goal) }>EDIT</button>
                            <hr />
                        </>
                    ) }
                    
                </div>
            );
        }) }
        </>
    );
}

export default InitialDisplay;