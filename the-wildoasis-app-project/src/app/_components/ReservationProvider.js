'use client'

import {createContext, useContext, useState} from 'react';

const ReservationContext = createContext();

const initailState = { from: null, to: null };

export default function ReservationProvider({children}) {
  const [range, setRange] = useState(initailState);

  return (
    <ReservationContext.Provider value={{range,setRange}}>
        {children}
    </ReservationContext.Provider>
  )
}


//  constum hook

export function useRange() {
  const context = useContext(ReservationContext);

  if(!context)
  {
    throw new Error('Hook was used outside of its provider context')
    return null
  }
  return context
}
