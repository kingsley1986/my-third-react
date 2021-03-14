import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="App">
    <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="danger"  style={{
   border:" 1px solid white",
   borderRadius:" 0px",
   boxShadow: "#888 10px 40px"}}variant="dark">
    <ReactBootStrap.Navbar.Brand href="#home">
      <img
        src="/logo-hosting.png" alt=""
        width="170"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto">
    <Link to="/features">
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}} href="#features">Home</ReactBootStrap.Nav.Link>

    </Link>
    <Link to="/pricing">
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#pricing">Programs Activities</ReactBootStrap.Nav.Link>
    </Link>
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#features">Events</ReactBootStrap.Nav.Link>
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#features">Blogs</ReactBootStrap.Nav.Link>
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#features">Gallleries</ReactBootStrap.Nav.Link>
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#features">Contacts</ReactBootStrap.Nav.Link>

    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
    <Link to="/deets">
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  href="#deets">Contacts</ReactBootStrap.Nav.Link>

    </Link>
    <Link to="/dankmemes">
    <ReactBootStrap.Nav.Link style={{color: "white", fontSize: "18px", fontWeight: "bolder"}}  eventKey={2} href="#memes">
        Info Contacts
      </ReactBootStrap.Nav.Link>
    </Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;
