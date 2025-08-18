import React, { createContext, useState, useEffect } from 'react';
import api from './axiosConfig'; // your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function checkAuth() {
    try {
      // const res = await api.get('api/check-auth/');
      // console.log('✅ Auth success:', res.data); // <== this should run

      setIsAuthenticated(true);
    } catch (error) {
      console.log('Auth check error:', error.response?.data);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }
  checkAuth();
}, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
