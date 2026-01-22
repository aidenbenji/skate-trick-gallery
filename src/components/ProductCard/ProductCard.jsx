import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <motion.div className="product-card" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-category">{product.category}</div>
        <button className="add-to-cart-btn">
          <ShoppingBag size={20} />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(product.rating) ? "#FFD700" : "none"}
              stroke={i < Math.floor(product.rating) ? "#FFD700" : "#ccc"}
            />
          ))}
          <span className="rating-number">({product.rating})</span>
        </div>
        <p className="product-price">
          {product.currency ? product.currency + ' ' : '$'}
          {product.price}
        </p>
        <button className="buy-now-btn">Add to Cart</button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
