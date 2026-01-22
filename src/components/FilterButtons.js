import React from 'react';
import './FilterButtons.css';

function FilterButtons({ categories, currentCategory, setCurrentCategory }) {
  return (
    <div className="filter-container">
      <h3>Filter by Category:</h3>
      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${currentCategory === category ? 'active' : ''}`}
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;