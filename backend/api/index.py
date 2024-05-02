from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def root():
    return {"message": "Hello World"}

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route("/cocktails", methods=["GET"])
def get_cocktails():
    ingredients = request.args.getlist("ingredients")
    print(ingredients)

    cocktails = []
    for term in ingredients:
        url = f"https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={term}"
        response = requests.get(url)
        data = response.json()
        if data["drinks"]:
            cocktails.extend(data["drinks"])

    if not cocktails:
        return jsonify({"message": "No cocktails found for the given ingredients and liquors."})

    cocktail_counts = {}
    for cocktail in cocktails:
        cocktail_id = cocktail["idDrink"]
        if cocktail_id in cocktail_counts:
            cocktail_counts[cocktail_id] += 1
        else:
            cocktail_counts[cocktail_id] = 1

    sorted_cocktails = sorted(cocktail_counts.items(), key=lambda x: x[1], reverse=True)
    selected_cocktail_ids = [cocktail_id for cocktail_id, count in sorted_cocktails[:2]]

    cocktail_details = []
    for cocktail_id in selected_cocktail_ids:
        url = f"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={cocktail_id}"
        response = requests.get(url)
        data = response.json()
        cocktail = data["drinks"][0]
        cocktail_name = cocktail["strDrink"]
        instructions = cocktail["strInstructions"]
        thumbnail = cocktail["strDrinkThumb"]

        ingredients_with_measurements = []
        for i in range(1, 16):
            ingredient = cocktail[f"strIngredient{i}"]
            measure = cocktail[f"strMeasure{i}"]
            if ingredient:
                if measure:
                    ingredients_with_measurements.append(f"{measure.strip()} {ingredient}")
                else:
                    ingredients_with_measurements.append(ingredient)

        formatted_ingredients = ', '.join(ingredients_with_measurements)

        cocktail_details.append({
            "name": cocktail_name,
            "instructions": instructions,
            "ingredients": formatted_ingredients,
            "thumbnail": thumbnail
        })

    print(cocktail_details)
    return jsonify({"cocktails": cocktail_details})
