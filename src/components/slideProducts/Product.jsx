import React, { useContext } from "react";
import {
  FaStar,
  FaRegStarHalfStroke,
  FaCartArrowDown,
  FaRegHeart,
} from "react-icons/fa6";
import { IoCheckmarkDoneCircle, IoHeartDislikeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Product.module.css";
import { CartContext } from "../../components/context/Cartcontext";
import { WishlistContext } from "../../components/context/WishlistContext";

function Product({ item }) {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isInCart = cartItems.some((i) => i.id === item.id);
  const isInWishlist = wishlistItems.some((i) => i.id === item.id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(item.id);
      toast.error("Removed from Wishlist");
    } else {
      addToWishlist(item);
      toast.success("Added to Wishlist");
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isInCart) {
      removeFromCart(item.id);
      toast.error("Removed from cart");
    } else {
      addToCart(item);
      toast.success("Added to cart");
    }
  };

  return (
    <div className={`${styles.product} ${isInCart ? styles.inCart : ""}`}>
      {isInCart && (
        <div className={styles.addedBadge}>
          <IoCheckmarkDoneCircle />
        </div>
      )}
      <Link to={`/products/${item.id}`} className={styles.productLink}>
        <div className={styles.imgProduct}>
          <img
            loading="lazy"
            src={
              item.images?.[0] ||
              item.thumbnail ||
              "https://via.placeholder.com/300"
            }
            alt={item.title}
          />
          <span
            onClick={handleHeartClick}
            className={`${styles.heartIcon} ${
              isInWishlist ? styles.active : ""
            }`}
          >
             <FaRegHeart />
          </span>
        </div>

        <p className={styles.nameProduct}>{item.title}</p>
        <div className={styles.stars}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <p className={styles.price}>$ {item.price}</p>
      </Link>
      <button onClick={handleCartClick} className={styles.cartButton}>
        {isInCart ? (
          "Remove from Cart"
        ) : (
          <>
            <FaCartArrowDown /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

export default Product;
