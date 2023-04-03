import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Recipe, Ingredient, IngredientInRecipeXref } from "../interfaces";

interface RecipeNutritionInfoProps {
    editedRecipe: Recipe;
    xrefs: IngredientInRecipeXref[];
    ingredients: Ingredient[];
}

export const calculateTotalValue = (name, xrefs, editedRecipe, ingredients) => {
    console.log(name)
    console.log(xrefs)
    console.log(editedRecipe)
    console.log(ingredients)

    return xrefs.filter(x => x.recipeId == editedRecipe.id).map(y => ingredients.find(({ id }) => id == y.ingredientId)).map(z => z![name]).reduce((accumulator, current) => accumulator + current, 0)
}

function RecipeNutritionInfo(props: RecipeNutritionInfoProps) {

    const { editedRecipe, xrefs, ingredients } = props;

    return (
        <div className="mb-2">
            {ingredients && xrefs && editedRecipe &&
                <div>
                    <Badge data-testid="proteins-label" bg="secondary" pill>
                        <span>
                            <p>Total protein:  {
                                calculateTotalValue('protein', xrefs, editedRecipe, ingredients).toString()
                            }g</p>
                        </span>
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        <p>Total Fat: {
                            calculateTotalValue('fat', xrefs, editedRecipe, ingredients).toString()
                        }g</p>
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        <p> Total Carbs: {
                            calculateTotalValue('carbs', xrefs, editedRecipe, ingredients).toString()
                        }g</p>
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        <p> Total kcal: {
                            calculateTotalValue('kcal', xrefs, editedRecipe, ingredients).toString()
                        }</p>
                    </Badge>{' '}
                </div>
            }
        </div>
    );
}

export default RecipeNutritionInfo;