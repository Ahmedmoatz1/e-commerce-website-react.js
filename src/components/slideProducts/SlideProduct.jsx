// src/components/slideProducts/SlideProduct.jsx

import React, {  useRef } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./slideProduct.module.css";
import Product from "./Product";

export default function SlideProduct({ data = [], title = "منتجات مميزة" }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // تحديث الأسهم لما الداتا تتغير أو الصفحة تتحمل
  React.useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        ref.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className={styles.categoriesBar}>
      <div className={styles.scrollContainer}>
        {/* العنوان */}
        <h2 className={styles.sectionTitle} data-text={title}>
          {title}
        </h2>

        <div
          className={styles.scrollWrapper}
          ref={scrollRef}
          onScroll={checkScroll}
        >
          <div className={styles.list}>
            {data.map((item) => (
              <div key={item.id} className={styles.productItem}>
                <Product item={item} />
              </div>
            ))}
          </div>
        </div>

        
        {showLeftArrow && (
          <button
            className={`${styles.arrowBtn} ${styles.left}`}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <MdKeyboardArrowLeft />
          </button>
        )}

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
    </section>
  );
}