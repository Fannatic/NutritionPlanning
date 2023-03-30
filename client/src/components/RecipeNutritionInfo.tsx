import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllIngridientsQuery, useDeleteIngridientMutation } from "../app/ingridientsApi";
import Badge from 'react-bootstrap/Badge';

interface RecipeNutritionInfoProps {
    //Create or Update
    editedRecipe: any;
    xrefs: any;
    ingridients: any;
}

function RecipeNutritionInfo(props: RecipeNutritionInfoProps) {

    const { editedRecipe, xrefs, ingridients } = props;

    const calculateTotalValue = (name) =>{
        return xrefs.data.filter(x => x.recipeId == editedRecipe.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z[name]).reduce((accumulator, current) => accumulator + current, 0)
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