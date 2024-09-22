// src/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import privateRoutes from './privateRoutes';

const AuthContext = createContext({
    isAuthenticated: false,
    loading: true,
    signOut: () => {},
});

export const AuthProvider = ({ children }: Record<any, any>) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/me`);
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking authentication', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (privateRoutes.some(privateRoute => location.pathname === privateRoute.path) && !isAuthenticated) {
            checkAuth();
        }
    }, [location]);

    const signOut = async () => {
        setLoading(true);
        await fetch(`${import.meta.env.VITE_API_URL}/sign_out`, {method: 'POST'});
        setLoading(false);
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
