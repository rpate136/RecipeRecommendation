// pages/pantry.tsx
import React from 'react';
import IngredientInput from '../input/ingredientInput';
import { useDictionary} from '../../context/PantryContext';


const Pantry = () => {
    const { dictionary, updateDictionary} = useDictionary();

    return (
        <div id='PantryMain' className='space-y-4'>
            {Object.keys(dictionary).map((category) => (
                <div className="collapse collapse-arrow bg-base-200" key={category}>
                    <input type="radio" name="my-accordion-2" defaultChecked={category === "Spices/Oil"} />
                    <div className="collapse-title text-xl font-medium">
                        {category}
                    </div>
                    <div className="collapse-content">
                        <IngredientInput category={category as keyof typeof dictionary} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Pantry;
