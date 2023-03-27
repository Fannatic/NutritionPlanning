import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllRecipesQuery, useGetXrefsForRecipesQuery, useDeleteRecipeMutation } from "./../app/recipesApi";
import { useGetAllIngridientsQuery } from "./../app/ingridientsApi";

interface RecipesListProps {
    //Add List, 
    mode?: string
    selectRecipe: (Recipe) => void

}

function RecipesList(props: RecipesListProps) {
    
    const { data, error: getError, isLoading } = useGetAllRecipesQuery();

    const { data: ingridients, error: getIngridientsError, isLoading: isLoadingIngridients} = useGetAllIngridientsQuery();
    const { data: xrefs, error: getXrefsError, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();
    const [ deleteRecipe, { error: deleteError }] = useDeleteRecipeMutation();


    const { mode, selectRecipe } = props;

    return (
        <div >
            <h3>Recipes List <Button variant="link"><FaPlus/> </Button>{' '}</h3>
            <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                 {!isLoading &&
                    data.data.map((r) => 
                    <ListGroup.Item>
                    <span style={{ fontSize: "24px" }}>{r.name}</span>
                    <div style={{ display: "inline", float: "right" }}>
                        <Button variant="outline-dark" onClick={() => selectRecipe(r)}><FaWrench /></Button>{' '}
                        <Button variant="outline-dark" onClick={() => deleteRecipe(r.id)}><FaTrash /></Button>{' '}
                    </div>
                    <div className="mb-2">
                    <Badge bg="secondary" pill>
            Total protein:  { ingridients && xrefs && 
              xrefs.data.filter(x => x.recipeId == r.id).map(y => ingridients.data.find( ({id}) => id == y.ingridientId)).map(z=> z.protein).reduce((accumulator, current) => accumulator + current, 0)
            }g</Badge>{' '}
          <Badge bg="secondary" pill>
            Total Fat: { ingridients && xrefs && 
              xrefs.data.filter(x => x.recipeId == r.id).map(y => ingridients.data.find( ({id}) => id == y.ingridientId)).map(z=> z.fat).reduce((accumulator, current) => accumulator + current, 0)
            }g
          </Badge>{' '}
          <Badge bg="secondary" pill>
            Total Carbs: { ingridients && xrefs && 
              xrefs.data.filter(x => x.recipeId == r.id).map(y => ingridients.data.find( ({id}) => id == y.ingridientId)).map(z=> z.carbs).reduce((accumulator, current) => accumulator + current, 0)
            }g
          </Badge>{' '}
          <Badge bg="secondary" pill>
            Total kcal: { ingridients && xrefs && 
              xrefs.data.filter(x => x.recipeId == r.id).map(y => ingridients.data.find( ({id}) => id == y.ingridientId)).map(z=> z.kcal).reduce((accumulator, current) => accumulator + current, 0)
            }
          </Badge>{' '}
                    </div></ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>
    );
}


export default RecipesList;