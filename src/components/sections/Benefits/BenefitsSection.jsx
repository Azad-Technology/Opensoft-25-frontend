import React from "react";
import { Heart, Search, FileText, Shield } from "lucide-react";
import "./BenefitsSection.css";

const benefits = [
  {
    icon: <Heart className="benefit-icon" />,
    title: "Comprehensive Well-being Assessment",
    description: "Holistic evaluation of physical, mental, and emotional health factors to provide a complete wellness profile for each employee."
  },
  {
    icon: <Search className="benefit-icon" />,
    title: "Personalized Actionable Insights",
    description: "Tailored recommendations based on individual assessment results, providing clear steps for improvement."
  },
  {
    icon: <FileText className="benefit-icon" />,
    title: "Data-Driven Reports for HR & Management",
    description: "Comprehensive analytics and reporting tools to help leadership understand workforce wellness trends while maintaining individual privacy."
  },
  {
    icon: <Shield className="benefit-icon" />,
    title: "Confidential & Secure Analysis",
    description: "State-of-the-art security measures ensure all personal health information remains private and protected at all times."
  }
];

const BenefitsSection = () => {
  return (
    <section className="benefits-section" id="benefits">
      <div className="overlay"></div>
      
      <div className="container">
        <div className="section-header">
          <h2>Key Benefits</h2>
          <div className="underline"></div>
          <p>
            Our platform offers comprehensive tools and insights designed to enhance workplace wellness 
            and drive organizational success through employee well-being.
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="icon-container">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;