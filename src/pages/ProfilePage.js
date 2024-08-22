// src/pages/ProfilePage.js
import React, { useState } from 'react';
import SettingsComponent from '../components/SettingsComponent';
import SubscribeComponent from '../components/SubscribeComponent';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('subscribe'); 

  const renderSection = () => {
    switch (activeSection) {
      case 'settings':
        return <SettingsComponent />;
      case 'subscribe':
        return <SubscribeComponent />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <ul className="sidebar-nav">
        <li onClick={() => setActiveSection('subscribe')}>Profiles</li> 
        <li onClick={() => setActiveSection('settings')}>Settings</li>
          {/* Puedes añadir más elementos del menú aquí */}
        </ul>
      </div>
      <div className="profile-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default ProfilePage;
