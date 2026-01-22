import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search tricks by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
}

export default SearchBar;