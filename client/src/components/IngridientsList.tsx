import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllIngridientsQuery, useDeleteIngridientMutation } from "../app/ingridientsApi";

interface IngridientsListProps {
    mode?: string,
    selectIngridient: (Ingridient) => void;
    setOpenIngridientForm: any;
    setIngridientDataToUpdate: any;
    setIngridientFormMode: any;
}

interface Ingridient {
    id: number;
    name: string;
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
    unitId: number;
}

function IngridientsList(props: IngridientsListProps) {

    const { data, error: getError, isLoading } = useGetAllIngridientsQuery();
    const [ deleteIngidient, { error: postError }] = useDeleteIngridientMutation();
    const { mode, selectIngridient, setOpenIngridientForm, setIngridientFormMode, setIngridientDataToUpdate} = props;

    return (
        <div>
            <h3>Ingridients List
                <Button onClick={() => {setOpenIngridientForm(true); setIngridientFormMode("Create"); setIngridientDataToUpdate(null)}} variant="link">
                    <FaPlus /> 
                </Button>{' '}
            </h3>
            <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                {!isLoading && data.data.length ?
                    data.data.map((x) => 
                        <ListGroup.Item><span style={{ fontSize: "24px" }}>{x.name}</span> <span>{x.id}</span>
                            <div style={{ display: "inline", float: "right" }}>
                                <Button variant="outline-dark" onClick={() => {selectIngridient(x); setOpenIngridientForm(true);} }>
                                    <FaWrench />
                                </Button>{' '}
                                <Button variant="outline-dark" onClick={() => deleteIngidient(x.id)}>
                                    <FaTrash />
                                </Button>{' '}
                            </div> 
                        </ListGroup.Item>
                    ) :
                    <h5>No records</h5>
                }
            </ListGroup>
        </div>
    );
}


export default IngridientsList;