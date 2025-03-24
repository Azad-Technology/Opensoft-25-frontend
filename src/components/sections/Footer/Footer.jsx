import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageSquare 
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand">
              <span className="footer-brand-text">Deloitte</span>
              <span className="footer-brand-dot">.</span>
            </Link>
            <p className="footer-description">
              We're committed to enhancing employee wellness through innovative, data-driven solutions that respect privacy and deliver actionable insights.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer-social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="footer-social-link">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/" className="footer-link">About Us</Link></li>
              <li><Link to="/" className="footer-link">Services</Link></li>
              <li><Link to="/" className="footer-link">Blog</Link></li>
              <li><Link to="/" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/" className="footer-link">Cookie Policy</Link></li>
              <li><Link to="/" className="footer-link">GDPR Compliance</Link></li>
              <li><Link to="/" className="footer-link">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-section-title">Contact Us</h3>
            <p className="footer-contact-text">
              Have questions or need assistance? Reach out to our support team.
            </p>
            <button className="footer-chat-button">
              <MessageSquare size={16} />
              <span>Start Live Chat</span>
            </button>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            © {new Date().getFullYear()} Deloitte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
