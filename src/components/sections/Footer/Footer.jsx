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
              {/* <a href="#" className="footer-social-link">
                <Facebook size={20} />
              </a> */}
              <a href="https://x.com/deloitteus" className="footer-social-link">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/lifeatdeloitteus/" className="footer-social-link">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/deloitte/" className="footer-social-link">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/user/DeloitteLLP" className="footer-social-link">
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
              <li><Link to="https://www2.deloitte.com/us/en/footerlinks1/privacy.html" className="footer-link">Privacy</Link></li>
              <li><Link to="https://www2.deloitte.com/us/en/footerlinks1/terms-of-use.html?icid=bottom_terms-of-use" className="footer-link">Terms of Use</Link></li>
              <li><Link to="https://cookienotice.deloitte.com/" className="footer-link">Cookies</Link></li>
              <li><Link to="https://www2.deloitte.com/us/en/footerlinks1/data-privacy-framework.html?icid=bottom_data-privacy-framework" className="footer-link">Data Privacy Framework</Link></li>
              <li><Link to="https://www2.deloitte.com/us/en/careers/life-at-deloitte.html?icid=bottom_life-at-deloitte" className="footer-link">Life at Deloitte</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-section-title">Contact Us</h3>
            <p className="footer-contact-text">
              Have questions or need assistance? Reach out to our support team.
            </p>
            <button className="footer-chat-button">
              <MessageSquare size={16} />
              <a href="#contact">Contact Us</a>
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
