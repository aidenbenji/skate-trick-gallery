import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Tricks from './pages/Tricks/Tricks';
import Locations from './pages/Locations/Locations';
import Shop from './pages/Shop/Shop';
import Blog from './pages/Blog/Blog';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tricks" element={<Tricks />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2026 SkateHub. All rights reserved. Built with React & Framer Motion.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;