// context/PantryContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import data from '../json/pantry.json'

// Define the structure of the Recommendationdictionary
interface RecommendationDictionary {
    "Additional Ingredients": string[];
    "Meal Type": string[];
    "Cuisine Type": string[];

}

// Create a default Recommendationdictionary
const defaultRecommendationDictionary: RecommendationDictionary = {
    "Additional Ingredients": [],
    "Meal Type": ["Lunch","Dinner","Breakfast"],
    "Cuisine Type": ["Indian","Thai","Chinese","Italian","Japanese","Mexican","French","Spanish","Greek","Vietnamese","Korean","Brazilian","Lebanese","Turkish","Mediterranean"],

};

// Create the context
const RecipieRecommendationContext = createContext<{
    recommendationdictionary: RecommendationDictionary;
    updateRecommendationDictionary: (key: keyof RecommendationDictionary, value: string) => void;
    removeIngredient: (key: keyof RecommendationDictionary, index: number) => void;
}>({
    recommendationdictionary: defaultRecommendationDictionary,
    updateRecommendationDictionary: () => {},
    removeIngredient: () => {}
});

// Create a provider component
export const RecipieRecommendationProvider = ({ children }: { children: ReactNode }) => {
    const [recommendationdictionary, setRecommendationDictionary] = useState<RecommendationDictionary>(defaultRecommendationDictionary);

    const updateRecommendationDictionary = (key: keyof RecommendationDictionary, value: string) => {
        setRecommendationDictionary(prev => ({
            ...prev,
            [key]: [...prev[key], value]
        }));
    };

    const removeIngredient = (key: keyof RecommendationDictionary, index: number) => {
        setRecommendationDictionary(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index)
        }));
    };

    // useEffect(() => {
    //     setRecommendationDictionary(data)        
    // }, []);

    return (
        <RecipieRecommendationContext.Provider value={{ recommendationdictionary, updateRecommendationDictionary, removeIngredient }}>
            {children}
        </RecipieRecommendationContext.Provider>
    );
};

// Create a custom hook to use the context
export const useRecommendationDictionary = () => useContext(RecipieRecommendationContext);
