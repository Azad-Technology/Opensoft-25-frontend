import React from "react";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
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
                <button className="btn-primary">
                  <span>Get Started</span>
                  <ArrowRight size={16} style={{ marginLeft: "0.5rem", transition: "transform 0.3s" }} />
                </button>
                <button className="btn-secondary">
                  Learn More
                </button>
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
