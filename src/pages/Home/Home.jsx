import React from 'react';
import { motion } from 'framer-motion';
import Carousel from '../../components/Carousel/Carousel';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <TrendingUp size={32} />,
      title: "Track Progress",
      description: "Log tricks and monitor your improvement over time"
    },
    {
      icon: <Users size={32} />,
      title: "Find Spots",
      description: "Discover skate parks and spots near you"
    },
    {
      icon: <Award size={32} />,
      title: "Learn Tricks",
      description: "Step-by-step guides for all skill levels"
    },
    {
      icon: <Zap size={32} />,
      title: "Shop Gear",
      description: "Quality skateboarding equipment"
    }
  ];

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="hero-title">
            Welcome to SkateHub
          </h1>
          <p className="hero-subtitle">
            Your ultimate skateboarding community - Learn tricks, find spots, shop gear, and connect with skaters worldwide.
          </p>
          <motion.button
            className="hero-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      <section className="carousel-section">
        <h2 className="section-title">Legends of Skateboarding</h2>
        <Carousel />
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose SkateHub?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <h2>Ready to Roll?</h2>
          <p>Join thousands of skaters improving their skills every day.</p>
          <div className="cta-buttons">
            <motion.button
              className="primary-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
            <motion.button
              className="secondary-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Tricks
            </motion.button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;