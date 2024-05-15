import React, { useState, useEffect } from 'react';
import FoodNavBar from "../../components/navigation/foodBar";
import Pantry from "../../components/food/pantry";
import GetRecipie from "../../components/food/getRecipie"
import { useDictionary } from '../../context/PantryContext'; // Pantary dictionary
import { useRecommendationDictionary } from '../../context/RecipieRecommendationContext';


interface RecipieProps {}

export default function Recipie() {
    const { dictionary, updateDictionary } = useDictionary(); // Use the custom hook

    const [display, setDisplay] = useState<string>('recipes');


    return (
        <>
            <FoodNavBar display={display} handleClick={setDisplay} />
            <div id='RecipeMain' className='py-5'>
                {display == 'pantry' && <Pantry/>}
                {display == 'recipes' && <GetRecipie/>}
                {display == 'upload' && <h1>upload</h1>}
            </div>
        </>
    );
}
