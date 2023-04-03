import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllIngredientsQuery, useDeleteIngredientMutation } from "../app/IngredientsApi";
import { Ingredient } from "../interfaces";
import Spinner from 'react-bootstrap/Spinner';
import { handleError } from '../helpers/errorHandler';
import Modal from 'react-bootstrap/Modal';

interface IngredientsListProps {
    mode?: string;
    selectIngredient: (Ingredient) => void;
    setOpenIngredientForm: (boolean) => void;
    setIngredientDataToUpdate: (Ingrident) => void;
    setIngredientFormMode: (string) => void;
}

function IngredientsList(props: IngredientsListProps) {

    const { data: Ingredients, error: getIngredientsError, isLoading } = useGetAllIngredientsQuery();
    const [deleteIngidient, { error: deleteIngidientError }] = useDeleteIngredientMutation();
    const { mode, selectIngredient, setOpenIngredientForm, setIngredientFormMode, setIngredientDataToUpdate } = props;
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<string>(``);

    const handleConfirmModal = (x) => {
        setShowConfirmModal(true);
        setIdToDelete(x)
    }

    return (
        <div>
            <Modal
                show={showConfirmModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Are you sure?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Your are going to delete this data...</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { deleteIngidient(idToDelete); setShowConfirmModal(false); setIdToDelete(''); }}>Delete</Button>
                    <Button onClick={() => setShowConfirmModal(false)}>Cancel</Button>

                </Modal.Footer>
            </Modal>
            <h3>Ingredients List
                <Button onClick={() => { setOpenIngredientForm(true); setIngredientFormMode("Create"); setIngredientDataToUpdate(null) }} variant="link">
                    <FaPlus />
                </Button>{' '}
            </h3>
            <div>
            </div>
            {
                isLoading ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    getIngredientsError ?
                        handleError(getIngredientsError) :

                        <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                            {(Ingredients && Ingredients.length) ?
                                Ingredients.map((x: Ingredient) =>
                                    <ListGroup.Item key={x.id}><span style={{ fontSize: "24px" }}>{x.name}</span>
                                        <div style={{ display: "inline", float: "right" }}>
                                            <Button variant="outline-dark" onClick={() => { selectIngredient(x); setOpenIngredientForm(true); }}>
                                                <FaWrench />
                                            </Button>{' '}
                                            <Button variant="outline-dark"
                                                onClick={() => handleConfirmModal(x.id.toString())}

                                            >
                                                <FaTrash />
                                            </Button>{' '}
                                        </div>
                                    </ListGroup.Item>
                                ) :
                                <h5>No Records</h5>
                            }
                        </ListGroup>
            }


        </div>
    );
}


export default IngredientsList;