import React from "react";
import { useAuth } from "./../../../contexts/AuthContext"
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  const { user } = useAuth();
  return (
    <section className="hero-section" id="hero">
      <div className="hero-overlay"></div>
      
      <div className="hero-pattern">
        <div className="hero-pattern-inner"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fade-right">
            <div className="hero-text-inner">
              <h1 className="hero-heading">
                We <span className="hero-highlight">Care</span><span className="hero-highlight">.</span>
              </h1>
              <p className="hero-description">
                about how our employees are doing, and we 
                want to solve it together as a community
              </p>
              <div className="hero-buttons">
                {user && (
                  <>
                    {user.role === "employee" && (
                      <Link to="/employee/dashboard">
                        <button className="btn-primary">
                          <span>Dashboard</span>
                          <ArrowRight size={16} style={{ marginLeft: "0.5rem", transition: "transform 0.3s" }} />
                        </button>
                      </Link>
                    )}

                    {user.role === "hr" && (
                      <Link to="/admin/dashboard">
                        <button className="btn-primary">
                          <span>Dashboard</span>
                          <ArrowRight size={16} style={{ marginLeft: "0.5rem", transition: "transform 0.3s" }} />
                        </button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-left">
            <div className="hero-visual-container">
              <div className="circle-glow"></div>
              <div className="circle-main">
                <div className="circle-pulse"></div>
                <div className="circle-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-box">
          <div className="scroll-dot"></div>
        </div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
