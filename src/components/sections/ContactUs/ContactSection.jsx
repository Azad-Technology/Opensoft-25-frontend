import React from "react";
import { useState } from "react";
import { MessageSquare, Mail, Phone, MapPin, Send } from "lucide-react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (employee) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Here you would typically send the data to a server or API
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-overlay"></div>
      
      <div className="container contact-container">
        <div className="section-header animate-fade-up">
          <h2>Contact & Support</h2>
          <div className="underline"></div>
          <p>
            Have questions or need assistance? Our support team is here to help you navigate 
            our platform and address any concerns you may have.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="animate-fade-right">
            <div className="contact-info-card glass-card">
              <h3 className="form-heading">Get in Touch</h3>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-inner">
                    <div className="contact-method-icon-container">
                      <Mail className="contact-method-icon" />
                    </div>
                    <div className="contact-method-content">
                      <h4>Email</h4>
                      <p className="contact-method-description">For detailed inquiries or feedback</p>
                      <a href="mailto:support@deloitte-wellness.com" className="contact-method-action">
                        support@deloitte-wellness.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-inner">
                    <div className="contact-method-icon-container">
                      <Phone className="contact-method-icon" />
                    </div>
                    <div className="contact-method-content">
                      <h4>Phone</h4>
                      <p className="contact-method-description">Available Monday-Friday, 9am-5pm</p>
                      <a href="tel:+18005551234" className="contact-method-action">
                        +1 (800) 555-1234
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method-inner">
                    <div className="contact-method-icon-container">
                      <MapPin className="contact-method-icon" />
                    </div>
                    <div className="contact-method-content">
                      <h4>Visit Us</h4>
                      <p className="contact-method-description">
                        Deloitte Wellness Hub<br />
                        30 Rockefeller Plaza<br />
                        New York, NY 10112
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-left">
            <div className="contact-form-card glass-card">
              <h3 className="form-heading">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row form-row-split">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={1}
                    className="form-textarea"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary form-submit">
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
