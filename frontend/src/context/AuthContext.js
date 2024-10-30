import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in and save the JWT token
    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);  // Assuming the user object is returned
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Function to log out and clear the JWT token
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Load user data on mount if token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setUser(response.data.user))
                .catch(() => logout());
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
