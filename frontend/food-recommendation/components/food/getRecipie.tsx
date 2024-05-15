// pages/pantry.tsx
import React, {useContext, useState, useEffect} from 'react';
import {useRecommendationDictionary} from '../../context/RecipieRecommendationContext';
import RecommendationInput from '../input/recipieRecommendationInput'
import Checkbox from "../input/checkbox"

interface GetRecipieProps {
    list: { id: number; label: string; checked: boolean; }[];
    setMealTypeCheckbox: React.Dispatch<React.SetStateAction<{ id: number; label: string; checked: boolean; }[]>>;
    // onCheckedItemsChange: (checkedItems: number[]) => void;

  }

const GetRecipie = () => {
    const {recommendationdictionary, updateRecommendationDictionary,removeIngredient} = useRecommendationDictionary();
    // const {mealTypeCheckbox, setMealTypeCheckbox} = useState<{ id: number; label: string; checked: boolean;}[]>([]);
    const [mealTypeCheckbox, setMealTypeCheckbox] = useState<{ id: number; label: string; checked: boolean; }[]>([]);
    const [cuisineTypeCheckbox, setCuisineTypeCheckbox] = useState<{ id: number; label: string; checked: boolean; }[]>([]);


    const handleMealTypeCheckbox = (data: any) => {
        // const checkedItemsLabels = data.filter((item:any) => item.checked).map((item:any) => item.label);
        setMealTypeCheckbox(data)
    }

    const handleCuisineTypeCheckbox = (data: any) => {
        // const checkedItemsLabels = data.filter((item:any) => item.checked).map((item:any) => item.label);
        setCuisineTypeCheckbox(data)
    }

    const handleSubmit =() => {

    }
    
    useEffect(() => {
    // console.log(recommendationdictionary['Meal Type'])
        const formattedMealTypes = recommendationdictionary['Meal Type'].map((meal, index) => ({
        id: index + 1,
        label: meal,
        checked: false
        }));
        setMealTypeCheckbox(formattedMealTypes)

        const formattedCuisineTypes = recommendationdictionary['Cuisine Type'].map((meal, index) => ({
            id: index + 1,
            label: meal,
            checked: false
            }));
        setCuisineTypeCheckbox(formattedCuisineTypes)
    
    }, []);

    return (
        <div id='PantryMain' className='space-y-4'>
            {/* {Object.keys(recommendationdictionary).map((category) => (  */}
                <div className="collapse collapse-arrow bg-base-200" key={"Additional Ingredients"}>
                    <input type="radio" name="my-accordion-1" defaultChecked={true} />
                    <div className="collapse-title text-xl font-medium">
                        {"Additional Ingredients"}
                    </div>
                    <div className="collapse-content">
                        <RecommendationInput category={"Additional Ingredients" as keyof typeof recommendationdictionary} />
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-1" defaultChecked={true}/> 
                    <div className="collapse-title text-xl font-medium">
                    Choose Meal Types
                    </div>
                    <div className="collapse-content"> 
                        <Checkbox list={mealTypeCheckbox} setList={handleMealTypeCheckbox}></Checkbox>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-1" defaultChecked={true}/> 
                    <div className="collapse-title text-xl font-medium">
                    Choose Cuisine Types
                    </div>
                    <div className="collapse-content"> 
                        <Checkbox list={cuisineTypeCheckbox} setList={handleCuisineTypeCheckbox}></Checkbox>
                    </div>
                </div>

                <div className="divider divider-accent"></div>
                
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit}>
                    <button className="btn btn-primary">Get Recommendations</button>
                    </form>
                </div>
            {/* ))} */}


        </div>
    );
};

export default GetRecipie;
