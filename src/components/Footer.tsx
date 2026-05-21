import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>CaRs offers reliable and affordable car rental services in Islamabad and beyond. Choose from a wide range of cars to suit your travel needs.</p>
        </div>
        <div className="footer-section hours">
          <h3>Operating Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Alam Tower, 37-Commercial Zone, Liberty Market, Islamabad</p>
          <p>Phone: 042 - 111 CaRs (042 - 383 383 383)</p>
          <p>Email: <a href="mailto:customersupport@alamventures.com">customersupport@alamventures.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CaRS.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;