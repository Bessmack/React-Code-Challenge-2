import React, { useEffect, useState } from "react";


function TotalPlans({goals}){

    return <h2>Goals: {goals.length}</h2>
}

export default TotalPlans;