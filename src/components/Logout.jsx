import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the authentication token from localStorage
    localStorage.removeItem('token');

    // Redirect to the home page
    navigate('/');
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;
