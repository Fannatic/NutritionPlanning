import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { FaPlus } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';

const data =
    [
        {
            name: "Monday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        },
        {
            name: "Tuesday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        },
        {
            name: "Wednesday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        },
        {
            name: "Thursday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        },
        {
            name: "Friday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        }, {
            name: "Satruday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        },
        {
            name: "Sunday",
            recipes: [
                {
                    index: 0,
                    name: "Recipe 1",
                    nutrition: [

                    ]
                }, {
                    index: 2,
                    name: "Recipe 2",
                    nutrition: [

                    ]
                },
                {
                    index: 3,
                    name: "Recipe 3",
                    nutrition: [

                    ]
                }
            ]
        }]

function PlanComponent() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Row>
            {data.map((x: any) =>
                <Col>
                    <span>{x.name}</span>{' '}<Button variant="link"><FaPlus/> </Button>
                    <Accordion>
                        {
                            x!.recipes.map((r: any) =>
                                <Accordion.Item eventKey={r.index}>
                                    <Accordion.Header>{r.name}</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }
                    </Accordion>
                </Col>
            )}
        </Row>
    );
}

export default PlanComponent;
