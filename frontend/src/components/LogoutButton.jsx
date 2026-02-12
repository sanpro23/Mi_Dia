import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="user-info">
      {user && (
        <>
          <span className="user-name">Hola, {user.username || user.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

export default LogoutButton;