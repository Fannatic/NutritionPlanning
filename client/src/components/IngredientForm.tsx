import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAddIngredientMutation, useUpdateIngredientMutation } from '../app/IngredientsApi';
import { Ingredient } from "../interfaces";
import { handleError } from '../helpers/errorHandler';

interface IngredientFormProps {
    mode?: string;
    callback?: void;
    dataToUpdate: Partial<Ingredient>;
    setIngredientFormMode: (string) => void;
    setIngredientDataToUpdate: (Ingredient) => void;
    setOpenIngredientForm: (boolean) => void;
}

function IngredientForm(props: IngredientFormProps) {
    const [validated, setValidated] = useState(false);
    const [editedData, setEditedData] = useState<Partial<Ingredient>>({});
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const { mode, dataToUpdate, setOpenIngredientForm } = props;

    const [addIngredient, { error: addIngredientError }] = useAddIngredientMutation();
    const [updateIngredient, { error: updateIngredientError }] = useUpdateIngredientMutation();

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
        setEditedData(data)
    }

    const handleRequest = () => {
        setFadeOut(true);
        mode == "Update" ?
            updateIngredient(editedData) : addIngredient(editedData)
        setOpenIngredientForm(false);
    }


    return (
        <div className={!fadeOut ? "fadeIn" : ""}>
            <h3>Ingrident Form</h3>
            {(addIngredientError || updateIngredientError) &&
                handleError(addIngredientError || updateIngredientError)
            }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Ingredient name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ingredient name"
                            value={editedData && editedData.name || ''}
                            onChange={handleDataChange}
                            name="name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please set a value.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Protein</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Protein"
                            value={editedData && editedData.protein || ''}
                            onChange={handleDataChange}
                            name="protein"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please set a value.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Fat</Form.Label>
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Fat"
                                value={editedData && editedData.fat || ''}
                                onChange={handleDataChange}
                                name="fat"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please set a value.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Carbohydrates</Form.Label>
                        <Form.Control type="text" placeholder="Carbohydrates" required
                            value={editedData && editedData.carbs || ''}
                            onChange={handleDataChange}
                            name="carbs"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please set a value.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>kcal</Form.Label>
                        <Form.Control type="text" placeholder="kcal" required
                            value={editedData && editedData.kcal || ''}
                            onChange={handleDataChange}
                            name="kcal"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please set a value.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Unit</Form.Label>
                        <Form.Control type="text" placeholder="Unit" required
                            value={editedData && editedData.unitId || ''}
                            onChange={handleDataChange}
                            name="unitId"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please set a value.
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>
                <Button disabled={validated} onClick={handleRequest}>
                    {
                        mode == "Update" ?
                            "Update ingredient" : "Add ingredient"
                    }
                </Button>
                {' '}
                <Button onClick={() => setOpenIngredientForm(false)}>
                    Close
                </Button>


            </Form>
        </div>
    );
}


export default IngredientForm;