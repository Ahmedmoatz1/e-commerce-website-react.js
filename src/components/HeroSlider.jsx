import React, { useState, useEffect, useRef } from 'react';
import './HeroSlider.css';

const products = [
  {
    title: "Xbox Series X",
    desc: "The most powerful Xbox ever.\n12 TFLOPS, 4K@120FPS, 1TB SSD.",
    color: "#0A3233",
    img: "/img/banner_hero1.png"
  },
  {
    title: "Galaxy Z Fold 2",
    desc: "The ultimate foldable experience.\nBronze edition with 7.6\" AMOLED.",
    color: "#8B6F47",
    img: "/img/z_fold.png"
  },
  {
    title: "Apple Watch Ultra 2",
    desc: "Rugged titanium case, Orange Alpine Loop,\n36-hour battery.",
    color: "#FF4500",
    img: "/img/apple_watch.png"
  }
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) { 
      if (diff > 0) {
        setIndex((prev) => (prev + 1) % products.length);
      } else {
        setIndex((prev) => prev === 0 ? products.length - 1 : prev - 1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="marvel-official-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {products.map((product, i) => (
        <div
          key={i}
          className={`slide ${i === index ? 'active' : ''}`}
          style={{ '--slide-color': product.color }}
        >
          <div className="slant-bg" />
          <div className="hero-img-wrapper">
            <img src={product.img} alt={product.title} loading="lazy" className="hero-img" />
          </div>

          <div className="content">
            <h1 className="big-marvel">TECH</h1>
            <h2 className="hero-title">{product.title}</h2>
            <p className="hero-desc" style={{ whiteSpace: 'pre-line' }}>
              {product.desc}
            </p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
      ))}

      <div className="nav-controls">
        <button className="nav-btn" onClick={() => setIndex(index === 0 ? products.length - 1 : index - 1)}>
          <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
        </button>
        <button className="nav-btn" onClick={() => setIndex((index + 1) % products.length)}>
          <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>

      <div className="dots-bottom">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`dot-bottom ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;