from fastapi import FastAPI
import requests

app = FastAPI()

@app.post("/cocktails")
async def get_cocktails(input: dict):
    liquors = input['liquors']
    ingredients = input['ingredients']

    # Combine liquors and ingredients into a single list
    search_terms = liquors + ingredients

    # Initialize an empty list to store the cocktails
    cocktails = []

    # Make API requests for each search term and store the cocktails
    for term in search_terms:
        url = f"https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={term}"
        response = requests.get(url)
        data = response.json()

        if data['drinks']:
            cocktails.extend(data['drinks'])

    # If no cocktails are found, return an appropriate message
    if not cocktails:
        return {"message": "No cocktails found for the given ingredients and liquors."}

    # Count the occurrences of each cocktail
    cocktail_counts = {}
    for cocktail in cocktails:
        cocktail_id = cocktail['idDrink']
        if cocktail_id in cocktail_counts:
            cocktail_counts[cocktail_id] += 1
        else:
            cocktail_counts[cocktail_id] = 1

    # Sort the cocktails based on the count of matching ingredients/liquors
    sorted_cocktails = sorted(cocktail_counts.items(), key=lambda x: x[1], reverse=True)

    # Get the top 2 cocktails with the most matching ingredients/liquors
    selected_cocktail_ids = [cocktail_id for cocktail_id, count in sorted_cocktails[:2]]

    # Retrieve the details of the selected cocktails
    cocktail_details = []
    for cocktail_id in selected_cocktail_ids:
        url = f"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={cocktail_id}"
        response = requests.get(url)
        data = response.json()
        
        cocktail = data['drinks'][0]
        cocktail_name = cocktail['strDrink']
        instructions = cocktail['strInstructions']
        thumbnail = cocktail['strDrinkThumb']
        
        # Combine ingredients and measurements
        ingredients_with_measurements = []
        for i in range(1, 16):
            ingredient = cocktail[f'strIngredient{i}']
            measure = cocktail[f'strMeasure{i}']
            if ingredient:
                if measure:
                    ingredients_with_measurements.append(f"{measure.strip()} {ingredient}")
                else:
                    ingredients_with_measurements.append(ingredient)
        
        cocktail_details.append({
            "name": cocktail_name,
            "instructions": instructions,
            "ingredients": ingredients_with_measurements,
            "thumbnail": thumbnail
        })
    
    return {"cocktails": cocktail_details}