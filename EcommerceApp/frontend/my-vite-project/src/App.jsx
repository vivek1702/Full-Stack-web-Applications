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

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <BrowserRouter>
        <Nav setSearchText={setSearchText} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productlistings"
            element={<Productlistings searchText={searchText} />}
          />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
