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
            <h5 className="py-4">Main Menu</h5>
            <Nav.Item>
                <button onClick={() => setActiveSlice("Ingridients")} className="custom-button-style">Ingridients</button>
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