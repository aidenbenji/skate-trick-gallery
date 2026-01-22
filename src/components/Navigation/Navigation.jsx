import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Home, MapPin, ShoppingCart, Book, TrendingUp } from 'lucide-react';
import './Navigation.css';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Navigation = () => {
  const { isDarkMode } = useTheme();

const navItems = [
  { to: '/', label: 'Home', icon: <Home size={20} /> },
  { to: '/tricks', label: 'Trick Gallery', icon: <TrendingUp size={20} /> },
  { to: '/locations', label: 'Skate Spots', icon: <MapPin size={20} /> },
  { to: '/shop', label: 'Shop', icon: <ShoppingCart size={20} /> },
  { to: '/blog', label: 'Blog', icon: <Book size={20} /> },
];

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
        <TrendingUp size={28} />
        <span className="logo-text">SkateHub</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <DarkModeToggle />
          <button className="cta-button">Join Community</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;