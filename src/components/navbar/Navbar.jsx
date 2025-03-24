import React from "react";
import { Sun } from "lucide-react";
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="w-screen">
      <div className="logo">
        <span>Deloitte</span><span className="dot">.</span>
      </div>
      <ul>
        <li>Smart Contracts</li>
        <li>Services</li>
        <li>Solutions</li>
        <li>Roadmap</li>
        <li>Whitepaper</li>
      </ul>
      <div className="actions">
        <button className="theme-toggle">
          <Sun />
        </button>
        <button className="login">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
