import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaWrench, FaTrash, FaPlus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useGetAllIngridientsQuery, useDeleteIngridientMutation } from "./../app/ingridientsApi";

interface IngridientsListProps {
    mode?: string,
    selectIngridient: (Ingridient) => void
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

//MODE: Add, Remove/Update
function IngridientsList(props: IngridientsListProps) {

    const { data, error: getError, isLoading } = useGetAllIngridientsQuery();
    const [ deleteIngidient, { error: postError }] = useDeleteIngridientMutation();


    
    const { mode, selectIngridient } = props;

    return (
        <div>
            <h3>Ingridients List
                <Button variant="link">
                    <FaPlus /> 
                </Button>{' '}
            </h3>
            <ListGroup style={{ maxHeight: "350px", overflowY: "scroll" }} variant="flush">
                {!isLoading &&
                    data.data.map((x) => 
                        <ListGroup.Item><span style={{ fontSize: "24px" }}>{x.name}</span> <span>{x.id}</span>
                            <div style={{ display: "inline", float: "right" }}>
                                <Button variant="outline-dark" onClick={() => selectIngridient(x)} >
                                    <FaWrench />
                                </Button>{' '}
                                <Button variant="outline-dark" onClick={() => deleteIngidient(x.id)}>
                                    <FaTrash />
                                </Button>{' '}
                            </div> 
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>
    );
}


export default IngridientsList;