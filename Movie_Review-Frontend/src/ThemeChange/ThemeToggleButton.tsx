import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      style={{  
        background: 'var(--color-primary)',
        color: 'white',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer' }}
        title={theme === 'light' ? 'Click to Dark Mode' : 'Click to Light Mode'}
    >
      {theme === 'light' ? '🌙 Mode' : '☀️ Mode'}
    </button>
  );
};

export default ThemeToggleButton;
