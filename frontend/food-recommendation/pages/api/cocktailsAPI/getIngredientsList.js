import axios from 'axios';

export default async function handler(req, res) {
    try {
        const requestURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const response = await axios.get(requestURL);

        // Extract the drinks array from the response data
        const drinks = response.data.drinks;

        // Filter out alcohol and other ingredients
        const alcoholIngredients = [];
        const otherIngredients = [];

        drinks.forEach(drink => {
            const ingredient = drink.strIngredient1;
            if (isAlcohol(ingredient)) {
                alcoholIngredients.push(ingredient);
            } else {
                otherIngredients.push(ingredient);
            }
        });

        // Function to determine if an ingredient is alcohol
        function isAlcohol(ingredient) {
            // Define a list of common alcohol types
            const alcoholTypes = ["rum", "whiskey", "vodka", "tequila", "gin", "brandy", "liqueur", "schnapps", "cognac", "bitters", "sake", "bourbon", "scotch", "beer", "wine", "vermouth","sec"];
            
            // Check if the ingredient contains any of the alcohol types
            return alcoholTypes.some(type => ingredient.toLowerCase().includes(type));
        }

        // Prepare the cleaned data
        const cleanedData = {
            alcoholIngredients: alcoholIngredients,
            otherIngredients: otherIngredients
        };
        alcoholIngredients.sort()
        otherIngredients.sort()
        // Send the cleaned data in the response
        res.status(200).json(cleanedData);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
