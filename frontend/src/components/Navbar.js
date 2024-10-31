// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    const handlePracticeCodingClick = () => {
        navigate('/problem/1'); // Navigates to a sample problem page with ID 1
    };

    return (
        <div className="navbar">
            <h1 className="title">CodingPlatform</h1>
            <div className="nav-buttons">
                <button onClick={handlePracticeCodingClick} className="practice-button">
                    Practice Coding
                </button>
                <button onClick={handleSignUpClick} className="sign-up">Sign Up</button>
                <button onClick={handleLoginClick} className="log-in">Log In</button>
            </div>
        </div>
    );
}

export default Navbar;
