// src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Logic to handle login
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <p>Sign in to your account to continue</p>
                <label>Email address</label>
                <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="password-container">
                    <label>Password</label>
                    <Link to="/forgot-password" className="forgot-password">Lost password?</Link>
                </div>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="sign-in-button">Sign in</button>
                <p className="register-link">
                    Not registered? <Link to="/register">Create account</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
