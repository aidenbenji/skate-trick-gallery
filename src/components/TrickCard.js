import React from 'react';
import './TrickCard.css';

function TrickCard({ trick }) {
  const renderStars = () => {
    return '★'.repeat(trick.stars) + '☆'.repeat(5 - trick.stars);
  };
  const getDifficultyColor = () => {
    switch(trick.difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <div className="trick-card">
      <div className="trick-header">
        <h3 className="trick-name">{trick.name}</h3>
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor() }}
        >
          {trick.difficulty}
        </span>
      </div>
      
      <div className="trick-category">
        <span className="category-tag">{trick.category}</span>
      </div>
      
      <div className="trick-stars">
        <span className="stars">{renderStars()}</span>
        <span className="star-text">{trick.stars}/5 difficulty</span>
      </div>
      
      <p className="trick-description">{trick.description}</p>
      
      <div className="trick-tips">
        <h4>Tips:</h4>
        <ul>
          {trick.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrickCard;