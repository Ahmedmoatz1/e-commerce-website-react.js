import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./BtmHeader.module.css";

export default function BtmHeader() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const phrases = [
    "Lightning-fast delivery",
    "Premium gadgets daily",
    "Exclusive deals live now",
    "Secure checkout always",
    "New tech drops weekly",
    "Best prices guaranteed",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const cats = await res.json();

        const catsWithImg = await Promise.all(
          cats.slice(0, 14).map(async (cat) => {
            const prodRes = await fetch(
              `https://dummyjson.com/products/category/${cat.slug}?limit=1`
            );
            const prodData = await prodRes.json();
            const img =
              prodData.products[0]?.thumbnail ||
              `https://via.placeholder.com/120/0066ff/ffffff?text=${encodeURIComponent(
                cat.name[0]
              )}`;

            return { slug: cat.slug, name: cat.name, image: img };
          })
        );

        setCategories(catsWithImg);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScroll();
  }, [categories]);

  return (
    <div className={styles.header}>
      {/* Hero Section */}
      <div className={styles.heroHeader}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>TechStore</h1>

          <div className={styles.heroRight}>
            <p className={styles.heroSubtitle}>Discover the latest electronics</p>

            <div className={styles.animatedText}>
              {phrases.map((phrase, index) => (
                <p
                  key={index}
                  className={`${styles.heroText} ${
                    index === phraseIndex ? styles.active : ""
                  }`}
                >
                  {phrase}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className={styles.categoriesBar}>
        <div className={styles.container}>
          <div className={styles.scrollContainer}>
            {showLeftArrow && (
              <button
                className={`${styles.arrowBtn} ${styles.left}`}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <MdKeyboardArrowLeft />
              </button>
            )}

            <div
              className={styles.scrollWrapper}
              ref={scrollRef}
              onScroll={checkScroll}
            >
              <div className={styles.list}>
                {categories.map((cat) => (
                  <Link
                    to={`/category/${cat.slug}`}
                    key={cat.slug}
                    className={styles.item}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={cat.image} alt={cat.name} loading="lazy" />
                    </div>
                    <span className={styles.name}>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {showRightArrow && (
              <button
                className={`${styles.arrowBtn} ${styles.right}`}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                <MdKeyboardArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}