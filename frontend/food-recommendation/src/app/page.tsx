'use client'
import React, { useState,useEffect } from 'react';
import axios from 'axios';

import Checkbox from "../../components/checkbox";
import TextInput from '../../components/textInput';
import SearchField from '../../components/searchList';
import Carousel from '../../components/recipieDisplay';

import liquore from "../../json/liquore.json"
import ingredients from "../../json/ingredients.json"
import recipie from "../../json/recipe.json"

export default function Home() {
  
  const [liquoreSelected, setLiquoreSelected] = useState<{ id: number; label: string; checked: boolean}[]>(liquore);
  const [liquoreFinalList, setLiquoreFinalList] = useState<string[]>([]);
  
  const ingredients_var = ingredients;
  const [ingredientSelected, setIngredientSelected] = useState<string[]>([]);

  const [recipes,setRecipies] = useState<{name:string,instructions:string,ingredients:string,thumbnail:string}[]>();

  const handleCheckbox = (data: any) => {
    setLiquoreSelected(data);
    const checkedItemsLabels = data.filter((item:any) => item.checked).map((item:any) => item.label);
    setLiquoreFinalList(checkedItemsLabels)
  }
  const handleIngredients = (data:any) => {
    const checkedItemsLabels = data.map((item:any) => item.label);
    setIngredientSelected(checkedItemsLabels)
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (liquoreFinalList.length === 0 || ingredientSelected.length == 0){
      console.log("Input is zero");
    }
    else {
      console.log("Make the API call")

    const combined = new Set([...liquoreFinalList, ...ingredientSelected]);
    const params = new URLSearchParams();
    // Append each item in the list as a parameter
    combined.forEach(item => {
    params.append('ingredients', item);
    });
    // Get the string representation of the parameters
    const paramString = params.toString();

    const full_uri = '/api/getData';
    const requestURL = `${full_uri}?${paramString}`;
      axios.get(requestURL)
      .then(response => {
        setRecipies(response.data.cocktails)
      })
      .catch(error => {
        console.log(error)
      })
    }
  
  }

  useEffect(() => {
    console.log(recipes)
  }, [recipes]);
  
  return (
  
    <div className="m-4"> 
      <div className="flex flex-col w-full">
        <h1 className='font-bold font-serif'> What type of liquore do you have to use?</h1>
        <div className="grid h-auto py-6 px-6 card bg-base-300 rounded-box place-items-center">
        <Checkbox list={liquoreSelected} setList={handleCheckbox} />
        </div> 
        <div className="divider divider-accent"></div>
        <h1 className='font-bold font-serif'> What ingredients do you have?</h1>
        <div className="grid h-auto card bg-base-300 rounded-box">
          <SearchField ingredientList={ingredients_var} setIngredientList={handleIngredients}/>
        </div> 
        <div className="divider divider-accent"></div>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-primary">Get Recommendations</button>
          </form>
        </div>
        <div className='m-4'>
        {recipes && <Carousel recipes={recipes}></Carousel>}
        </div>
      </div>
    </div>

  );
}
