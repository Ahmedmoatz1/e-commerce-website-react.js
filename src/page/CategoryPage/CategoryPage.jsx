// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product"; // تأكد من المسار
import "./CategoryPage.css"; // هنعمل الملف ده بعد شوية

function CategoryPage() {
  const { category } = useParams(); // مثلاً: smartphones
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  // تحويل slug → اسم جميل (smartphones → Smartphones)
  const formatCategoryName = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="loading_spinner">
        <div className="spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="category_page">
      <div className="container">
        {/* العنوان الكبير */}
        <h1 className="category_title">{formatCategoryName(category)}</h1>
        <p className="category_count">{categoryProducts.length} Products</p>

        {/* المنتجات */}
        {categoryProducts.length === 0 ? (
          <div className="no_products">
            <h2>No products found in this category yet.</h2>
            <p>Check back later!</p>
          </div>
        ) : (
          <div className="category_grid">
            {categoryProducts.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;