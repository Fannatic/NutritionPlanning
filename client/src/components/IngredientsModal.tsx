import Modal from 'react-bootstrap/Modal';
import { useGetAllIngredientsQuery } from "../app/IngredientsApi";
import { useGetXrefsForRecipesQuery } from "../app/recipesApi";
import { Ingredient } from "../interfaces";
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function IngredientsModal(props) {

  const { data: ingredients, error: getError, isLoading } = useGetAllIngredientsQuery();
  const { data: xrefs, error: getErrorXrefs, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();

  const { addIngredient, id: RecipeId, show, close } = props;

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add ingredients to recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
            {!isLoading && ingredients && xrefs &&
              ingredients.filter((i) =>
                !xrefs.filter(x => x.recipeId == RecipeId).find(y => y.ingredientId == i.id)
              ).map((x: Ingredient) =>
                <ListGroup.Item key={x.id}><span style={{ fontSize: "24px" }}>{x.name}</span> <span>{x.id}</span>
                  <div style={{ display: "inline", float: "right" }}>
                    <Button onClick={() => addIngredient(RecipeId, x.id)} variant="outline-dark">
                      <FaPlus />
                    </Button>{' '}
                  </div>
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IngredientsModal;