import { Route, Routes } from "react-router-dom";
import TopHeader from "./components/Header/TopHeader";
import Home from "./page/Home/Home";
import ProductDetails from "./page/ProductDetails/productDetails";
import Cart from "./page/Cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollTotop from "./components/ScrollTotop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import Heart from "./page/Heart/Heart";
import Login from "./page/Login/Login";

function App() {
  return (
    <>
      <header>
        <TopHeader />
      </header>
      

      <ScrollTotop />
      <Toaster position="bottom-right" reverseOrder={false} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
