import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./components/context/Cartcontext.jsx";
import { WishlistProvider } from "./components/context/WishlistContext.jsx";
import { LoginProvider } from "./components/context/Logincontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* تم تعديل الـ basename ليطابق اسم المستودع الخاص بك على GitHub */}
    <BrowserRouter basename="/e-commerce-website-react.js/">
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