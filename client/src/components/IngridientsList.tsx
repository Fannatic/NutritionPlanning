import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllIngridientsQuery, useDeleteIngridientMutation } from "../app/ingridientsApi";
import { Ingridient } from "../interfaces";
import Spinner from 'react-bootstrap/Spinner';
import { handleError } from '../helpers/errorHandler';
import Modal from 'react-bootstrap/Modal';

interface IngridientsListProps {
    mode?: string;
    selectIngridient: (Ingridient) => void;
    setOpenIngridientForm: (boolean) => void;
    setIngridientDataToUpdate: (Ingrident) => void;
    setIngridientFormMode: (string) => void;
}

function IngridientsList(props: IngridientsListProps) {

    const { data: ingridients, error: getIngridientsError, isLoading } = useGetAllIngridientsQuery();
    const [deleteIngidient, { error: deleteIngidientError }] = useDeleteIngridientMutation();
    const { mode, selectIngridient, setOpenIngridientForm, setIngridientFormMode, setIngridientDataToUpdate } = props;
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
            <h3>Ingridients List
                <Button onClick={() => { setOpenIngridientForm(true); setIngridientFormMode("Create"); setIngridientDataToUpdate(null) }} variant="link">
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
                    getIngridientsError ?
                        handleError(getIngridientsError) :

                        <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                            {(ingridients && ingridients.length) ?
                                ingridients.map((x: Ingridient) =>
                                    <ListGroup.Item key={x.id}><span style={{ fontSize: "24px" }}>{x.name}</span>
                                        <div style={{ display: "inline", float: "right" }}>
                                            <Button variant="outline-dark" onClick={() => { selectIngridient(x); setOpenIngridientForm(true); }}>
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


export default IngridientsList;