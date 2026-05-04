import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import BtmHeader from "../../components/Header/BtmHeader";
import styles from "./Home.module.css";   // هنا

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );
        setProducts(Object.assign({}, ...results));
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <BtmHeader />

      <section className={styles.section}>
        <HeroSlider />
      </section>

      {loading ? (
        categories.map((cat) => (
          <section key={cat} className={styles.slideProductSection}>
            <SlideProductLoading />
          </section>
        ))
      ) : (
        categories.map((cat) => (
          <section key={cat} className={styles.slideProductSection}>
            <SlideProduct
              data={products[cat]}
              title={cat.replace("-", " ").toUpperCase()}
            />
          </section>
        ))
      )}
    </div>
  );
}

export default Home;