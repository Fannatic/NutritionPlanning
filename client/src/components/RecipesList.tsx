import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllRecipesQuery, useGetXrefsForRecipesQuery, useDeleteRecipeMutation } from "../app/recipesApi";
import { useGetAllIngridientsQuery } from "../app/ingridientsApi";
import RecipeNutritionInfo from './RecipeNutritionInfo';
import { Recipe } from "../interfaces";
import Spinner from 'react-bootstrap/Spinner';
import { handleError } from '../helpers/errorHandler';

interface RecipesListProps {
  mode?: string;
  selectRecipe: (Recipe) => void;
  setOpenRecipesForm: (boolean) => void;
  setRecipeFormMode: (string) => void;
  setRecipeDataToUpdate: (Recipe) => void;
}

function RecipesList(props: RecipesListProps) {

  const { data: recipes, error: getRecipesError, isLoading } = useGetAllRecipesQuery();
  const { data: ingridients, error: getIngridientsError, isLoading: isLoadingIngridients } = useGetAllIngridientsQuery();
  const { data: xrefs, error: getXrefsError, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();
  const [deleteRecipe, { error: deleteRecipeError }] = useDeleteRecipeMutation();
  const { selectRecipe, setOpenRecipesForm, setRecipeFormMode, setRecipeDataToUpdate } = props;

  return (
    <div >
      <h3>Recipes List <Button onClick={() => { setOpenRecipesForm(true); setRecipeFormMode("Create"); setRecipeDataToUpdate({ name: '', steps: '' }) }} variant="link"><FaPlus /> </Button>{' '}</h3>
      <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
        {isLoading &&
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
        {getRecipesError || getIngridientsError || getXrefsError || deleteRecipeError ?
          handleError(getRecipesError || getIngridientsError || getXrefsError || deleteRecipeError) :
          (!isLoading && recipes && xrefs && ingridients && recipes.length) ?
            recipes.map((r: Recipe) =>
              <ListGroup.Item key={r.id}>
                <span style={{ fontSize: "24px" }}>{r.name}</span>
                <div style={{ display: "inline", float: "right" }}>
                  <Button variant="outline-dark" onClick={() => { selectRecipe(r); setOpenRecipesForm(true); }}><FaWrench /></Button>{' '}
                  <Button variant="outline-dark" onClick={() => deleteRecipe(r.id!.toString())}><FaTrash /></Button>{' '}
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