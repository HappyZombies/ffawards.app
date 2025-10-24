import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('is_logged_in'));

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await axios.get(`/api/dashboard/leagues?season=2025`);
                setIsAuthenticated(true);
                localStorage.setItem('is_logged_in', true);
            } catch (err) {
                setIsAuthenticated(false);
                localStorage.removeItem('is_logged_in');
            }
        };

        checkAuthStatus();
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
