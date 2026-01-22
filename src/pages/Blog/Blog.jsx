import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, Tag, ChevronRight, BookOpen, TrendingUp, MessageCircle, Share2 } from 'lucide-react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'The Evolution of Street Skateboarding',
    excerpt: 'How street skating transformed from curb hopping to the technical marvel it is today.',
    content: 'Street skateboarding has undergone an incredible transformation over the decades. What started as simple curb hopping and sidewalk surfing in the 1970s has evolved into a highly technical discipline that incorporates architecture, urban design, and athletic innovation...',
    author: 'Mike Carroll',
    date: '2026-03-15',
    readTime: '8 min',
    category: 'History',
    tags: ['Street', 'History', 'Culture'],
    image: 'https://images.unsplash.com/photo-1605374521410-d89115eda8e4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 1245,
    comments: 42
  },
  {
    id: 2,
    title: 'Choosing Your First Skateboard Setup',
    excerpt: 'A complete guide to selecting the perfect board, trucks, and wheels for beginners.',
    content: 'Walking into a skate shop for the first time can be overwhelming. With dozens of deck sizes, wheel durometers, and truck widths, where do you even begin? This guide breaks down everything you need to know...',
    author: 'Sarah Johnson',
    date: '2026-03-10',
    readTime: '6 min',
    category: 'Beginners',
    tags: ['Gear', 'Beginners', 'Setup'],
    image: 'https://images.unsplash.com/photo-1648278510158-24125c401af8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 892,
    comments: 31
  },
  {
    id: 3,
    title: 'The Science of Skatepark Design',
    excerpt: 'How professional skateparks are engineered for maximum flow and progression.',
    content: 'Modern skatepark design is equal parts art and science. From the transition radius of a bowl to the perfect ledge height, every element is carefully calculated...',
    author: 'Chris Cole',
    date: '2026-03-05',
    readTime: '10 min',
    category: 'Design',
    tags: ['Skateparks', 'Design', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1558987003-f78726914072?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 1567,
    comments: 58
  },
  {
    id: 4,
    title: 'Skateboarding for Mental Health',
    excerpt: 'Exploring how skateboarding improves mental wellbeing and builds community.',
    content: 'Beyond the physical benefits, skateboarding offers profound mental health advantages. The focus required to land a trick, the resilience built through falling, and the community formed at local spots...',
    author: 'Leticia Bufoni',
    date: '2026-02-28',
    readTime: '7 min',
    category: 'Wellness',
    tags: ['Mental Health', 'Community', 'Lifestyle'],
    image: 'https://images.unsplash.com/photo-1631883055788-5a5b15fae074?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 2103,
    comments: 89
  },
  {
    id: 5,
    title: 'Professional Skateboarding in 2026',
    excerpt: 'The current state of professional skateboarding and what the future holds.',
    content: 'The landscape of professional skateboarding continues to evolve. With the Olympics, social media, and new competitive formats, what does it mean to be a pro skater today...',
    author: 'Nyjah Huston',
    date: '2026-02-20',
    readTime: '9 min',
    category: 'Industry',
    tags: ['Professional', 'Competition', 'Future'],
    image: 'https://images.unsplash.com/photo-1542727568-395b760e571d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 1876,
    comments: 67
  },
  {
    id: 6,
    title: 'Mastering the Kickflip: A Step-by-Step Guide',
    excerpt: 'Break down the mechanics of the kickflip with professional tips and common mistakes.',
    content: 'The kickflip remains one of skateboardings most iconic tricks. While it seems straightforward, perfecting the flick, timing, and catch requires understanding the mechanics...',
    author: 'Rodney Mullen',
    date: '2026-02-15',
    readTime: '12 min',
    category: 'Tutorial',
    tags: ['Tricks', 'Kickflip', 'Tutorial'],
    image: 'https://images.unsplash.com/photo-1544364493-4ff9efeabce3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    views: 3245,
    comments: 124
  }
];

const categories = ['All', 'History', 'Beginners', 'Design', 'Wellness', 'Industry', 'Tutorial'];
const tags = ['All', 'Street', 'Gear', 'Skateparks', 'Mental Health', 'Professional', 'Tricks', 'Culture', 'Community'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredPost, setFeaturedPost] = useState(blogPosts[0]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
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
      className="blog-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="blog-hero">
        <motion.div
          className="hero-content"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="hero-icon">
            <BookOpen size={48} />
          </div>
          <h1>Skateboarding Blog</h1>
          <p>Insights, tutorials, and stories from the skateboarding world</p>
        </motion.div>
      </div>

      <motion.div 
        className="featured-post"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="featured-image">
          <img src={featuredPost.image} alt={featuredPost.title} />
          <div className="featured-badge">Featured</div>
        </div>
        <div className="featured-content">
          <div className="post-meta">
            <span className="post-category">{featuredPost.category}</span>
            <span className="post-date">
              <Calendar size={14} />
              {featuredPost.date}
            </span>
          </div>
          <h2>{featuredPost.title}</h2>
          <p className="excerpt">{featuredPost.excerpt}</p>
          <div className="post-footer">
            <div className="author-info">
              <User size={16} />
              <span>{featuredPost.author}</span>
            </div>
            <div className="post-stats">
              <span className="stat">
                <Clock size={16} />
                {featuredPost.readTime}
              </span>
              <span className="stat">
                <MessageCircle size={16} />
                {featuredPost.comments}
              </span>
              <span className="stat">
                <TrendingUp size={16} />
                {featuredPost.views}
              </span>
            </div>
          </div>
          <motion.button 
            className="read-more-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read Article <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>

      <div className="blog-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Tags</h3>
            <div className="tag-filters">
              {tags.map(tag => (
                <motion.button
                  key={tag}
                  className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Tag size={14} />
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="blog-grid-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid-header">
          <h2>Latest Articles</h2>
          <span className="results-count">
            {filteredPosts.length} articles found
          </span>
        </div>

        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <motion.div 
              className="no-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BookOpen size={48} />
              <h3>No articles found</h3>
              <p>Try changing your filters or search term</p>
            </motion.div>
          ) : (
            <motion.div className="blog-grid">
              {filteredPosts.map(post => (
                <motion.article
                  key={post.id}
                  className="blog-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setFeaturedPost(post)}
                  layout
                >
                  <div className="card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="image-overlay">
                      <span className="read-time">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="card-header">
                      <span className="category-badge">{post.category}</span>
                      <span className="post-date">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                    </div>
                    
                    <h3>{post.title}</h3>
                    <p className="card-excerpt">{post.excerpt}</p>
                    
                    <div className="card-footer">
                      <div className="author">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="post-tags">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="tag">
                            <Tag size={12} />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="tag more">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="card-stats">
                      <div className="stat">
                        <MessageCircle size={14} />
                        <span>{post.comments}</span>
                      </div>
                      <div className="stat">
                        <TrendingUp size={14} />
                        <span>{post.views}</span>
                      </div>
                      <div className="stat">
                        <Share2 size={14} />
                        <span>Share</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

 
      <motion.div 
        className="newsletter-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for weekly skateboarding content</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <motion.button
              className="subscribe-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
          <p className="form-note">No spam, unsubscribe at any time</p>
        </div>
      </motion.div>

      <div className="popular-tags">
        <h3>Popular Topics</h3>
        <div className="tags-container">
          {tags.filter(tag => tag !== 'All').map(tag => (
            <motion.button
              key={tag}
              className="popular-tag"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;