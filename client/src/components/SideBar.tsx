import React from "react";
import { Nav } from "react-bootstrap";

export default function SideBar(props) {

    const { setActiveSlice } = props;

    return (
        <Nav className="d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        >
            <div className="sidebar-sticky"></div>
            <Nav.Item>
                <button onClick={() => setActiveSlice("Ingredients")} className="custom-button-style">Ingredients</button>
            </Nav.Item>
            <Nav.Item>
                <button onClick={() => setActiveSlice("Recipes")} className="custom-button-style">Recipes</button>
            </Nav.Item>
            <Nav.Item>
                <button disabled className="custom-button-style">Units</button>
            </Nav.Item>
            <Nav.Item>
                <button disabled className="custom-button-style">Plans</button>
            </Nav.Item>
        </Nav>
    );
};