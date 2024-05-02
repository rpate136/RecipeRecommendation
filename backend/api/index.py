from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

from typing import List


app = FastAPI()

# origins = [
#     "http://127.0.0.1",
#     "http://127.0.0.1:3000",
#     "http://localhost:3000",
#     "http://frontend:3000",
#     # "http://127.0.0.1:55950",
# ]
# Add CORS middleware with appropriate configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/cocktails")
async def get_cocktails(
    # liquors: List[str] = Query(..., title="Liquors"),
    ingredients: List[str] = Query(..., title="Ingredients")
):
    # Combine liquors and ingredients into a single list
    # search_terms = liquors + ingredients
    search_terms = ingredients
    print(search_terms)
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
        print(cocktail_details)
    
    return {"cocktails": cocktail_details}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

