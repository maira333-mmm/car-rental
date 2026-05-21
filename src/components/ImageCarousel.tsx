import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000); // Change every 2 seconds - EXACT same as original
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="carousel">
      {images.map((img, idx) => (
        <img 
          key={idx}
          src={img} 
          alt={`${alt} - Image ${idx + 1}`} 
          className={currentIndex === idx ? 'active' : ''}
          style={{ display: currentIndex === idx ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
}