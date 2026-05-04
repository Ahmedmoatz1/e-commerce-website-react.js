import React, { useContext } from "react";
import { WishlistContext } from "../../components/context/WishlistContext";
import { MdDelete } from "react-icons/md";
import styles from "./Heart.module.css";

const Heart = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.checkout}>
        <div className={styles.ordersummary}>
          <h1>Your Favorites</h1>
          <p className={styles.emptyCart}>No favorites yet ❤️</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.ordersummary}>
        <h1>Your Favorites</h1>
        <div className={styles.items}>
          {wishlistItems.map((item) => (
            <div className={styles.itemCart} key={item.id}>
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className={styles.imageName}
              />
              <div className={styles.content}>
                <h1>{item.title}</h1>
                <p className={styles.priceItem}>${item.price}</p>
              </div>
              <button
                className={styles.deleteItem}
                onClick={() => removeFromWishlist(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heart;
