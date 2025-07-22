import { useEffect, useState } from 'react'
import InitialDisplay from './InitialDisplay'
import TotalPlans from './TotalPlans';

function App() {

  const [goals, setGoals] = useState([]);
  const baseUrl ="http://localhost:3000/goals";

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch((err) => console.error("Error", err))
    }, [])

  return (
    <>
      <h1>SMART + Plan</h1>
      <TotalPlans goals={goals} />
      <InitialDisplay goals={goals} setGoals={setGoals} />
    </>
  )
}

export default App;