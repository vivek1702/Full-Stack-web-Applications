import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Productlistings from "./pages/ProductListings";
import { useState } from "react";
import WishList from "./pages/WishList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/cartContext";
import { WishListProvider } from "./contexts/wishlistContext";
import { Toaster } from "react-hot-toast";
import AddressPage from "./pages/Address";
import Checkout from "./pages/CheckOut";
import OrderSummary from "./pages/OrderSummary";

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <CartProvider>
      <WishListProvider>
        <BrowserRouter>
          <Nav setSearchText={setSearchText} />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productlistings" element={<Productlistings />} />
            <Route
              path="/productlistings/:categoryId"
              element={<Productlistings />}
            />
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails />}
            />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addressDetails" element={<AddressPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderSummary" element={<OrderSummary />} />
          </Routes>
        </BrowserRouter>
      </WishListProvider>
    </CartProvider>
  );
}

export default App;
