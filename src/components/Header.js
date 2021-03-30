import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const NavBar = () => {
  return (
    <div className="App">
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" style={{
        background: "#35424a",
        color: "#ffffff", borderBottom: "#e8491d 4px solid"
      }} variant="dark">
        <ReactBootStrap.Navbar.Brand href="/">
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
            <Link to="/">
              <ReactBootStrap.Nav.Link style={{
                color: "#e8491d",
                fontWeight: "bold", fontSize: "18px", fontWeight: "bolder",
              }} href="/">Home</ReactBootStrap.Nav.Link>
            </Link>
            <Link to="/programs">
              <ReactBootStrap.Nav.Link style={{ color: "white", fontSize: "18px", fontWeight: "bolder", }} href="#pricing">Programs Activities</ReactBootStrap.Nav.Link>
            </Link>
            <ReactBootStrap.Nav.Link style={{
              color: "#e8491d",
              fontWeight: "bold", fontSize: "18px", fontWeight: "bolder",
            }} href="/events">Events</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link style={{ color: "white", fontSize: "18px", fontWeight: "bolder", }} href="/posts">Blogs</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link style={{
              color: "#e8491d",
              fontWeight: "bold", fontSize: "18px", fontWeight: "bolder",
            }} href="/galleries">Gallleries</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link style={{ color: "white", fontSize: "18px", fontWeight: "bolder", }} href="#features">Contacts</ReactBootStrap.Nav.Link>

          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
            <Link to="/deets">
              <ReactBootStrap.Nav.Link style={{
                color: "#e8491d",
                fontWeight: "bold", fontSize: "18px", fontWeight: "bolder", borderLeft: "2px dotted lightgrey",
              }} href="#deets">Contacts</ReactBootStrap.Nav.Link>

            </Link>
            <Link to="/dankmemes">
              <ReactBootStrap.Nav.Link style={{ color: "white", fontSize: "18px", fontWeight: "bolder", borderLeft: "2px dotted lightgrey", }} eventKey={2} href="#memes">
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
