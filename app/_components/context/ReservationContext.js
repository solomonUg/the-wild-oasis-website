"use client"

const { createContext } = require("react");
import { useState } from "react";


const ReservationContext = createContext();

function ReservationProvider({children}){
    const [range, setRange] = useState({from:undefined, to:undefined})
    function resetRange(){
        setRange({from:undefined, to:undefined})
    }

    return (<ReservationContext.Provider value={{range, setRange, resetRange}}>{children}</ReservationContext.Provider>) 
}

export {ReservationContext, ReservationProvider}