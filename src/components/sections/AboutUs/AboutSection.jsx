import React from "react";
import { CheckCircle } from "lucide-react";
import "./AboutSection.css";

const features = [
  "Evidence-based wellness assessments",
  "Privacy-first data architecture",
  "Actionable personal insights",
  "Organizational health analytics",
  "Continuous improvement methodology",
  "Compliance with global standards",
];

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-overlay"></div>

      <div className="about-pattern">
        <div className="about-pattern-inner"></div>
      </div>

      <div className="container">
        <div className="about-content">
          <div className="about-text animate-fade-right">
            <h2 className="about-heading">About Us</h2>
            <div className="about-underline"></div>

            <p className="about-paragraph">
              At Mindflix, we believe that employee wellness is fundamental to
              organizational success. Our platform represents our commitment to
              fostering a workplace where every individual can thrive both
              personally and professionally.
            </p>

            <p className="about-paragraph">
              By combining cutting-edge technology with evidence-based wellness
              practices, we've created a comprehensive solution that benefits
              both employees and organizations. Our approach is rooted in
              privacy, actionable insights, and continuous improvement.
            </p>

            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <CheckCircle className="feature-icon" />
                  <span className="feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-visual animate-fade-left">
            <div className="vision-card-container">
              <div className="vision-card-glow"></div>
              <div className="vision-card glass-card">
                <div className="vision-card-accent-1"></div>
                <div className="vision-card-accent-2"></div>

                <h3 className="vision-heading">Our Vision</h3>
                <p className="vision-paragraph">
                  We envision a future where workplace wellness is integral to
                  organizational culture, where employees feel valued,
                  supported, and empowered to bring their best selves to work
                  every day.
                </p>

                <div className="quote-box">
                  <blockquote className="quote-text">
                    "At Mindflix, we understand that our greatest asset is our
                    people. This platform represents our investment in their
                    wellbeing and our commitment to creating a workplace where
                    everyone can thrive."
                  </blockquote>
                  <div className="quote-author">
                    <div className="author-avatar">
                      <span className="author-initials">JD</span>
                    </div>
                    <div className="author-info">
                      <p className="author-name">Jane Doe</p>
                      <p className="author-role">Chief Wellness Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
