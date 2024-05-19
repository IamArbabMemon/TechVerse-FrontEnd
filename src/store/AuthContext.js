import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token')); 
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
