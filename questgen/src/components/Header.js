import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleScroll = (section) => {
        navigate('/');
        setTimeout(() => {
            document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <header className="header">
            <div className="logo">Questgen</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li onClick={() => handleScroll('about')}>About</li>
                    <li onClick={() => handleScroll('how-it-works')}>How It Works</li>
                    {/* <li onClick={() => handleScroll('contact')}>Contact</li> */}
                    <li><Link to="/survey">Preview</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                    {/* <li><Link to="/preview">Preview</Link></li> */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
