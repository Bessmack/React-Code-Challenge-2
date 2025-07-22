import React, { useEffect, useState } from "react";
import AddPlan from "./AddPlan";

function InitialDisplay({goals, setGoals}){
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        targetAmount: "",
        savedAmount: "",
        category: "",
        deadline: ""
    });
    const [depositingGoalId, setDepositingGoalId] = useState(null)
    const [depositAmount, setDepositAmount] = useState('');

    const baseUrl = "http://localhost:3000/goals";


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

    function handleDelete(goalId){
        fetch(`${baseUrl}/${goalId}`, {
            method: 'DELETE'
        })
            .then(()=>{
                setGoals(goals.filter(goal => goal.id !== goalId));
            })
    }
    
    function handleDeposit(goal){
        const deposit = Number(depositAmount);
        const newSaved = Number(goal.savedAmount) + deposit;
        const updatedGoal = { ...goal, savedAmount: newSaved }

        fetch(`${baseUrl}/${goal.id}`, {
            method:'PATCH',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({savedAmount: newSaved})
        })
            .then(res => res.json())
            .then(updated => {
                setGoals(goals.map(x => x.id === goal.id? updated : x));
                setDepositingGoalId(null)
                setDepositAmount('')
            })
    }

    function openDeposit(goalId){
        setDepositingGoalId(goalId);
        setDepositAmount('');
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
                            <p>Saved Amount: {goal.savedAmount}</p>
                            <p>Remaining Amount: {Number(goal.targetAmount)-Number(goal.savedAmount)}</p>
                            <p>Deadline: {goal.deadline}</p>
                            <p>Created: {goal.createdAt}</p>
                            <button onClick={()=> startEditing(goal) }>EDIT</button>
                            <button id="delete" onClick={()=> handleDelete(goal.id) }>DELETE</button>

                            {depositingGoalId === goal.id? (
                                <>
                                    <input type="number"  placeholder="Enter deposit amount" value={depositAmount} onChange={(e)=> setDepositAmount(e.target.value)}/>
                                    <button onClick={() => handleDeposit(goal)}>Confirm Deposit</button>
                                    <button onClick={() => setDepositingGoalId(null)}>Cancel</button>
                                </>
                            ):(
                                <button onClick={() => openDeposit(goal.id)}>DEPOSIT</button>
                            )}
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