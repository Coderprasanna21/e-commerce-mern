import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer >
      <p>2024&copy;  ✓Cart | All Rights Reserved </p>
      <div>
        <Link  >Terms & Conditions | </Link>
        <Link >Privacy Policy</Link>
      </div>
      
    </footer>
  );
};

export default Footer;
