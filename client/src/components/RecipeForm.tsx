import React, { useState, useEffect, useRef } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus, FaTrash } from "react-icons/fa";
import { useGetXrefsForRecipesQuery, useDeleteXrefMutation, useAddXrefMutation, useUpdateRecipeMutation, useAddRecipeMutation } from "../app/recipesApi";
import { useGetAllIngridientsQuery } from "../app/ingridientsApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import IngridientsModal from './IngridientsModal';

interface RecipeFormProps {
  //Create or Update
  mode?: string,
  dataToUpdate?: any;
  setRecipeFormMode: any;
  setRecipeDataToUpdate: any;
  setOpenRecipesForm: any;
}

function RecipeForm(props: RecipeFormProps) {
  const [validated, setValidated] = useState(false);
  const [editedData, setEditedData] = useState<any>(undefined);
  const [fadeOut, setFadeOut] = useState<any>(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: ingridients, error: getIngridientsError, isLoading: isLoadingIngridients } = useGetAllIngridientsQuery();

  const { data, error: getError, isLoading } = useGetXrefsForRecipesQuery();
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
    const proteins = data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.protein).reduce((accumulator, current) => accumulator + current, 0)
    const fats = data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.fat).reduce((accumulator, current) => accumulator + current, 0)
    const carbs = data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.carbs).reduce((accumulator, current) => accumulator + current, 0)
    const kcal = data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.kcal).reduce((accumulator, current) => accumulator + current, 0)
    const temp = {
      proteins,
      fats,
      carbs,
      kcal
    }
    const temp2 = {
      ...editedData,
      ...temp
    }
    setEditedData(temp2);
  }

  return (
    <div className={!fadeOut ? "fadeIn" : ""}>
      <h3>Recipe Form</h3>
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
              {(!isLoading && editedData) &&
                data.data.filter(x => x.recipeId == editedData.id).map(x =>
                  <ListGroup.Item>{ingridients.data.find(i => i.id == x.ingridientId).name}{' '}
                    <Button variant="outline-dark" onClick={() => {
                      deleteXref(x.id);
                      recalculatedNutritionData();
                    }}>
                      <FaTrash />
                    </Button>{' '}
                    {/* <Badge bg="secondary" pill>
                  5
                </Badge> */}
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
        {editedData && data.data.filter(x => x.recipeId == editedData.id) &&
          <div className="mb-2">
            <Badge bg="secondary" pill>
              Total protein:  {ingridients && data && editedData &&
                data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.protein).reduce((accumulator, current) => accumulator + current, 0)
              }g</Badge>{' '}
            <Badge bg="secondary" pill>
              Total Fat: {ingridients && data && editedData &&
                data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.fat).reduce((accumulator, current) => accumulator + current, 0)
              }g
            </Badge>{' '}
            <Badge bg="secondary" pill>
              Total Carbs: {ingridients && data && editedData &&
                data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.carbs).reduce((accumulator, current) => accumulator + current, 0)
              }g
            </Badge>{' '}
            <Badge bg="secondary" pill>
              Total kcal: {ingridients && data && editedData &&
                data.data.filter(x => x.recipeId == editedData.id).map(y => ingridients.data.find(({ id }) => id == y.ingridientId)).map(z => z.kcal).reduce((accumulator, current) => accumulator + current, 0)
              }
            </Badge>{' '}
          </div>
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