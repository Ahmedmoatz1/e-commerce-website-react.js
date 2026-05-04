import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null); // معلومات المستخدم
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول
  const [cart, setCart] = useState([]); // العربة
  const [wishlist, setWishlist] = useState([]); // المفضلة

  // تحميل المستخدم إذا كان مسجل دخول من localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setCart(storedUser.cart || []);
      setWishlist(storedUser.wishlist || []);
    }
  }, []);

  // تحديث localStorage عند تغيير cart أو wishlist أو user
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...user, cart, wishlist })
      );
    }
  }, [cart, wishlist, user]);

  // تسجيل الدخول
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      setCart(foundUser.cart || []);
      setWishlist(foundUser.wishlist || []);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // تسجيل مستخدم جديد
  const register = (name, email, password, avatar) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) {
      return false; // الايميل موجود
    }
    const newUser = { name, email, password, avatar, cart: [], wishlist: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    setIsLoggedIn(true);
    setCart([]);
    setWishlist([]);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("currentUser");
  };

  const addToCart = (item) => {
    if (!cart.some((i) => i.id === item.id)) setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const addToWishlist = (item) => {
    if (!wishlist.some((i) => i.id === item.id)) setWishlist([...wishlist, item]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((i) => i.id !== id));
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
