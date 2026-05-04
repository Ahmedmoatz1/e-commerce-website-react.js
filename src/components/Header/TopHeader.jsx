import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/WishlistContext";

import SearchBox from "./SerachBox";
import styles from "./Header.module.css";
import LoginUserIcon from "./LoginUserIcon/LoginUserIcon";

export default function TopHeader() {
  const { cartItems = [] } = useContext(CartContext);
  const { wishlistItems = [] } = useContext(WishlistContext); // <- استخدم wishlistItems

  return (
    <>
      <div className={styles.topHeader}>
        <div className={styles.container}>
          <Link to="/">
            <FaOpencart className={styles.logo} />
          </Link>

          <SearchBox />

          <div className={styles.headerIcons}>
            <div className={styles.icon}>
              <Link to='/heart'>
              <FaRegHeart />
              <span className={styles.count}>{wishlistItems.length}</span> 
              </Link>
            </div>

            <div className={styles.icon}>
              <Link to="/cart">
                <RiShoppingCartLine />
                <span className={styles.count}>{cartItems.length}</span>
              </Link>
            </div>
            <div className={styles.icon}>
              <Link to="/login">

                <LoginUserIcon />
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
