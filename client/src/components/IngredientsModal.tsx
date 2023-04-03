import Modal from 'react-bootstrap/Modal';
import { useGetAllIngredientsQuery } from "../app/IngredientsApi";
import { useGetXrefsForRecipesQuery } from "../app/recipesApi";
import { Ingredient } from "../interfaces";
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function IngridientsModal(props) {

  const { data: ingridients, error: getError, isLoading } = useGetAllIngredientsQuery();
  const { data: xrefs, error: getErrorXrefs, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();

  const { addIngridient, id: RecipeId, show, close } = props;

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
          <Modal.Title>Add ingridients to recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
            {!isLoading && ingridients && xrefs &&
              ingridients.filter((i) =>
                !xrefs.filter(x => x.recipeId == RecipeId).find(y => y.ingridientId == i.id)
              ).map((x: Ingredient) =>
                <ListGroup.Item key={x.id}><span style={{ fontSize: "24px" }}>{x.name}</span> <span>{x.id}</span>
                  <div style={{ display: "inline", float: "right" }}>
                    <Button onClick={() => addIngridient(RecipeId, x.id)} variant="outline-dark">
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

export default IngridientsModal;