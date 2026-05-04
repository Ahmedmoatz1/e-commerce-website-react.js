// SearchBox.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // جلب النتايج
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((r) => r.json())
        .then((data) => setResults(data.products.slice(0, 6)))
        .finally(() => setIsOpen(true));
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // إغلاق عند الضغط خارج
  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goTo(`/search?q=${query}`);
        }}
        className={styles.form}
      >
        <input
          type="text"
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          <FaSearch />
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((item) => {
            const regex = new RegExp(`(${query})`, "gi"); // البحث مع تجاهل حالة الأحرف
            const parts = item.title.split(regex); // تقسيم النص حسب كلمة البحث

            return (
              <div
                key={item.id}
                className={styles.item}
                onClick={() => goTo(`/products/${item.id}`)}
              >
                <img src={item.thumbnail} alt={item.title} className={styles.img} />
                <div>
                  <div className={styles.title}>
                    {parts.map((part, index) =>
                      regex.test(part) ? (
                        <mark key={index}>{part}</mark>
                      ) : (
                        <span key={index}>{part}</span>
                      )
                    )}
                  </div>
                  <div className={styles.price}>${item.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && results.length === 0 && query && (
        <div className={styles.dropdown}>No results found</div>
      )}
    </div>
  );
}
