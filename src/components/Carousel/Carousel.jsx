import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { handleImageError } from '../../utils/imageUtils';
import './Carousel.css';

const skateboarders = [
  {
    name: "Tony Hawk",
    quote: "Skateboarding teaches you how to take a fall properly. If you try to kickflip down some stairs, it might take you 30 tries - and you just learn how to take a tumble out of it without getting hurt.",
    achievement: "First to land a 900 in competition",
    image: "https://wallpapers.com/images/high/tony-hawk-birdman-sky-jump-n1u0z6j7pekpqsqw.webp"
  },
  {
    name: "Rodney Mullen",
    quote: "I think skateboarding makes a statement, and it's not necessarily a statement of rebellion, but a statement of creativity and expression.",
    achievement: "Invented the kickflip and 360 flip",
    image: "https://skateboardinghalloffame.org/wp-content/uploads/2021/08/MullenAirwalk88CarsonBrittain.jpg.jpg"
  },
  {
    name: "Nyjah Huston",
    quote: "I don't really think about failing. I just go out there and do what I have to do. I don't let fear affect me.",
    achievement: "Most X Games gold medals in street skateboarding",
    image: "https://api.time.com/wp-content/uploads/2024/08/nyjah-huston-bronze.jpg?quality=85&w=1024"
  },
  {
    name: "Leticia Bufoni",
    quote: "Skateboarding is not just a sport for me; it's a way of life. It taught me discipline, perseverance, and how to face challenges.",
    achievement: "First woman to win X Games street gold three times",
    image: "https://img.redbull.com/images/c_crop,x_592,y_0,h_2135,w_1708/c_fill,w_700,h_875/q_auto,f_auto/redbullcom/2021/1/20/m11lqccttssbxxvl5a0p/skate-leticia-bufoni-2020"
  },
  {
    name: "Chris Joslin",
    quote: "When you're skating, you're not thinking about anything else. It's just you and your board.",
    achievement: "Known for huge gaps and technical tricks",
    image: "https://res.cloudinary.com/usopc-prod/image/upload/c_fill,w_2356/q_auto/f_auto/v1/TeamUSA%20Assets/News/Joslin_C_OQS1_2024"
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skateboarders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + skateboarders.length) % skateboarders.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="carousel-slide"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="slide-content">
            <div className="skater-image">
              <img 
  src={skateboarders[currentIndex].image} 
  alt={skateboarders[currentIndex].name}
  onError={(e) => handleImageError(e, 'skater')}
/>
            </div>
            <div className="skater-info">
              <div className="quote-icon">
                <Quote size={32} />
              </div>
              <p className="quote">"{skateboarders[currentIndex].quote}"</p>
              <h3 className="skater-name">{skateboarders[currentIndex].name}</h3>
              <p className="achievement">{skateboarders[currentIndex].achievement}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button className="carousel-button next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="carousel-indicators">
        {skateboarders.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;