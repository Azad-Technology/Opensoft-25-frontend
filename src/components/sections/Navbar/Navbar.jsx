import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">
            <span className="navbar-brand-text">Deloitte</span>
            <span className="navbar-dot">.</span>
          </Link>
        </div>

        {/* Profile/Login Button */}
        <div className="navbar-actions">
          <div className="navbar-profile">
            <User size={18} className="navbar-profile-icon" />
          </div>
          <Link to="/login">
            <button className="navbar-login-button">Login</button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-actions">
            <div className="navbar-profile">
              <User size={18} className="navbar-profile-icon" />
            </div>
            <Link to="/login">
              <button className="navbar-login-button">Login</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
