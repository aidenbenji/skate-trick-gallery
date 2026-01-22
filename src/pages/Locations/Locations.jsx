import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Star, Clock, Filter, Maximize2 } from 'lucide-react';
import L from 'leaflet';
import './Locations.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const skateSpots = [
  {
    id: 1,
    name: 'Brooklyn Banks',
    city: 'New York City',
    country: 'USA',
    rating: 4.8,
    features: ['Bowl', 'Rails', 'Ledges', 'Stairs'],
    difficulty: 'Advanced',
    description: 'Iconic skate spot under the Manhattan Bridge, known for its unique architecture.',
    hours: '24/7',
    image: 'https://storage.googleapis.com/fsscs1/images/large/4ac084f7cfae02e89c535d26783b94d0.jpg',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 2,
    name: 'Venice Skatepark',
    city: 'Los Angeles',
    country: 'USA',
    rating: 4.6,
    features: ['Bowls', 'Pools', 'Street Course', 'Snake Run'],
    difficulty: 'All Levels',
    description: 'World-famous beachfront skatepark with ocean views.',
    hours: '6 AM - 10 PM',
    image: 'https://www.tripsavvy.com/thmb/MkdPzuCMl8MMVMUzwRzEDEvGBIo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/skateboarding-paradise-482630345-5c7b06ee46e0fb0001edc842.jpg',
    coordinates: { lat: 33.9850, lng: -118.4695 }
  },
  {
    id: 3,
    name: 'Southbank Undercroft',
    city: 'London',
    country: 'UK',
    rating: 4.7,
    features: ['Ledges', 'Banks', 'Flats', 'Walls'],
    difficulty: 'Intermediate',
    description: 'Historic skate spot under the Queen Elizabeth Hall.',
    hours: '24/7',
    image: 'https://www.skateparks.co.uk/wp-content/uploads/2014/07/IMG_0281.jpg',
    coordinates: { lat: 51.5059, lng: -0.1172 }
  },
  {
    id: 4,
    name: 'MACBA',
    city: 'Barcelona',
    country: 'Spain',
    rating: 4.9,
    features: ['Marble Ledges', 'Stairs', 'Smooth Ground'],
    difficulty: 'All Levels',
    description: 'The famous museum plaza with perfect marble ledges.',
    hours: '24/7',
    image: 'https://www.skatescope.com/images/spots/597490a657703.jpeg',
    coordinates: { lat: 41.3825, lng: 2.1609 }
  },
  {
    id: 5,
    name: 'Burnside Skatepark',
    city: 'Portland',
    country: 'USA',
    rating: 4.5,
    features: ['Bowl', 'Pools', 'Vert Wall', 'Street'],
    difficulty: 'Advanced',
    description: 'Legendary DIY skatepark under the Burnside Bridge.',
    hours: '24/7',
    image: 'https://skateoregon.com/Burnside/Bov.jpg',
    coordinates: { lat: 45.5231, lng: -122.6702 }
  },
  {
    id: 6,
    name: 'Mile End Skatepark',
    city: 'Montreal',
    country: 'Canada',
    rating: 4.4,
    features: ['Bowl', 'Street', 'Vert', 'Mini Ramp'],
    difficulty: 'All Levels',
    description: 'Indoor/outdoor skatepark with diverse terrain.',
    hours: '10 AM - 10 PM',
    image: 'https://www.skateparks.co.uk/wp-content/uploads/2014/07/cover8.jpg',
    coordinates: { lat: 45.5231, lng: -73.5831 }
  },
  {
    id: 7,
    name: 'FDR Skatepark',
    city: 'Philadelphia',
    country: 'USA',
    rating: 4.7,
    features: ['Bowl', 'Pools', 'Ledges', 'Rails'],
    difficulty: 'Advanced',
    description: 'DIY skatepark under I-95 with incredible concrete work.',
    hours: '24/7',
    image: 'https://paskateparks.com/wp-content/uploads/2021/12/FDR_16.jpg',
    coordinates: { lat: 39.9526, lng: -75.1652 }
  },
  {
    id: 8,
    name: 'Stadium Skatepark',
    city: 'Sydney',
    country: 'Australia',
    rating: 4.3,
    features: ['Street Course', 'Bowl', 'Mini Ramp', 'Foam Pit'],
    difficulty: 'All Levels',
    description: 'Indoor skatepark with professional-grade facilities.',
    hours: '12 PM - 10 PM',
    image: 'https://skatethestates.com/wp-content/uploads/2022/06/Sydney-Park-Skatepark-In-Australia.jpg',
    coordinates: { lat: -33.8688, lng: 151.2093 }
  }
];

const filters = {
  difficulty: ['All', 'All Levels', 'Beginner', 'Intermediate', 'Advanced'],
  features: ['All', 'Bowl', 'Pools', 'Street', 'Vert', 'Mini Ramp', 'Rails', 'Ledges']
};

const Locations = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);

  const filteredSpots = skateSpots.filter(spot => {
    const matchesDifficulty = selectedDifficulty === 'All' || spot.difficulty === selectedDifficulty;
    const matchesFeature = selectedFeature === 'All' || spot.features.includes(selectedFeature);
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         spot.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesFeature && matchesSearch;
  });

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
      className="locations-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="locations-hero">
        <motion.div
          className="hero-content"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="hero-icon">
            <MapPin size={48} />
          </div>
          <h1>Find Skate Spots Worldwide</h1>
          <p>Discover legendary skateparks and hidden gems across the globe</p>
        </motion.div>
      </div>
      <div className="location-stats">
        <div className="stat-item">
          <div className="stat-number">{skateSpots.length}+</div>
          <div className="stat-label">Skate Spots</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">15+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Access Hours</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.5</div>
          <div className="stat-label">Avg Rating</div>
        </div>
      </div>

      <div className="locations-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <div className="filter-label">
              <Filter size={16} />
              <span>Difficulty</span>
            </div>
            <div className="filter-chips">
              {filters.difficulty.map(diff => (
                <motion.button
                  key={diff}
                  className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {diff}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-label">
              <Maximize2 size={16} />
              <span>Features</span>
            </div>
            <div className="filter-chips">
              {filters.features.map(feature => (
                <motion.button
                  key={feature}
                  className={`filter-chip ${selectedFeature === feature ? 'active' : ''}`}
                  onClick={() => setSelectedFeature(feature)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="locations-content">

<motion.div 
  className="map-container"
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  <MapContainer
    center={[20, 0]}
    zoom={2}
    scrollWheelZoom={false}
    style={{ height: '100%', width: '100%', borderRadius: '16px' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="© OpenStreetMap contributors"
    />

    {filteredSpots.map(spot => (
      <Marker
        key={spot.id}
        position={[spot.coordinates.lat, spot.coordinates.lng]}
        eventHandlers={{
          click: () => setSelectedSpot(spot),
        }}
      >
        <Popup>
          <strong>{spot.name}</strong><br />
          {spot.city}, {spot.country}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
</motion.div>

        <motion.div 
          className="spots-grid-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="spots-header">
            <h2>Featured Skate Spots</h2>
            <span className="results-count">
              {filteredSpots.length} spots found
            </span>
          </div>

          {filteredSpots.length === 0 ? (
            <div className="no-spots">
              <MapPin size={48} />
              <h3>No spots found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="spots-grid">
              {filteredSpots.map(spot => (
                <motion.div
                  key={spot.id}
                  className="spot-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => setSelectedSpot(spot)}
                >
                  <div className="spot-image">
                    <img src={spot.image} alt={spot.name} />
                    <div className="spot-rating">
                      <Star size={16} fill="currentColor" />
                      <span>{spot.rating}</span>
                    </div>
                  </div>
                  
                  <div className="spot-content">
                    <div className="spot-header">
                      <h3>{spot.name}</h3>
                      <span className={`difficulty-badge ${spot.difficulty.toLowerCase().replace(' ', '-')}`}>
                        {spot.difficulty}
                      </span>
                    </div>
                    
                    <div className="spot-location">
                      <MapPin size={16} />
                      <span>{spot.city}, {spot.country}</span>
                    </div>
                    
                    <p className="spot-description">{spot.description}</p>
                    
                    <div className="spot-features">
                      {spot.features.slice(0, 3).map(feature => (
                        <span key={feature} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                      {spot.features.length > 3 && (
                        <span className="feature-tag more">
                          +{spot.features.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="spot-hours">
                      <Clock size={16} />
                      <span>{spot.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSpot && (
          <motion.div
            className="spot-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpot(null)}
          >
            <motion.div
              className="spot-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal"
                onClick={() => setSelectedSpot(null)}
              >
                ×
              </button>
              
              <div className="modal-image">
                <img src={selectedSpot.image} alt={selectedSpot.name} />
              </div>
              
              <div className="modal-content">
                <div className="modal-header">
                  <h2>{selectedSpot.name}</h2>
                  <div className="modal-rating">
                    <Star size={20} fill="#FFD700" />
                    <span>{selectedSpot.rating}</span>
                  </div>
                </div>
                
                <div className="modal-location">
                  <MapPin size={20} />
                  <span>{selectedSpot.city}, {selectedSpot.country}</span>
                </div>
                
                <p className="modal-description">{selectedSpot.description}</p>
                
                <div className="modal-details">
                  <div className="detail-item">
                    <strong>Difficulty:</strong>
                    <span className={`difficulty ${selectedSpot.difficulty.toLowerCase()}`}>
                      {selectedSpot.difficulty}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Hours:</strong>
                    <span>{selectedSpot.hours}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Features:</strong>
                    <div className="features-list">
                      {selectedSpot.features.map(feature => (
                        <span key={feature} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <motion.button 
                    className="action-btn directions"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Navigation size={20} />
                    Get Directions
                  </motion.button>
                  <motion.button 
                    className="action-btn save"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star size={20} />
                    Save Spot
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Locations;