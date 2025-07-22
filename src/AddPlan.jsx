import { useState } from "react";

function AddPlan({ onAddGoal }) {
    const baseUrl = 'http://localhost:3000/goals';
    const [name, setName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [savedAmount, setSavedAmount] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const newGoal = {
            name,
            targetAmount,
            savedAmount,
            category,
            deadline
        };

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGoal)
        })
            .then(res=> res.json())
            .then(data =>{
                onAddGoal(data)
                setName('')
                setTargetAmount('')
                setSavedAmount('')
                setCategory('')
                setDeadline('');
            })
    }

    return (
        <form id="form" onSubmit={handleSubmit}>
            <h3>Add A new Plan.</h3>
            <input type="text" className="inputs" placeholder="Name.." value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" className="inputs" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
            <input type="number" className="inputs" placeholder="Initial Amount" value={savedAmount} onChange={(e) => setSavedAmount(e.target.value)} required />
            <input type="text" className="inputs" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="number" className="inputs" placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            <button type="submit">ADD</button>
        </form>
    );
}

export default AddPlan;