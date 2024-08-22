// src/pages/NotFoundPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Hey Buddy</h1>
        <p>Page not found</p>
        <button onClick={goToHomePage}>
          <span className="leon-emoji">🦁</span> {/* Lion emoji here */}
          Go back to the home page
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
