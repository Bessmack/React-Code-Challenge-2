import { useState } from 'react'
import InitialDisplay from './InitialDisplay'
import TotalPlans from './TotalPlans';

function App() {

  return (
    <>
      <h1>SMART + Plan</h1>
      <TotalPlans />
      <InitialDisplay />
    </>
  )
}

export default App;