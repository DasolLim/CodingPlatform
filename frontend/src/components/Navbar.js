import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <h1 className="title">CodingPlatform</h1>
            <div className="nav-buttons">
                <button className="sign-up">Sign Up</button>
                <button className="log-in">Log In</button>
            </div>
        </div>
    );
}

export default Navbar;
