import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Question Paper Generator. All Rights Reserved.</p>
            <div className="social-links">
                <Link to="/facebook">Facebook</Link>
                <Link to="/twitter">Twitter</Link>
                <Link to="/linkedin">LinkedIn</Link>
            </div>
        </footer>
    );
};

export default Footer;


