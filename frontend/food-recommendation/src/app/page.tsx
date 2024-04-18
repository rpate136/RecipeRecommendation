'use client'
import React, { useState } from 'react';
import Checkbox from "../../components/checkbox";
import cuisines from "../../cuisines.json"


export default function Home() {
  
    const [list, setList] = useState(cuisines);
  
  return (
  
    <div className="m-20"> 
      <div className="flex flex-col w-full">
        <h1 className='font-bold font-serif'> What type of cuisines do you want to eat?</h1>
        <div className="grid h-auto py-6 px-6 card bg-base-300 rounded-box place-items-center">
        <Checkbox list={list} setList={setList} />
        </div> 
        <div className="divider divider-accent"></div>
        <h1 className='font-bold'> What allergies do you have?</h1>
        <div className="grid h-auto card bg-base-300 rounded-box place-items-center">
        content
        </div>

      </div>
    </div>

  );
}
