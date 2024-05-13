// UserContext.js
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const [emailId, setEmailId] = useState(() => {
    const storedEmailId = localStorage.getItem('emailId');
    return storedEmailId ? JSON.parse(storedEmailId) : null;
  });

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('emailId', JSON.stringify(emailId));
  }, [emailId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, emailId, setEmailId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
