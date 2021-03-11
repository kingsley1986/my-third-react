import React from "react";

export default function Header() {
  
  return (
    <div>
      <header className="header">
        <a href className="logo">
          <img
            src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
            className="logoimage"
          />
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <ul className="menu">
          <li className="contactme">
            <a href="/events">Events</a>
          </li>
          <li className="aboutme">
            <a href="/programs">Programs</a>
          </li>
          <li className="projects">
            <a href="/posts">Posts</a>
          </li>
          <li className="Home">
            <a href="/" className="Home">
              Home
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}
