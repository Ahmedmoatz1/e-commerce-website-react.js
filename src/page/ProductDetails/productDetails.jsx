import React, { useEffect, useState, useContext } from 'react';
import { FaStar, FaRegStarHalfStroke, FaRegHeart } from 'react-icons/fa6';
import { TiShoppingCart } from 'react-icons/ti';
import { MdCheckCircle, MdRemoveShoppingCart } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import './ProductDetails.css';
import { CartContext } from '../../components/context/Cartcontext';
import { WishlistContext } from '../../components/context/WishlistContext';
import PageTransition from '../../components/PageTransition';

const ProductDetails = () => {
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        setLoadingRelated(true);
        const res = await fetch(`https://dummyjson.com/products/category/${product.category}`);
        const data = await res.json();
        const filtered = data.products.filter(p => p.id !== parseInt(id));
        setRelatedProducts(filtered.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [product, id]);

  const changeMainImage = (img) => setMainImage(img);

  const isInCart = product ? cartItems.some(item => item.id === product.id) : false;
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  const handleCartAction = () => {
    if (isInCart) removeFromCart(product.id);
    else addToCart(product);
  };

  const handleWishlistAction = () => {
    if (!product) return;
    if (isInWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <PageTransition key={id}>
      <div className="item_details">
        <div className="containers">
          <div className="imgs_items">
            <div className="big_img">
              <img src={mainImage || product.images[0]} alt={product.title} />
            </div>
            {product.images.length > 1 && (
              <div className="sm_img">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    onClick={() => changeMainImage(img)}
                    className={mainImage === img ? 'active' : ''}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="details_item">
            <h1 className="name">{product.title}</h1>

            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke />
              <span className="rating-text">
                {product.rating} ({product.reviews?.length || 128} reviews)
              </span>
            </div>

            <h3>Overview</h3>
            <p className="desc_full">{product.description}</p>
            <p className="price">${product.price}</p>

            <div className="buy_section">
              <button
                onClick={handleCartAction}
                className={`add-to-cart-btn ${isInCart ? 'added' : ''}`}
              >
                {isInCart ? (
                  <>
                    <MdCheckCircle className="icon" /> Added
                    <MdRemoveShoppingCart className="remove-icon" />
                  </>
                ) : (
                  <>Add to cart <TiShoppingCart /></>
                )}
              </button>

              <div className="side_icons">
                <span
                  className={`icon heart-icon ${isInWishlist ? 'active' : ''}`}
                  onClick={handleWishlistAction}
                >
                  <FaRegHeart />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related_section">
        <h2 className="related_title">You may also like</h2>
        {loadingRelated ? (
          <p className="loading-text">Loading similar products...</p>
        ) : (
          <div className="related_grid">
            {relatedProducts.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="related_card">
                <img src={item.thumbnail} alt={item.title} />
                <h4>{item.title}</h4>
                <p className="related_price">${item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
