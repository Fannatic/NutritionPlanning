import Modal from 'react-bootstrap/Modal';
import { useGetAllIngridientsQuery } from "../app/ingridientsApi";
import { useGetXrefsForRecipesQuery } from "../app/recipesApi";

import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function IngridientsModal(props) {

    const { data, error: getError, isLoading } = useGetAllIngridientsQuery();
    const { data: xrefs, error: getErrorXrefs, isLoading: isLoadingXrefs } = useGetXrefsForRecipesQuery();

    const {addIngridient, id:RecipeId, show, close} = props;

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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                {!isLoading &&
                    data.data.filter((i) => 
                        !xrefs.data.filter(x => x.recipeId == RecipeId).find(y => y.ingridientId  == i.id)
                    ).map((x) => 
                        <ListGroup.Item><span style={{ fontSize: "24px" }}>{x.name}</span> <span>{x.id}</span>
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