import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaTrash } from "react-icons/fa";
import { useGetXrefsForRecipesQuery, useDeleteXrefMutation, useAddXrefMutation, useUpdateRecipeMutation, useAddRecipeMutation } from "../app/recipesApi";
import { useGetAllIngredientsQuery } from "../app/IngredientsApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import IngridientsModal from './IngredientsModal';
import RecipeNutritionInfo from './RecipeNutritionInfo';
import { Recipe } from "../interfaces";
import { handleError } from '../helpers/errorHandler';


interface RecipeFormProps {
  mode?: string;
  dataToUpdate: Partial<Recipe>;
  setRecipeFormMode: (string) => void;
  setRecipeDataToUpdate: (Recipe) => void;
  setOpenRecipesForm: (boolean) => void;
}

function RecipeForm(props: RecipeFormProps) {
  const [validated, setValidated] = useState(false);
  const [editedData, setEditedData] = useState<any>(undefined);
  const [fadeOut, setFadeOut] = useState<any>(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: ingridients, error: getIngridientsError, isLoading: isLoadingIngridients } = useGetAllIngredientsQuery();

  const { data: xrefs, error: getXrefsError, isLoading } = useGetXrefsForRecipesQuery();

  const [addXref, { error: addXrefError }] = useAddXrefMutation();
  const [deleteXref, { error: deleteXrefError }] = useDeleteXrefMutation();
  const [updateRecipe, { error: updateRecipeError }] = useUpdateRecipeMutation();
  const [addRecipe, { error: addRecipeError }] = useAddRecipeMutation();

  const { mode, dataToUpdate, setRecipeFormMode, setRecipeDataToUpdate, setOpenRecipesForm } = props;

  useEffect(() => {
    setEditedData(dataToUpdate);
  }, [dataToUpdate]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleDataChange = (e: any) => {
    const { name, value } = e.target;
    const data = {
      ...editedData,
      [name]: value,
    }
    setEditedData(data);
  }

  const update = () => {
    setFadeOut(true);
    updateRecipe(editedData);
  }

  const add = () => {
    setFadeOut(true);
    addRecipe(editedData);
    setRecipeFormMode("Create");
    setEditedData(editedData);
    setOpenRecipesForm(false);
  }

  const close = () => {
    setOpenRecipesForm(false);
  }

  const addIngridient = (rId, iId) => {
    addXref({ recipeId: rId, ingridientId: iId });
    recalculatedNutritionData();
  }

  const recalculatedNutritionData = () => {
    const proteins = ingridients && xrefs && xrefs.filter(x => x.recipeId == editedData.id).map(y => ingridients.find(({ id }) => id == y.ingridientId)).map(z => z!.protein).reduce((accumulator, current) => accumulator + current, 0)
    const fats = ingridients && xrefs && xrefs.filter(x => x.recipeId == editedData.id).map(y => ingridients.find(({ id }) => id == y.ingridientId)).map(z => z!.fat).reduce((accumulator, current) => accumulator + current, 0)
    const carbs = ingridients && xrefs && xrefs.filter(x => x.recipeId == editedData.id).map(y => ingridients.find(({ id }) => id == y.ingridientId)).map(z => z!.carbs).reduce((accumulator, current) => accumulator + current, 0)
    const kcal = ingridients && xrefs && xrefs.filter(x => x.recipeId == editedData.id).map(y => ingridients.find(({ id }) => id == y.ingridientId)).map(z => z!.kcal).reduce((accumulator, current) => accumulator + current, 0)
    const calculatedNutritions = {
      proteins,
      fats,
      carbs,
      kcal
    }
    const newRecalculatedRecipe = {
      ...editedData,
      ...calculatedNutritions
    }
    setEditedData(newRecalculatedRecipe);
  }

  return (
    <div className={!fadeOut ? "fadeIn" : ""}>
      <h3>Recipe Form</h3>
      {getIngridientsError || getXrefsError || addXrefError || deleteXrefError || updateRecipeError || addRecipeError &&
        handleError(getIngridientsError || getXrefsError || addXrefError || deleteXrefError || updateRecipeError || addRecipeError)
      }
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Recipe name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Recipe name"
              name="name"
              value={editedData && editedData.name || ''}
              onChange={(e) => handleDataChange(e)}
            />
            <Form.Control.Feedback type="invalid">
              Please set a value.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Ingridents
              <span style={{ display: "inline-flex" }}>
                <Button disabled={mode != "Update"} onClick={handleShow} variant="link">
                  <FaPlus />
                </Button>{' '}
              </span></Form.Label>
            <ListGroup>
              {!isLoading && editedData && xrefs &&
                xrefs.filter(x => x.recipeId == editedData.id).map(x =>
                  <ListGroup.Item key={x.id}>{ingridients && ingridients.length && ingridients.find(i => i.id == x.ingridientId)!.name}{' '}
                    <Button variant="outline-dark" onClick={() => {
                      deleteXref(x.id.toString());
                      recalculatedNutritionData();
                    }}>
                      <FaTrash />
                    </Button>{' '}
                  </ListGroup.Item>)
              }
            </ListGroup> <br />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Steps</Form.Label>
            <Form.Control as="textarea" name="steps"
              onChange={(e) => handleDataChange(e)}
              rows={4} value={editedData && editedData.steps || ''} />
          </Form.Group>
        </Row>
        {editedData && ingridients && xrefs && xrefs.filter(x => x.recipeId == editedData.id) &&
          <RecipeNutritionInfo editedRecipe={editedData} xrefs={xrefs} ingridients={ingridients} />
        }
        <Button
          onClick={
            mode == "Update" ?
              () => update() : () => add()
          }>
          {
            mode == "Update" ?
              "Update recipe" : "Add recipe"
          }
        </Button>{' '}
        <Button onClick={() => close()}>
          Close
        </Button>{' '}
      </Form>
      {editedData &&
        <IngridientsModal show={show} close={handleClose} id={editedData.id} addIngridient={addIngridient} />
      }
    </div>
  );
}


export default RecipeForm;