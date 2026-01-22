import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, Clock, Award } from 'lucide-react';
import { trickData } from '../../data';
import './Tricks.css';

const categories = ["All", "Flatground", "Flip", "Spin", "Grind", "Slide", "Balance"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const Tricks = () => {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentDifficulty, setCurrentDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredTricks = trickData.filter(trick => {
    const matchesCategory = currentCategory === 'All' || trick.category === currentCategory;
    const matchesDifficulty = currentDifficulty === 'All' || trick.difficulty === currentDifficulty;
    const matchesSearch = trick.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         trick.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'difficulty') return a.stars - b.stars;
    if (sortBy === 'popularity') return b.stars - a.stars;
    return 0;
  });

  const stats = {
    total: trickData.length,
    beginner: trickData.filter(t => t.difficulty === 'Beginner').length,
    intermediate: trickData.filter(t => t.difficulty === 'Intermediate').length,
    advanced: trickData.filter(t => t.difficulty === 'Advanced').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="tricks-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <div className="tricks-hero">
        <motion.div
          className="hero-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Skate Trick Library</h1>
          <p>Master the art of skateboarding with our comprehensive trick database</p>
        </motion.div>

        <motion.div 
          className="tricks-stats"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Tricks</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.beginner}</span>
              <span className="stat-label">Beginner</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.intermediate}</span>
              <span className="stat-label">Intermediate</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{stats.advanced}</span>
              <span className="stat-label">Advanced</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="controls-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="search-container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search tricks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <div className="filter-label">
              <Filter size={16} />
              <span>Category</span>
            </div>
            <div className="filter-buttons">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
                  onClick={() => setCurrentCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">
              <Star size={16} />
              <span>Difficulty</span>
            </div>
            <div className="filter-buttons">
              {difficulties.map(difficulty => (
                <motion.button
                  key={difficulty}
                  className={`filter-btn difficulty-${difficulty.toLowerCase()} ${currentDifficulty === difficulty ? 'active' : ''}`}
                  onClick={() => setCurrentDifficulty(difficulty)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {difficulty}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="sort-container">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCategory}-${currentDifficulty}-${searchTerm}`}
          className="tricks-grid-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="results-info">
            <span className="results-count">
              Showing {filteredTricks.length} of {stats.total} tricks
            </span>
          </div>

          {filteredTricks.length === 0 ? (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="no-results-content">
                <Search size={48} />
                <h3>No tricks found</h3>
                <p>Try changing your filters or search term</p>
              </div>
            </motion.div>
          ) : (
            <motion.div className="tricks-grid">
              {filteredTricks.map((trick, index) => (
                <motion.div
                  key={trick.id}
                  className="trick-card-enhanced"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <div className="trick-card-header">
                    <div className="trick-name-wrapper">
                      <h3>{trick.name}</h3>
                      <span className={`difficulty-badge ${trick.difficulty.toLowerCase()}`}>
                        {trick.difficulty}
                      </span>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < trick.stars ? "#FFD700" : "none"}
                          stroke={i < trick.stars ? "#FFD700" : "#ccc"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="trick-category">
                    <span className="category-label">{trick.category}</span>
                  </div>

                  <p className="trick-description">{trick.description}</p>

                  <div className="trick-tips">
                    <h4>Pro Tips:</h4>
                    <ul>
                      {trick.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>
                          <div className="tip-bullet"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="trick-actions">
                    <motion.button 
                      className="action-btn learn-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                    <motion.button 
                      className="action-btn save-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save for Later
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="tutorial-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <h2>Want Video Tutorials?</h2>
          <p>Get access to professional skateboarding tutorials for every trick in our library.</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upgrade to Pro
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Tricks;