// // src/Navbar.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation desde react-router-dom
// import './Navbar.css';

// const Navbar = () => {
//   const location = useLocation();

//   return (
//     <header className="navbar">
//       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
//       <div className="navbar__logo">DeiserWeb</div>
//       <input type="search" placeholder="Search..." className="navbar__search" />
//       <div className="navbar__items">
//         {location.pathname !== '/' && <Link to="/" className="navbar__button">Home</Link>}
//         {location.pathname !== '/login' && <Link to="/login" className="navbar__button">Login</Link>}
//         {location.pathname !== '/subscribe' && <Link to="/subscribe" className="navbar__button">Subscribe</Link>}
//         {location.pathname !== '/messages' && <Link to="/messages" className="navbar__button">Messages</Link>}
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    setIsAuthenticated(!!userToken);

    const darkModeSetting = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModeSetting);
    if (darkModeSetting) {
      document.body.classList.add('dark-mode');
    }

    setAnimateLogo(true);
    const timer = setTimeout(() => {
      setAnimateLogo(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const toggleDarkMode = () => {
    const newDarkModeSetting = !darkMode;
    setDarkMode(newDarkModeSetting);
    localStorage.setItem('darkMode', newDarkModeSetting);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="navbar">
      <div className={`navbar__logo ${animateLogo ? 'animate' : ''}`}>DesireHub</div>
      <input type="search" placeholder="Search..." className="navbar__search" />
      <div className="navbar__items">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="navbar__button">Profile</Link>
            <Link to="/messages" className="navbar__button">Messages</Link>
            <button onClick={handleLogout} className="navbar__button">Log Out</button>
          </>
        ) : (
          <>
            {location.pathname !== '/' && <Link to="/" className="navbar__button">Home</Link>}
            {location.pathname !== '/login' && <Link to="/login" className="navbar__button">Login</Link>}
          </>
        )}
        {location.pathname !== '/' && location.pathname !== '/login' && (
          <button onClick={toggleDarkMode} className="navbar__dark-mode-toggle">
            {darkMode ? '🌙' : '☀️'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;