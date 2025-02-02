import React, { createContext, useState, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    return name && email ? { name, email } : null;
  });


  const login = (user) => {
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    setUserData(user);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    setUserData(null);
  };

  useEffect(() => {
    // Sync state with local storage changes (optional)
    const handleStorageChange = () => {
      const name = localStorage.getItem("userName");
      const email = localStorage.getItem("userEmail");
      setUserData(name && email ? { name, email } : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{userData, login, logout}}>
        {children}
    </UserContext.Provider>
  );
  
};

export default UserContext;
