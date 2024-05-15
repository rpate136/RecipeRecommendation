import React, { useState } from 'react';
// import { useDictionary } from '../../context/PantryContext';
import {useRecommendationDictionary} from '../../context/RecipieRecommendationContext'
import { XMarkIcon } from '@heroicons/react/16/solid';


interface RecommendationInputProps {
    category: keyof {
        "Additional Ingredients": string[];
        "Meal Type": string[];
        "Cuisine Type": string[];
    };
}

const RecommendationInput: React.FC<RecommendationInputProps> = ({ category }) => {
    const { recommendationdictionary, updateRecommendationDictionary, removeIngredient } = useRecommendationDictionary();
    const [newItem, setNewItem] = useState<string>('');

    const handleAddItem = () => {
        updateRecommendationDictionary(category, newItem);
        setNewItem('');
    };

    const handleRemoveIngredient = (index:number) => {
        removeIngredient(category,index)
    }

    const handleKeyDown =(e:any) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
        handleAddItem()
        }
    }

    return (
        <div className='flex flex-col md:flex-row space-x-4'>
            <div>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Enter/Return to add`}
                className="m-1 input input-bordered input-primary w-full max-w-xs" 
            />
            {/* <button onClick={handleAddItem}>Add</button> */}
            </div>
            <div>
            <ul className="flex flex-row form-control flex-wrap space-x-4 justify-center">
                {recommendationdictionary[category].map((item, index) => (
                    <li key={index} className="flex flex-row items-center text-lg">
                        <span>{item}</span>
                        <button onClick={() => handleRemoveIngredient(index)} className="ml-1 text-red-500 hover:text-red-700">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </li>
                ))}
            </ul>
            </div>
            
        </div>
    );
};

export default RecommendationInput;
