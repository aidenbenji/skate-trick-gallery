export const getFallbackImage = (category) => {
  const fallbacks = {
    'skater': 'https://images.unsplash.com/photo-1547447134-c19ca4d6e8f9?w=400',
    'spot': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d6d?w-400',
    'product': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400',
    'blog': 'https://images.unsplash.com/photo-1547447134-c19ca4d6e8f9?w=400',
  };
  return fallbacks[category] || fallbacks.skater;
};

export const handleImageError = (e, fallbackCategory = 'skater') => {
  e.target.onerror = null;
  e.target.src = getFallbackImage(fallbackCategory);
};