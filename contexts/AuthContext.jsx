// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import api from '../lib/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.get('/auth/me').then(res => setUser(res.data)).catch(() => setUser(null));
//     }
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     setUser(res.data.user);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Helper to get token from storage
  const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.get('/auth/me').then(res => setUser(res.data)).catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password, remember) => {
    const res = await api.post('/auth/login', { email, password });

    if (remember) {
      localStorage.setItem('token', res.data.token);  // persistent
    } else {
      sessionStorage.setItem('token', res.data.token); // session-only
    }

    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
