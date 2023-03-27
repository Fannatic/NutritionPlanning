import React from "react";
import { Nav } from "react-bootstrap";

export default function SideBar() {

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <h5 className="py-4">Main Menu</h5>
                <Nav.Item>
                    <p>Active</p>
                </Nav.Item>
                <Nav.Item>
                    <p>Active</p>
                </Nav.Item>
                <Nav.Item>
                    <p>Active</p>
                </Nav.Item>
            </Nav>
        </>
    );
};