import React, { createContext, useState, useEffect, useContext } from 'react';
import { ROLES } from '../config/roles';

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.OPS_MANAGER);

  useEffect(() => {
    const savedRoleKey = localStorage.getItem('zipworld_selected_role');
    if (savedRoleKey && ROLES[savedRoleKey]) {
      setCurrentRole(ROLES[savedRoleKey]);
    }
  }, []);

  const changeRole = (roleKey) => {
    if (ROLES[roleKey]) {
      setCurrentRole(ROLES[roleKey]);
      localStorage.setItem('zipworld_selected_role', roleKey);
    }
  };

  return (
    <RoleContext.Provider value={{ currentRole, changeRole, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
