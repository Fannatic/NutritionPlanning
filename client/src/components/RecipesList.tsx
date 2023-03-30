import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllRecipesQuery, useGetXrefsForRecipesQuery, useDeleteRecipeMutation } from "../app/recipesApi";
import { useGetAllIngridientsQuery } from "../app/ingridientsApi";
import RecipeNutritionInfo from './RecipeNutritionInfo';

interface RecipesListProps {
  mode?: string
  selectRecipe: (Recipe) => void
  setOpenRecipesForm: any;
  setRecipeFormMode: any;
  setRecipeDataToUpdate: any;
}

function RecipesList(props: RecipesListProps) {

  const { data, error: getError, isLoading } = useGetAllRecipesQuery();
  const { data: ingridients, error: getIngridientsError, isLoading: isLoadingIngridients } = useGetAllIngridientsQuery();
  const { data: xrefs, error: getXrefsError, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();
  const [deleteRecipe, { error: deleteError }] = useDeleteRecipeMutation();

  const { mode, selectRecipe, setOpenRecipesForm, setRecipeFormMode, setRecipeDataToUpdate } = props;

  return (
    <div >
      <h3>Recipes List <Button onClick={() => { setOpenRecipesForm(true); setRecipeFormMode("Create"); setRecipeDataToUpdate({ name: '', steps: '' }) }} variant="link"><FaPlus /> </Button>{' '}</h3>
      <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
        {!isLoading && data.data.length ?
          data.data.map((r) =>
            <ListGroup.Item>
              <span style={{ fontSize: "24px" }}>{r.name}</span>
              <div style={{ display: "inline", float: "right" }}>
                <Button variant="outline-dark" onClick={() => { selectRecipe(r); setOpenRecipesForm(true); }}><FaWrench /></Button>{' '}
                <Button variant="outline-dark" onClick={() => deleteRecipe(r.id)}><FaTrash /></Button>{' '}
              </div>
              <div className="mb-2">
                <RecipeNutritionInfo editedRecipe={r} xrefs={xrefs} ingridients={ingridients} />
              </div>
            </ListGroup.Item>
          ) :
          <h5>No records</h5>
        }
      </ListGroup>
    </div>
  );
}


export default RecipesList;