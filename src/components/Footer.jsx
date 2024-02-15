import React from 'react';
import '../assets/styles/Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear(); 

  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">
            © {year} Recipe Repository.  All rights reserved.
            </span>
        <div className="footer-links">

          <a href="#"></a>
          
          <a href="#"></a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;