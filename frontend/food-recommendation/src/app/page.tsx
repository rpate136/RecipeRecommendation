'use client'
import React, { useState } from 'react';
import Checkbox from "../../components/checkbox";
import TextInput from '../../components/textInput';
import SearchField from '../../components/searchList';

import liquore from "../../json/liquore.json"
import ingredients from "../../json/ingredients.json"

export default function Home() {
  
  const [liquoreList, setLiquoreList] = useState(liquore);
  const [ingredientList, setIngredientList] = useState(ingredients);
  // const [ingredientList, setIngredientList] = useState<string[]>([]);
  
  return (
  
    <div className="m-20"> 
      <div className="flex flex-col w-full">
        <h1 className='font-bold font-serif'> What type of liquore do you want to use?</h1>
        <div className="grid h-auto py-6 px-6 card bg-base-300 rounded-box place-items-center">
        <Checkbox list={liquoreList} setList={setLiquoreList} />
        </div> 
        <div className="divider divider-accent"></div>
        <h1 className='font-bold'> What ingredients do you have?</h1>
        <div className="grid h-auto card bg-base-300 rounded-box">
          <SearchField ingredientList={ingredientList} setIngredientList={setIngredientList}/>
        </div> 
        <div className="divider divider-accent"></div>
        <h1 className='font-bold'> What other extra ingredients do you have?</h1>
        <div className="grid h-auto card bg-base-300 rounded-box place-items-center">
          {/* <TextInput ingredientList={ingredientList} setIngredientList={setIngredientList}/> */}
        </div>
      </div>
    </div>

  );
}
