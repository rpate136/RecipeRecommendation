// ThemeContext.js

import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeClasses = theme === 'light' ? 'light' : 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={themeClasses}>{children}</div>
    </ThemeContext.Provider>
  );
};
