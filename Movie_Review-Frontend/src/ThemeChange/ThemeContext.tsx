import React, { useState, useEffect, createContext, useContext } from 'react';
import '../Styles/themes.css';

// Define our theme types
type Theme = 'light' | 'dark';

// Create a context for theme
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { // here children means it is react anotation which will represents jsx . in app.tsx inside themeprovided we are supplying all components which are like childern so that our themem should apply all components(as we know in components we used JSX)
  const [theme, setTheme] = useState<Theme>('light'); //by default in react there isa children prop for that when we supply any orgument in between the function name tags it will take it as children  as we see in app.tsx we have used <ThemeProvider><ThemeProvider/> inside that used childrens

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme; //when we run our app for the first time than this will be null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;//here geeting OS or usersystem mode.means if user using darkmode in his system than this method will automatically fetch that theme and supplied
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {        //below this attribute will setattribute for html"<html data-theme="light"> like this
    document.documentElement.setAttribute('data-theme', theme); //from here we are storing the theme inlocalstorafe  as default theam as lighr(see theme usestate)
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return ( //here we saying that themecontext should be provided to all childrens
    // here below for supplying the values we used two {{}} because we trying to supply two values.when we need to supply more than one values we have to use that. if we supply single value than no need
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext easily
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
