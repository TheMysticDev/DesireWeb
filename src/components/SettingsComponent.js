// src/components/SettingsComponent.js
import React, { useState } from 'react';

const SettingsComponent = () => {
  const [settings, setSettings] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (settings.newPassword !== settings.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3001/update-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('userToken'),
        },
        body: JSON.stringify({ email: settings.email, newPassword: settings.newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Configuraciones actualizadas:', data);
        alert('Configuraciones actualizadas con éxito');
      } else {
        console.error('Error al actualizar configuraciones:', data.message);
        alert('Error al actualizar configuraciones: ' + data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud: ' + error);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={settings.newPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={settings.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default SettingsComponent;
