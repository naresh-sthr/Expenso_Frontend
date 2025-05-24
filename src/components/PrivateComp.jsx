// components/PrivateComp.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateComp = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateComp;
