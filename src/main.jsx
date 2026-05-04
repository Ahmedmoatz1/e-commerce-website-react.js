import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./components/context/Cartcontext.jsx";
import { WishlistProvider } from "./components/context/WishlistContext.jsx"; // Ensure this is correct
import { LoginProvider } from "./components/context/Logincontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <CartProvider>
        <WishlistProvider>
          <LoginProvider>
          <App />
          </LoginProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);