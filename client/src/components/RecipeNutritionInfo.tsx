import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Recipe, IngridientInRecipeXref, Ingridient } from "../interfaces";

interface RecipeNutritionInfoProps {
    editedRecipe: Recipe;
    xrefs: IngridientInRecipeXref[];
    ingridients: Ingridient[];
}

function RecipeNutritionInfo(props: RecipeNutritionInfoProps) {

    const { editedRecipe, xrefs, ingridients } = props;

    const calculateTotalValue = (name) => {
        return xrefs.filter(x => x.recipeId == editedRecipe.id).map(y => ingridients.find(({ id }) => id == y.ingridientId)).map(z => z![name]).reduce((accumulator, current) => accumulator + current, 0)
    }

    return (
        <div className="mb-2">
            {ingridients && xrefs && editedRecipe &&
                <div>
                    <Badge bg="secondary" pill>
                        <span>
                            Total protein:  {
                                calculateTotalValue('protein')
                            }g
                        </span>
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        Total Fat: {
                            calculateTotalValue('fat')
                        }g
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        Total Carbs: {
                            calculateTotalValue('carbs')
                        }g
                    </Badge>{' '}
                    <Badge bg="secondary" pill>
                        Total kcal: {
                            calculateTotalValue('kcal')
                        }
                    </Badge>{' '}
                </div>
            }
        </div>
    );
}

export default RecipeNutritionInfo;