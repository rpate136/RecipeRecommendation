import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';

export default function TextInput() {
    const [ingredient, setIngredient] = useState<string>('');
    const [ingredientList, setIngredientList] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(event.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') {
            setIngredientList([...ingredientList, ingredient]);
            setIngredient('');
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = [...ingredientList];
        updatedIngredients.splice(index, 1);
        setIngredientList(updatedIngredients);
    };

    return (
        <div>
            <div className='flex'>
            <input 
                type="text" 
                placeholder="Type ingredient here" 
                value={ingredient} 
                onChange={handleInputChange} 
                className="m-4 input input-bordered input-primary w-full max-w-xs" 
            />
            <button onClick={handleAddIngredient} className="m-4 btn btn-primary">Add Ingredient</button>
            </div>
        
            <ul className="flex flex-row form-control flex-wrap space-x-4 justify-center">
                {ingredientList.map((ingredient, index) => (
                    <li key={index} className="flex flex-row items-center text-lg">
                        <span>{ingredient}</span>
                        <button onClick={() => handleRemoveIngredient(index)} className="ml-1 text-red-500 hover:text-red-700">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </li>
                ))}
            </ul>
            
        </div>
    );
}
