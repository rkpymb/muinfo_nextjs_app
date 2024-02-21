import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = createContext((_themeName) => {});

const ThemeProviderWrapper = (props) => {
  const [themeName, _setThemeName] = useState('DarkMain');

  

  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    console.log(themeName)
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  useEffect(() => {
    // Function to set theme based on localStorage value
    const storedThemeName = window.localStorage.getItem('appTheme');
    if (storedThemeName && storedThemeName !== themeName) {
      _setThemeName(storedThemeName);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
