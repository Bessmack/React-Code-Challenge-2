import React, { useEffect, useState } from "react";


function TotalPlans(){
    const [numbers, setNumbers] = useState([]);
    const baseUrl ="http://localhost:3000/goals";

    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => setNumbers(data))
            .catch((err) => console.error("Error", err))
    }, [])

    const totalNumber= numbers.length;

    return(
        <>
            <h2>You have {totalNumber} Set Goals</h2>
        </>
    );
}

export default TotalPlans;