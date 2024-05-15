// context/PantryContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import data from '../json/pantry.json'

// Define the structure of the dictionary
interface Dictionary {
    "Spices/Oil": string[];
    "Fruits/Veg": string[];
    "Meats/Poultry": string[];
    "Dairy": string[];
    "Bread": string[];
    "Others": string[];
}

// Create a default dictionary
const defaultDictionary: Dictionary = {
    "Spices/Oil": [],
    "Fruits/Veg": [],
    "Meats/Poultry": [],
    "Dairy": [],
    "Bread": [],
    "Others": []
};

// Create the context
const PantryContext = createContext<{
    dictionary: Dictionary;
    updateDictionary: (key: keyof Dictionary, value: string) => void;
    removeIngredient: (key: keyof Dictionary, index: number) => void;
}>({
    dictionary: defaultDictionary,
    updateDictionary: () => {},
    removeIngredient: () => {}
});

// Create a provider component
export const PantryProvider = ({ children }: { children: ReactNode }) => {
    const [dictionary, setDictionary] = useState<Dictionary>(defaultDictionary);

    const updateDictionary = (key: keyof Dictionary, value: string) => {
        setDictionary(prev => ({
            ...prev,
            [key]: [...prev[key], value]
        }));
    };

    const removeIngredient = (key: keyof Dictionary, index: number) => {
        setDictionary(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index)
        }));
    };

    useEffect(() => {
        setDictionary(data)        
    }, []);

    return (
        <PantryContext.Provider value={{ dictionary, updateDictionary, removeIngredient }}>
            {children}
        </PantryContext.Provider>
    );
};

// Create a custom hook to use the context
export const useDictionary = () => useContext(PantryContext);
