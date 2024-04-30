'use client'
import React, { useState,useEffect } from 'react';
import Checkbox from "../../components/checkbox";
import TextInput from '../../components/textInput';
import SearchField from '../../components/searchList';
import liquore from "../../json/liquore.json"
import Carousel from '../../components/recipieDisplay';
import ingredients from "../../json/ingredients.json"

export default function Home() {
  
  const liquore_var = liquore;
  const [liquoreSelected, setLiquoreSelected] = useState<{ id: number; label: string; checked: boolean}[]>(liquore);
  const [liquoreFinalList, setLiquoreFinalList] = useState<string[]>([]);
  
  const ingredients_var = ingredients;
  const [ingredientSelected, setIngredientSelected] = useState([]);
  // const [ingredientList, setIngredientList] = useState<string[]>([]);

  const handleCheckbox = (data: any) => {
    setLiquoreSelected(data);
    const checkedItemsLabels = data.filter((item:any) => item.checked).map((item:any) => item.label);
    setLiquoreFinalList(checkedItemsLabels)
  }
  const handleIngredients = (data:any) => {
    setIngredientSelected(data)
  }
  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (liquoreSelected.length === 0 || ingredientSelected.length == 0){
      console.log("Input is zero");
    }
    else {
      console.log("Make the API call")
    }
  }
  
  return (
  
    <div className="m-20"> 
      <div className="flex flex-col w-full">
        <h1 className='font-bold font-serif'> What type of liquore do you want to use?</h1>
        <div className="grid h-auto py-6 px-6 card bg-base-300 rounded-box place-items-center">
        <Checkbox list={liquoreSelected} setList={handleCheckbox} />
        </div> 
        <div className="divider divider-accent"></div>
        <h1 className='font-bold'> What ingredients do you have?</h1>
        <div className="grid h-auto card bg-base-300 rounded-box">
          <SearchField ingredientList={ingredients_var} setIngredientList={handleIngredients}/>
        </div> 
        <div className="divider divider-accent"></div>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-primary">Get Recommendations</button>
          </form>
        </div>
        <div className='m-5'>
        <Carousel></Carousel>
        </div>
      </div>
    </div>

  );
}
