import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Filter } from 'lucide-react';
import './Shop.css';

const categories = ['All', 'Completes', 'Decks', 'Wheels', 'Trucks', 'Hardware', 'Protective Gear'];

const products = [
  { 
    id: 1, 
    name: 'Pro Complete Setup', 
    price: 149.99, 
    category: 'Completes', 
    rating: 4.8, 
    image: 'https://baboonboards.com/wp-content/uploads/ALYXD00140-AST-1.webp' 
  },
  { 
    id: 2, 
    name: 'Maple Wood Deck', 
    price: 59.99, 
    category: 'Decks', 
    rating: 4.5, 
    image: 'https://baselineskateshop.com/cdn/shop/files/quaterkrook_140d1564-4a40-487b-af2b-416657587bf2.jpg?v=1767970525' 
  },
  { 
    id: 3, 
    name: 'High Performance Wheels', 
    price: 39.99, 
    category: 'Wheels', 
    rating: 4.7, 
    image: 'https://baselineskateshop.com/cdn/shop/files/rd_spitfire-f4-99-radial-full-wheels-natural-fa25.jpg?v=1759407330' 
  },
  { 
    id: 4, 
    name: 'Pro Truck Set', 
    price: 49.99, 
    category: 'Trucks', 
    rating: 4.6, 
    image: 'https://baselineskateshop.com/cdn/shop/products/149_hollow_truck_grande_grande_grande_grande_8a3f708e-53cd-4f26-9441-477c8e931d60.jpg?v=1528373616' 
  },
  { 
    id: 5, 
    name: 'Skate Tool', 
    price: 14.99, 
    category: 'Hardware', 
    rating: 4.4, 
    image: 'https://baselineskateshop.com/cdn/shop/products/independent-skateboard-t-tool-black.jpg?v=1601117636' 
  },
  { 
    id: 6, 
    name: 'Pro Helmet', 
    price: 69.99, 
    category: 'Protective Gear', 
    rating: 4.9, 
    image: 'https://baselineskateshop.com/cdn/shop/products/426bfa3dca40678394758e0b39ef4967fe06c442_800x_crop_center_80f29e66-d796-4cdb-9bd7-7f7267723a71.jpg?v=1607595488' 
  },
  { 
    id: 7, 
    name: 'Knee Pads Set', 
    price: 34.99, 
    category: 'Protective Gear', 
    rating: 4.3, 
    image: 'https://baselineskateshop.com/cdn/shop/files/bullet.jpg?v=1764766887' 
  },
  { 
    id: 8, 
    name: 'Beginner Complete', 
    price: 99.99, 
    category: 'Completes', 
    rating: 4.2, 
    image: 'https://baboonboards.com/wp-content/uploads/landyachtz-pocket-knife-black-3.jpg' 
  },
  { 
    id: 9, 
    name: 'Griptape Roll', 
    price: 19.99, 
    category: 'Hardware', 
    rating: 4.1, 
    image: 'https://baselineskateshop.com/cdn/shop/products/Mob-Grip-Tape-_094292_large_dfac68c1-0066-49c9-8030-f0dcebbf3cde.jpg?v=1591347091' 
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
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
      className="shop-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="shop-header">
        <h1>Skate Shop</h1>
        <p>Premium skateboarding gear for all skill levels</p>
      </div>

      <div className="shop-controls">
        <div className="filter-section">
          <div className="filter-header">
            <Filter size={20} />
            <span>Filters</span>
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <motion.button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="sort-section">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={`${selectedCategory}-${sortBy}`}
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          layout
        >
          {sortedProducts.length === 0 ? (
            <motion.div 
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="no-products-content">
                <Filter size={48} />
                <h3>No products found</h3>
                <p>Try selecting a different category</p>
              </div>
            </motion.div>
          ) : (
            sortedProducts.map(product => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      <div className="shop-info">
        <motion.div 
          className="info-card"
          whileHover={{ scale: 1.02 }}
        >
          <h3>🛡️ 30-Day Guarantee</h3>
          <p>Love it or your money back</p>
        </motion.div>
        <motion.div 
          className="info-card"
          whileHover={{ scale: 1.02 }}
        >
          <h3>🚚 Free Shipping</h3>
          <p>On orders over $100</p>
        </motion.div>
        <motion.div 
          className="info-card"
          whileHover={{ scale: 1.02 }}
        >
          <h3>🔧 Expert Support</h3>
          <p>Skateboard setup advice</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Shop;