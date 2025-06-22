'use client'

import {useState} from 'react';
export default function reactiveCompo({total}) {


  return (
    <div>
      <p>Reactive Increment Counter</p>
      <button onClick={() => setCount((c) => c+1)}>{count}/{total}</button>
    </div>
  )

}
