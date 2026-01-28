import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          // Parse user data
          const parsedUser = JSON.parse(userData);
          
          // Check if token is expired
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            // Decode the JWT payload
            const payload = JSON.parse(atob(tokenParts[1]));
            
            // Check expiration (exp is in seconds, Date.now() is in milliseconds)
            if (payload.exp && payload.exp * 1000 > Date.now()) {
              // Token is still valid
              setUser(parsedUser);
            } else {
              // Token expired - clear everything
              console.log('Token expired, clearing storage');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
            }
          } else {
            // Invalid token format - clear everything
            console.log('Invalid token format');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          // Error parsing token or user data - clear everything
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Register function
  const register = async (username, email, password) => {
    try {
      const res = await api.post('/auth/register', {
        username,
        email,
        password,
      });

      // Save token
      localStorage.setItem('token', res.data.token);

      // Save user data
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }

      return res.data;
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      // Save token
      localStorage.setItem('token', res.data.token);

      // Save user data
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }

      return res.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};