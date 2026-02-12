import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { CartCounter } from "./CartCounter";
import useWishListContext from "../contexts/wishlistContext";
import useCartContext from "../contexts/cartContext";

export default function Nav({ setSearchText }) {
  const { allWishListItem } = useWishListContext();
  const { allCartItems } = useCartContext();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          UrbanWear
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productlistings">
                Products
              </Link>
            </li>
          </ul>

          {/* Search */}
          <form
            className="d-flex mx-auto my-3 my-lg-0"
            style={{ maxWidth: "350px", width: "100%" }}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-4 ms-lg-4">
            <button className="btn btn-outline-dark btn-sm">Login</button>

            <Link
              to="/wishlist"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaRegHeart />
              <span>Wishlist</span>
              <span className="badge bg-dark">{allWishListItem.length}</span>
            </Link>

            <Link
              to="/cart"
              className="text-decoration-none text-dark d-flex align-items-center gap-1"
            >
              <FaShoppingCart />
              <span>Cart</span>
              <span className="badge bg-dark">{allCartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
