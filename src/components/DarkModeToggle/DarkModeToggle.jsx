import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={false}
      animate={{
        rotate: isDarkMode ? 180 : 0,
        transition: { type: "spring", stiffness: 200, damping: 10 }
      }}
    >
      <motion.div
        className="toggle-icon"
        animate={{
          rotate: isDarkMode ? 0 : 180,
        }}
      >
        {isDarkMode ? (
          <Sun size={20} className="sun-icon" />
        ) : (
          <Moon size={20} className="moon-icon" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;